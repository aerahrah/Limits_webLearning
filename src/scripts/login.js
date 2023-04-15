import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, update } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const login = document.getElementById("login");

login.addEventListener("click", async (event) => {
  event.preventDefault();

  let errorMessages = document.querySelector(".notify");
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
    displayTextMessage("Successfully login!", "notify-success");
    // Save the UID to localStorage
    localStorage.setItem("uid", user.uid);

    // Redirect to the dashboard page
    setTimeout(() => {
      location.href = "/start";
    }, 3000);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    const cleanedErrorMessage = errorMessage.replace("Firebase: ", "");
    console.log(cleanedErrorMessage);
    displayTextMessage(cleanedErrorMessage, "notify-failed");
  }

  function displayTextMessage(errorMessageText, errorMessageClass) {
    errorMessages.textContent = errorMessageText;
    errorMessages.classList.remove("notify-success", "notify-failed");
    errorMessages.classList.add(errorMessageClass);
    errorMessages.style.display = "block";
    setTimeout(() => {
      errorMessages.style.transform = "scale(1)";
    }, 200);
    setTimeout(() => {
      errorMessages.style.transform = "scale(0)";
      setTimeout(() => {
        errorMessages.style.display = "none";
      }, 300);
    }, 2000);
  }
});
