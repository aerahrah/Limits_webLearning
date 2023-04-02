import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, update } from "firebase/database";

// Your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyD8C_pRjLoIOANX2THHCSsHiaZ_t6BYCTo",
  authDomain: "limitslearningwebsite.firebaseapp.com",
  databaseURL: "https://limitslearningwebsite-default-rtdb.firebaseio.com",
  projectId: "limitslearningwebsite",
  storageBucket: "limitslearningwebsite.appspot.com",
  messagingSenderId: "142209218109",
  appId: "1:142209218109:web:c2e97662d98d9eb7999c54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { auth, db, realtimeDb };
