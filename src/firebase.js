// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDofeSQvioSfLBUJ3KCKGbXTgeDlCb5NS8",
  authDomain: "personal-finace-tracker-382f7.firebaseapp.com",
  projectId: "personal-finace-tracker-382f7",
  storageBucket: "personal-finace-tracker-382f7.appspot.com",
  messagingSenderId: "191932984754",
  appId: "1:191932984754:web:d3cf8c53f9b7d13f4b88ab",
  measurementId: "G-EP003XWNPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };