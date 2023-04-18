import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, get, update } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const overlayLogin = document.getElementById("overlay-login");
const forgotPasswordBtn = document.getElementById("forgot-password-btn");
const forgotPasswordOpenBtn = document.getElementById("forgot-password-open");
const forgotPasswordCard = document.getElementById("forgot-password");
const forgotPasswordClose = document.getElementById("close-btn");
const errorMessagesLogin = document.getElementById("notify-login");
const errorMessagesReset = document.getElementById("notify-reset");
const errorMessages = document.getElementById("notify");
const emailReset = document.getElementById("email-reset-pass");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginBtn?.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const dt = new Date();
    const userRef = ref(realtimeDb, `users/${user.uid}`);
    const adminRef = ref(realtimeDb, `admin/`);

    // Check if the email belongs to an admin
    const snapshot = await get(adminRef);
    const isAdmin = Object.values(snapshot.val()).some(
      (admin) => admin.email === email
    );
    console.log(snapshot);
    console.log(isAdmin);

    if (isAdmin) {
      // User is an admin
      setTimeout(() => {
        location.href = "/superAdminDashboard";
      }, 3000);
    } else {
      setTimeout(() => {
        location.href = "/start";
      }, 3000);
      localStorage.setItem("uid", user.uid);
    }

    await update(userRef, { last_login: dt.toISOString() });
    displayTextMessage(
      "Successfully login!",
      "notify-success",
      errorMessagesLogin
    );
  } catch (error) {
    const errorMessage = error.message.replace("Firebase: ", "");
    displayTextMessage(errorMessage, "notify-failed", errorMessagesLogin);
  }
});

logoutBtn?.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    await auth.signOut();

    localStorage.removeItem("uid");

    location.href = "/login";
  } catch (error) {
    console.log(error);
  }
});

forgotPasswordClose?.addEventListener("click", () => {
  forgotPasswordCard.classList.remove("active");
  overlayLogin.style.display = "none";
});

forgotPasswordOpenBtn?.addEventListener("click", () => {
  forgotPasswordCard.classList.add("active");
  overlayLogin.style.display = "block";
});

forgotPasswordBtn?.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = emailReset.value;

  try {
    await sendPasswordResetEmail(auth, email);
    displayTextMessage(
      "Password reset email sent! Check your inbox.",
      "notify-success",
      errorMessagesReset
    );
  } catch (error) {
    const errorMessage = error.message.replace("Firebase: ", "");
    displayTextMessage(errorMessage, "notify-failed", errorMessagesReset);
  }
});

function displayTextMessage(errorMessageText, errorMessageClass, errorElement) {
  errorElement.textContent = errorMessageText;
  errorElement.classList.remove("notify-success", "notify-failed");
  errorElement.classList.add(errorMessageClass);
  errorElement.style.display = "block";
  setTimeout(() => {
    errorElement.style.transform = "scale(1)";
  }, 200);
  setTimeout(() => {
    errorElement.style.transform = "scale(0)";
    setTimeout(() => {
      errorElement.style.display = "none";
    }, 300);
  }, 2000);
}
