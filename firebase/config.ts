import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA_Xlkg0tEd9IDoFdCFMeSxgk4izHRJucc',
  authDomain: 'fiap-tech-challenge-mobile.firebaseapp.com',
  projectId: 'fiap-tech-challenge-mobile',
  storageBucket: 'fiap-tech-challenge-mobile.firebasestorage.app',
  messagingSenderId: '378555665840',
  appId: '1:378555665840:web:3e98f19c09c7d3b4919a75',
};

let app: FirebaseApp;
let auth: Auth;

const hasApp = getApps().length;

if (!hasApp) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
