import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Replace with your Firebase project configuration
// Get this from: Firebase Console > Project Settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsTBR2zCmXs9scy_jHZvA2_2P7kiFRhSY",
  authDomain: "limey-49eb8.firebaseapp.com",
  databaseURL: "https://limey-49eb8-default-rtdb.firebaseio.com",
  projectId: "limey-49eb8",
  storageBucket: "limey-49eb8.firebasestorage.app",
  messagingSenderId: "65425107614",
  appId: "1:65425107614:web:925fdf10730f16c742298f",
  measurementId: "G-LWKXBHE9K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
