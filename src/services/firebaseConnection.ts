import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPiaMErUDB6u98wZn68kqzexPqmwu7hhk",
  authDomain: "reactlinks-12662.firebaseapp.com",
  projectId: "reactlinks-12662",
  storageBucket: "reactlinks-12662.firebasestorage.app",
  messagingSenderId: "74274573011",
  appId: "1:74274573011:web:45e8a60f97fe1f7f7c2226",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
