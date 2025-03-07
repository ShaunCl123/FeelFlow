// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMEFCDE6TjCyD6JtV3Zwb9VYYfhjkJXR0",
  authDomain: "feelflow-ba3a2.firebaseapp.com",
  projectId: "feelflow-ba3a2",
  storageBucket: "feelflow-ba3a2.firebasestorage.app",
  messagingSenderId: "833971157649",
  appId: "1:833971157649:web:5afcd75c12b37984ad5d30",
  measurementId: "G-7EXXTGNS27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
export const auth = getAuth(app);  // Initialize Firebase Authentication
export const db = getFirestore(app);  // Initialize Firestore
export default app;