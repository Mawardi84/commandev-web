import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import config from '../../firebase-applet-config.json';

const firebaseConfig = {
  projectId: config.projectId || 'demo-project',
  appId: config.appId || '1:000000000000:web:0000000000000000',
  apiKey: config.apiKey || 'AIzaSyDummyKeyForFallback123456789',
  authDomain: config.authDomain || 'demo-project.firebaseapp.com',
  storageBucket: config.storageBucket || 'demo-project.firebasestorage.app',
  messagingSenderId: config.messagingSenderId || '000000000000',
  measurementId: config.measurementId || '',
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app, config.firestoreDatabaseId || '(default)');
export const auth: Auth = getAuth(app);

