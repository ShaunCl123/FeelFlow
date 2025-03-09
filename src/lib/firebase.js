import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Initialize Firebase with config from your Firebase Console
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to save the user's last selected emotion in Firestore
export const saveEmotion = async (userId, emotion) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    // Merge ensures we only update lastEmotion without overwriting other fields in the document
    await setDoc(userDocRef, { lastEmotion: emotion }, { merge: true });
    console.log('Emotion saved successfully');
  } catch (error) {
    console.error('Error saving emotion: ', error);
  }
};

// Function to get the user's last selected emotion from Firestore
export const getEmotion = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      return docSnap.data().lastEmotion; // Return the lastEmotion field from Firestore
    } else {
      console.log('No emotion found for user.');
      return null; // Return null if no emotion is found
    }
  } catch (error) {
    console.error('Error getting emotion: ', error);
    return null;
  }
};

// Export Firebase auth
export { auth };
