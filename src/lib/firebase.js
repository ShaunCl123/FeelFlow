// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import Firebase Authentication
import { useEffect, useState } from 'react';

// Firebase configuration (use environment variables for security)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);  // Initialize Firebase Authentication
export const db = getFirestore(app);  // Initialize Firestore
export { app }; // Named export for app

// Default export for HomePage
export default function HomePage() {
  const [lastSelectedEmotion, setLastSelectedEmotion] = useState(null);

  useEffect(() => {
    // Ensure this only runs on the client-side
    if (typeof window !== "undefined") {
      const storedEmotion = localStorage.getItem('lastSelectedEmotion');
      setLastSelectedEmotion(storedEmotion);
    }
  }, []);

  return (
    <div>
      <h1>FeelFlow</h1>
      <p>Last selected emotion: {lastSelectedEmotion}</p>
    </div>
  );
}
