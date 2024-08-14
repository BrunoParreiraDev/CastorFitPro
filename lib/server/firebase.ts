"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAMRfpbt3pm8vefpRGXpwGbpomBxRd1Ym4",
  authDomain: "castorfit-pro.firebaseapp.com",
  projectId: "castorfit-pro",
  storageBucket: "castorfit-pro.appspot.com",
  messagingSenderId: "202228520441",
  appId: "1:202228520441:web:09f87d73a728af3b33d928",
  measurementId: "G-EK2RCD68HD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}


auth.languageCode = "pt-BR";
export {app, auth, analytics}