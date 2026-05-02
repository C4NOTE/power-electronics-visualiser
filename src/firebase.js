
console.log("FIREBASE FILE LOADED");
console.log("ENV:", import.meta.env);
console.log("API KEY:", import.meta.env.VITE_API_KEY);
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- REPLACE THE SECTION BELOW WITH YOUR GOOGLE CONFIG ---
// firebase.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Add _FIREBASE_ here
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};
// --- REPLACE THE SECTION ABOVE ---

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
console.log("ALL ENV:", import.meta.env);