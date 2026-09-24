import { db, auth } from './firebase';
import { doc, getDoc, setDoc, updateDoc, onSnapshot, getDocFromServer } from 'firebase/firestore';

export interface UserProgress {
  xp: number;
  completedLessons: string[];
  streak: number;
  courseProgress: Record<string, number>;
  lastActive?: string | null;
  displayName?: string | null;
  email?: string | null;
  completedProjects?: string[];
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Error Context: ', JSON.stringify(errInfo));
}

const DEFAULT_PROGRESS: UserProgress = {
  xp: 160,
  completedLessons: ['les-0-1-1', 'les-0-1-2', 'les-0-1-3', 'les-0-2-1', 'les-0-2-2'],
  streak: 1,
  courseProgress: { 'html-mastery': 65 },
  lastActive: new Date().toISOString(),
};

// Test initial connection to Firestore
export async function testFirestoreConnection() {
  try {
    if (auth.currentUser) {
      await getDocFromServer(doc(db, 'users', auth.currentUser.uid));
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore client is offline or starting up.");
    }
  }
}

export const getUserProgress = async (userId: string): Promise<UserProgress> => {
  const path = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProgress;
    } else {
      const initialData: UserProgress = {
        ...DEFAULT_PROGRESS,
        displayName: auth.currentUser?.displayName || 'Developer',
        email: auth.currentUser?.email || '',
        lastActive: new Date().toISOString()
      };
      await setDoc(docRef, initialData);
      return initialData;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    // Fallback to local storage if network or permissions fail
    try {
      const saved = localStorage.getItem('devmaster_user_progress');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_PROGRESS;
  }
};

export const updateUserProgress = async (userId: string, progress: Partial<UserProgress>) => {
  const path = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, { ...DEFAULT_PROGRESS, ...progress, updatedAt: new Date().toISOString() });
    } else {
      await updateDoc(docRef, { ...progress, updatedAt: new Date().toISOString() });
    }

    // Auto-sync public leaderboard entry
    if (progress.xp !== undefined) {
      await syncLeaderboardEntry(userId, {
        displayName: auth.currentUser?.displayName || 'Developer',
        photoURL: auth.currentUser?.photoURL || '',
        xp: progress.xp || 0,
        streak: progress.streak || 1,
        completedCount: progress.completedLessons?.length || 0,
        rankTitle: getRankTitle(progress.xp || 0),
        updatedAt: new Date().toISOString()
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL?: string;
  xp: number;
  streak: number;
  completedCount: number;
  rankTitle: string;
  updatedAt: string;
}

export function getRankTitle(xp: number): string {
  const lvl = Math.floor(xp / 100) + 1;
  if (lvl === 1) return 'Rookie Coder';
  if (lvl === 2) return 'Junior Developer';
  if (lvl === 3) return 'Frontend Apprentice';
  if (lvl === 4) return 'Code Artisan';
  return 'Fullstack Maestro';
}

export const syncLeaderboardEntry = async (userId: string, data: Omit<LeaderboardEntry, 'userId'>) => {
  const path = `leaderboard/${userId}`;
  try {
    const docRef = doc(db, 'leaderboard', userId);
    await setDoc(docRef, { userId, ...data }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getLeaderboardEntries = async (): Promise<LeaderboardEntry[]> => {
  try {
    const { collection, getDocs, query, limit, orderBy } = await import('firebase/firestore');
    const q = query(collection(db, 'leaderboard'), orderBy('xp', 'desc'), limit(50));
    const snap = await getDocs(q);
    const results: LeaderboardEntry[] = [];
    snap.forEach((d) => {
      results.push(d.data() as LeaderboardEntry);
    });
    return results;
  } catch (err) {
    console.warn('Leaderboard fetch fallback to defaults');
    return [];
  }
};

export interface CommunityFeedItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: string;
  title: string;
  xpEarned: number;
  createdAt: string;
}

export const postMilestoneFeed = async (item: Omit<CommunityFeedItem, 'id' | 'createdAt'>) => {
  try {
    const { collection, addDoc } = await import('firebase/firestore');
    await addDoc(collection(db, 'community_feed'), {
      ...item,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Feed post skipped (offline mode)');
  }
};

export const getCommunityFeedItems = async (): Promise<CommunityFeedItem[]> => {
  try {
    const { collection, getDocs, query, limit, orderBy } = await import('firebase/firestore');
    const q = query(collection(db, 'community_feed'), orderBy('createdAt', 'desc'), limit(20));
    const snap = await getDocs(q);
    const results: CommunityFeedItem[] = [];
    snap.forEach((d) => {
      results.push({ id: d.id, ...(d.data() as any) });
    });
    return results;
  } catch (err) {
    return [];
  }
};

export interface CustomChallengeData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  language: string;
  starterCode: string;
  solutionCode?: string;
  testCheck: string;
  xpReward: number;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export const saveCustomChallengeToDb = async (challenge: CustomChallengeData) => {
  try {
    const docRef = doc(db, 'custom_challenges', challenge.id);
    await setDoc(docRef, challenge);
  } catch (err) {
    console.warn('Failed saving challenge to db, stored locally');
  }
};

export const getCustomChallengesFromDb = async (): Promise<CustomChallengeData[]> => {
  try {
    const { collection, getDocs } = await import('firebase/firestore');
    const snap = await getDocs(collection(db, 'custom_challenges'));
    const results: CustomChallengeData[] = [];
    snap.forEach((d) => {
      results.push(d.data() as CustomChallengeData);
    });
    return results;
  } catch (err) {
    return [];
  }
};

export const subscribeUserProgress = (
  userId: string, 
  onUpdate: (progress: UserProgress) => void
) => {
  const path = `users/${userId}`;
  const docRef = doc(db, 'users', userId);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      onUpdate(docSnap.data() as UserProgress);
    }
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
  });
};
