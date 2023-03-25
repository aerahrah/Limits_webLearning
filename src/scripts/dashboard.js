
import { auth, db, realtimeDb } from './firebaseDB';
import { getDatabase, ref, child, get } from 'firebase/database';

  // Initialize Firebase
  const usernameID = document.getElementById('username')
 

  // Do something with the UID, such as storing it in a database
  const uid = localStorage.getItem('uid');
  console.log(uid)
  // Do something with the UID, such as fetch data from Firebase Firestore
  const userRef = ref(realtimeDb, `users/${uid}`);
  get(child(userRef, 'email')).then((snapshot) => {
    const email = snapshot.val();
    console.log('Email:', email);
  }).catch((error) => {
    console.error(error);
  });
  get(child(userRef, 'username')).then((snapshot) => {
    const username = snapshot.val();
    console.log('Username:', username);
    usernameID.innerHTML=username
  }).catch((error) => {
    console.error(error);
  });
