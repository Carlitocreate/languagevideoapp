import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDiB1pmGsiQn4oyZXIDs8imJ6XMZZTzR6g",
  authDomain: "languagevideoapp.firebaseapp.com",
  projectId: "languagevideoapp",
  storageBucket: "languagevideoapp.firebasestorage.app",
  messagingSenderId: "298532776286",
  appId: "1:298532776286:web:0e9afb7484ea4d28c987cf",
  measurementId: "G-6V6Z5TJMX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };