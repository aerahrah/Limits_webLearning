import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, child, get } from "firebase/database";

// Initialize Firebase
const usernameID = document.getElementById("username");
const postScoreID = document.getElementById("post-score");
const preScoreID = document.getElementById("pre-score");
const practicQuizID = document.getElementById("numOfQuizTaken");
const sumScoreID = document.getElementById("sum-score");
const preTestTakerID = document.getElementById("preTestTaker");
// Do something with the UID, such as storing it in a database
const uid = localStorage.getItem("uid");
console.log(uid);
// Do something with the UID, such as fetch data from Firebase Firestore
const userRef = ref(realtimeDb, `users/${uid}`);
const promises = [];
document.getElementById("loading-screen").style.display = "block";
// Fetch data from Firebase and push the promises to the array
promises.push(
  get(child(userRef, "sumScore"))
    .then((snapshot) => {
      const sumScore = snapshot.val();
      sumScoreID.innerHTML = sumScore;
    })
    .catch((error) => {
      console.error(error);
    })
);

promises.push(
  get(child(userRef, "username"))
    .then((snapshot) => {
      const username = snapshot.val();
      usernameID.innerHTML = username;
    })
    .catch((error) => {
      console.error(error);
    })
);

promises.push(
  get(child(userRef, "postScore"))
    .then((snapshot) => {
      const score = snapshot.val();
      postScoreID.innerHTML = score;
    })
    .catch((error) => {
      console.error(error);
    })
);

promises.push(
  get(child(userRef, "preScore"))
    .then((snapshot) => {
      const score = snapshot.val();
      preScoreID.innerHTML = score;
    })
    .catch((error) => {
      console.error(error);
    })
);
promises.push(
  get(child(userRef, "preTestTaker"))
    .then((snapshot) => {
      const preTestTakerVal = snapshot.val();
      preTestTakerID.innerHTML = preTestTakerVal;
    })
    .catch((error) => {
      console.error(error);
    })
);

promises.push(
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
    })
);

// Use Promise.all() to wait for all the promises to resolve
Promise.all(promises)
  .then(() => {
    document.getElementById("loading-screen").style.display = "none";
    console.log("Data from Firebase fetched completely.");
  })
  .catch((error) => {
    console.error(error);
  });
