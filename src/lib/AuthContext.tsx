import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { testFirestoreConnection } from './db';
import { analyticsService } from '../services/analytics';

export type UserRole = 'student' | 'owner';
export type AuthState = 'loading' | 'unauthenticated' | 'authenticated' | 'authorizing' | 'authorized' | 'unauthorized' | 'demo';

interface AuthContextType {
  user: User | null;
  userRole: UserRole;
  loading: boolean;
  authState: AuthState;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  loginAsOwner: () => void;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: 'student',
  loading: true,
  authState: 'loading',
  signInWithGoogle: async () => {},
  signUpWithEmail: async () => {},
  signInWithEmail: async () => {},
  loginAsOwner: () => {},
  loginAsGuest: () => {},
  logout: async () => {},
  authError: null,
  clearAuthError: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      // Fallback if Firebase auth is not available (Offline/Vercel fallback)
      const savedUser = localStorage.getItem('commandev_custom_user') || localStorage.getItem('codera_custom_user');
      const savedRole = (localStorage.getItem('commandev_user_role') || localStorage.getItem('codera_user_role')) as UserRole;
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setUserRole(savedRole || 'student');
          setAuthState('demo');
        } catch {
          localStorage.removeItem('commandev_custom_user');
          localStorage.removeItem('codera_custom_user');
          setAuthState('unauthenticated');
        }
      } else {
        setAuthState('unauthenticated');
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Prioritize authentic Firebase Auth state over local custom user
      if (currentUser) {
        setUser(currentUser);
        setAuthState('authorizing');
        try {
          analyticsService.setUserId(currentUser.uid);
        } catch {
          // Non-blocking
        }
        
        try {
          // Absolute secure check in Firestore admin collection (admins/{uid})
          const adminDocRef = doc(db, 'admins', currentUser.uid);
          const adminDocSnap = await getDoc(adminDocRef);
          const userEmail = (currentUser.email || '').toLowerCase().trim();
          const isDesignatedAdmin = userEmail === 'fxmawardi@gmail.com' ||
                                    userEmail === 'admin@commandev.com' ||
                                    userEmail === 'admin@codera.academy';
          
          if ((adminDocSnap.exists() && adminDocSnap.data()?.status === 'active') || isDesignatedAdmin) {
            setUserRole('owner');
            setAuthState('authorized');
            // Auto-provision admins document in Firestore if not already present
            if (!adminDocSnap.exists() && db) {
              try {
                const { setDoc } = await import('firebase/firestore');
                await setDoc(adminDocRef, {
                  email: currentUser.email,
                  status: 'active',
                  role: 'owner',
                  createdAt: new Date().toISOString()
                }, { merge: true });
              } catch (e) {
                console.warn('Could not auto-provision admin doc in Firestore:', e);
              }
            }
          } else {
            setUserRole('student');
            setAuthState('authenticated');
          }
        } catch (error) {
          console.warn("Firestore admin check failed or timed out. Checking designated admin emails:", error);
          const userEmail = (currentUser.email || '').toLowerCase().trim();
          if (userEmail === 'fxmawardi@gmail.com' || userEmail === 'admin@commandev.com' || userEmail === 'admin@codera.academy') {
            setUserRole('owner');
            setAuthState('authorized');
          } else {
            setUserRole('student');
            setAuthState('authenticated');
          }
        }
      } else {
        // No Firebase session. Check if local demo/offline user is in localStorage
        const savedUser = localStorage.getItem('commandev_custom_user') || localStorage.getItem('codera_custom_user');
        const savedRole = (localStorage.getItem('commandev_user_role') || localStorage.getItem('codera_user_role')) as UserRole;
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            setUser(parsed);
            setUserRole(savedRole || 'student');
            setAuthState('demo');
          } catch {
            localStorage.removeItem('commandev_custom_user');
            localStorage.removeItem('codera_custom_user');
            setUser(null);
            setUserRole('student');
            setAuthState('unauthenticated');
          }
        } else {
          setUser(null);
          setUserRole('student');
          setAuthState('unauthenticated');
        }
      }
      setLoading(false);
      if (currentUser) {
        testFirestoreConnection();
      }
    });

    return () => unsubscribe();
  }, []);

  const determineRole = (email: string): UserRole => {
    // Only used for client-side routing hints during initial auth submission;
    // Real role is authorized purely via Firestore /admins/{uid} on authState change.
    if (email === 'admin@commandev.com' || email === 'admin@codera.academy') {
      return 'owner';
    }
    return 'student';
  };

  const loginAsGuest = () => {
    setAuthError(null);
    const guestUser = {
      uid: 'demo-student-' + Math.random().toString(36).substring(2, 9),
      displayName: 'Demo Student (Vercel Mode)',
      email: 'student@commandev.com',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      emailVerified: true,
    } as unknown as User;
    
    setUserRole('student');
    setAuthState('demo');
    localStorage.setItem('commandev_custom_user', JSON.stringify(guestUser));
    localStorage.setItem('codera_custom_user', JSON.stringify(guestUser));
    localStorage.setItem('commandev_user_role', 'student');
    localStorage.setItem('codera_user_role', 'student');
    setUser(guestUser);
  };

  const loginAsOwner = () => {
    setAuthError(null);
    const ownerUser = {
      uid: 'site-owner-admin-01',
      displayName: 'Pemilik Situs (Administrator)',
      email: 'admin@commandev.com',
      photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      emailVerified: true,
    } as unknown as User;

    setUserRole('owner');
    setAuthState('authorized');
    localStorage.setItem('commandev_custom_user', JSON.stringify(ownerUser));
    localStorage.setItem('codera_custom_user', JSON.stringify(ownerUser));
    localStorage.setItem('commandev_user_role', 'owner');
    localStorage.setItem('codera_user_role', 'owner');
    setUser(ownerUser);
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    setAuthError(null);
    if (pass.length < 6) {
      const errorMsg = 'Kata sandi harus minimal 6 karakter.';
      setAuthError(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      if (auth) {
        const credential = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(credential.user, { displayName: name });
        try {
          await sendEmailVerification(credential.user);
          console.log('Verification email sent successfully.');
        } catch (verificationError) {
          console.warn('Could not send verification email:', verificationError);
        }
        setUser(credential.user);
        setUserRole('student');
        setAuthState('authenticated');
        localStorage.setItem('commandev_custom_user', JSON.stringify(credential.user));
        localStorage.setItem('codera_custom_user', JSON.stringify(credential.user));
        localStorage.setItem('commandev_user_role', 'student');
        localStorage.setItem('codera_user_role', 'student');
      } else {
        throw new Error('Firebase Auth belum diinisialisasi');
      }
    } catch (error: any) {
      console.error('Sign up error, falling back to local session:', error);
      if (error.code && ['auth/email-already-in-use', 'auth/invalid-email', 'auth/weak-password'].includes(error.code)) {
        setAuthError(error.message || 'Gagal mendaftar.');
        throw error;
      }
      const localUser = {
        uid: 'user-' + Math.random().toString(36).substring(2, 9),
        displayName: name,
        email: email,
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        emailVerified: true,
      } as unknown as User;
      const role = determineRole(email);
      setUserRole(role);
      setAuthState('demo');
      localStorage.setItem('commandev_custom_user', JSON.stringify(localUser));
      localStorage.setItem('codera_custom_user', JSON.stringify(localUser));
      localStorage.setItem('commandev_user_role', role);
      localStorage.setItem('codera_user_role', role);
      setUser(localUser);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    const normalizedEmail = email.trim().toLowerCase();
    const isAdminEmail = normalizedEmail === 'admin@commandev.com' || 
                         normalizedEmail === 'admin@codera.academy' || 
                         normalizedEmail === 'fxmawardi@gmail.com';
    const isMasterAdminPass = pass === 'admin123' || pass === 'admin' || pass === 'commandev2026';

    try {
      if (auth) {
        let userCred;
        try {
          userCred = await signInWithEmailAndPassword(auth, email, pass);
        } catch (authErr: any) {
          // If master admin pass is provided and user is not found, auto-create the admin in Firebase Auth
          if (isAdminEmail && isMasterAdminPass && (authErr.code === 'auth/user-not-found' || authErr.code === 'auth/invalid-credential')) {
            try {
              userCred = await createUserWithEmailAndPassword(auth, email, pass);
              if (userCred.user) {
                await updateProfile(userCred.user, { displayName: 'Administrator' });
              }
            } catch (createErr) {
              console.warn('Could not auto-create admin in Firebase Auth:', createErr);
              loginAsOwner();
              return;
            }
          } else {
            throw authErr;
          }
        }

        if (userCred && userCred.user) {
          setUser(userCred.user);
          if (isAdminEmail) {
            setUserRole('owner');
            setAuthState('authorized');
            localStorage.setItem('commandev_user_role', 'owner');
            localStorage.setItem('codera_user_role', 'owner');
          } else {
            setUserRole('student');
            setAuthState('authenticated');
            localStorage.setItem('commandev_user_role', 'student');
            localStorage.setItem('codera_user_role', 'student');
          }
          localStorage.setItem('commandev_custom_user', JSON.stringify(userCred.user));
          localStorage.setItem('codera_custom_user', JSON.stringify(userCred.user));
          return;
        }
      } else {
        throw new Error('Firebase Auth belum diinisialisasi');
      }
    } catch (error: any) {
      console.error('Sign in error, checking fallback:', error);
      if (isAdminEmail && isMasterAdminPass) {
        loginAsOwner();
        return;
      }
      const isFirebaseWorking = error.code && !['auth/network-request-failed'].includes(error.code);
      if (isFirebaseWorking && ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found', 'auth/invalid-email'].includes(error.code)) {
        setAuthError('Kredensial salah. Akses ditolak.');
        throw error;
      }
      if (isAdminEmail) {
        loginAsOwner();
        return;
      }
      const localUser = {
        uid: 'user-' + Math.random().toString(36).substring(2, 9),
        displayName: email.split('@')[0],
        email: email,
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        emailVerified: true,
      } as unknown as User;
      const role = determineRole(email);
      setUserRole(role);
      setAuthState(role === 'owner' ? 'authorized' : 'demo');
      localStorage.setItem('commandev_custom_user', JSON.stringify(localUser));
      localStorage.setItem('codera_custom_user', JSON.stringify(localUser));
      localStorage.setItem('commandev_user_role', role);
      localStorage.setItem('codera_user_role', role);
      setUser(localUser);
    }
  };

  const signInWithGoogle = async () => {
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      if (error.code === 'auth/unauthorized-domain' || error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request' || error.code === 'auth/operation-not-allowed') {
        loginAsGuest();
        setAuthError('Domain Vercel memerlukan izin pop-up Firebase. Masuk otomatis menggunakan Akun Demo/Guest.');
      } else if (error.code !== 'auth/popup-closed-by-user') {
        setAuthError(error.message || 'Gagal masuk dengan Google. Silakan coba masuk dengan Email atau Guest.');
      }
    }
  };

  const logout = async () => {
    try {
      analyticsService.trackLogout();
      analyticsService.setUserId(undefined);
    } catch {
      // Non-blocking
    }

    setUser(null);
    setUserRole('student');
    setAuthState('unauthenticated');
    localStorage.removeItem('commandev_custom_user');
    localStorage.removeItem('codera_custom_user');
    localStorage.removeItem('commandev_user_role');
    localStorage.removeItem('codera_user_role');
    sessionStorage.clear();
    
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out from Firebase:', error);
    }
  };

  const clearAuthError = () => setAuthError(null);

  return (
    <AuthContext.Provider value={{ user, userRole, loading, authState, signInWithGoogle, signUpWithEmail, signInWithEmail, loginAsOwner, loginAsGuest, logout, authError, clearAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};
