// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const database = getDatabase(app);
const auth = getAuth();

saveData.addEventListener("click", (e) => {
  let notifyClass = document.querySelector(".notify");
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let username = document.getElementById("username").value;

  removeActiveClasses();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        username: username,
        email: email,
        postScore: "N/A",
        preScore: "N/A",
        preTestTaker: "N/A",
      });

      notifyClass.style.transform = "scale(1)";
      notifyClass.classList.add("notify-success");
      notifyClass.textContent = "Successfully created user!";

      setTimeout(() => {
        notifyClass.style.transform = "scale(0)";
      }, 3000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const cleanedErrorMessage = errorMessage.replace("Firebase: ", "");
      notifyClass.style.transform = "scale(1)";
      notifyClass.textContent = cleanedErrorMessage;
      notifyClass.classList.add("notify-failed");
      setTimeout(() => {
        notifyClass.style.transform = "scale(0)";
      }, 3000);
    });
  function removeActiveClasses() {
    notifyClass.classList.remove("notify-success");
    notifyClass.classList.remove("notify-failed");
  }
});
