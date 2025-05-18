// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-generator-56c7e.firebaseapp.com",
  projectId: "ai-short-video-generator-56c7e",
  storageBucket: "ai-short-video-generator-56c7e.firebasestorage.app",
  messagingSenderId: "235074957515",
  appId: "1:235074957515:web:18546ddfe3cfec1605eb4e",
  measurementId: "G-SEPE043PK3" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);