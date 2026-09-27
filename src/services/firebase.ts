import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOnTNwf12WqKU7vMDXUEIMcTSmH1cwpAg",
  authDomain: "prodamagereportingsystem.firebaseapp.com",
  projectId: "prodamagereportingsystem",
  storageBucket: "prodamagereportingsystem.firebasestorage.app",
  messagingSenderId: "539691459628",
  appId: "1:539691459628:android:f44a932c4caff0eb39dd89",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
