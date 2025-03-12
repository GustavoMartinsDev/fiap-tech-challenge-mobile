import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth, initializeAuth } from 'firebase/auth';

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
  auth = initializeAuth(app);
} else {
  app = getApp();
  auth = getAuth(app);
}

export { app, auth };
