import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, child, get } from "firebase/database";

// Initialize Firebase
const usernameID = document.getElementById("username");
const postScoreID = document.getElementById("post-score");
const preScoreID = document.getElementById("pre-score");
// Do something with the UID, such as storing it in a database
const uid = localStorage.getItem("uid");
console.log(uid);
// Do something with the UID, such as fetch data from Firebase Firestore
const userRef = ref(realtimeDb, `users/${uid}`);
get(child(userRef, "email"))
  .then((snapshot) => {
    const email = snapshot.val();
    console.log("Email:", email);
  })
  .catch((error) => {
    console.error(error);
  });
get(child(userRef, "username"))
  .then((snapshot) => {
    const username = snapshot.val();
    console.log("Username:", username);
    usernameID.innerHTML = username;
  })
  .catch((error) => {
    console.error(error);
  });
get(child(userRef, "postScore"))
  .then((snapshot) => {
    const score = snapshot.val();
    console.log("postscore:", score);
    postScoreID.innerHTML = score;
  })
  .catch((error) => {
    console.error(error);
  });
get(child(userRef, "preScore"))
  .then((snapshot) => {
    const score = snapshot.val();
    console.log("prescore:", score);
    preScoreID.innerHTML = score;
  })
  .catch((error) => {
    console.error(error);
  });
get(child(userRef, "moduleCompleted"))
  .then((snapshot) => {
    const moduleNum = snapshot.val();
    console.log("Module num:", moduleNum);

    if (moduleNum <= 13) {
      var progressBar = document.getElementById("progress-bar");
      var width = (moduleNum / 13) * 100;
      progressBar.style.width = width + "%";
      document.getElementById("progress-text").textContent =
        "Completed Modules: " + moduleNum + "/13";
    }
  })
  .catch((error) => {
    console.error(error);
  });
