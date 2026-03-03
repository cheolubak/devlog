import { getApp, getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export default app;
