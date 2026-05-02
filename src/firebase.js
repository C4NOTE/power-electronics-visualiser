
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- REPLACE THE SECTION BELOW WITH YOUR GOOGLE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyD6aYQHZ5AzKumq4-1eu2SD8dw5C7cItjU",
  authDomain: "power-visualizer-9e447.firebaseapp.com",
  projectId: "power-visualizer-9e447",
  storageBucket: "power-visualizer-9e447.firebasestorage.app",
  messagingSenderId: "753615769139",
  appId: "1:753615769139:web:e7bbfb8040afdb743c1d46",
  measurementId: "G-SRF3MDSQD8"
};
// --- REPLACE THE SECTION ABOVE ---

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);