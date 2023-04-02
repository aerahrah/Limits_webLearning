import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, update } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const login = document.getElementById("login");

login.addEventListener("click", async (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    // Sign in the user with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update the user's last login time in the database
    const dt = new Date();
    const userRef = ref(realtimeDb, "users/" + user.uid);
    await update(userRef, {
      last_login: dt.toISOString(),
    });

    // Save the UID to localStorage
    localStorage.setItem("uid", user.uid);

    // Redirect to the dashboard page
    location.href = "/start";
  } catch (error) {
    console.error(error);
  }
});
