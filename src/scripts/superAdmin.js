import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, get, update } from "firebase/database";

const userRef = ref(realtimeDb, "users");

const username = document.getElementById("username");
const tableCardId = document.getElementById("table-container-card");
let tableCard = "";
get(userRef)
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const uid = childSnapshot.key;
      const user = childSnapshot.val();

      const date = new Date(user.last_login);

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };

      console.log(date.toLocaleString("en-US", options));

      // Display user information
      tableCard += `<div class="table-container--item">
        <h1 class="header-username secondary-text text-center">${
          user.username
        }</h1>
        <div class="table-container--content">
          <p>UID: <strong>${uid}</strong></p>
          <p>email: <strong>${user.email}</strong></p>
          <p>module completed: <strong>${user.moduleCompleted}</strong></p>
          <p>pre-test taker: <strong>${user.preTestTaker}</strong></p>
          <p>pre-score: <strong>${user.preScore}</strong></p>
          <p>post-score: <strong>${user.postScore}</strong></p>
          <p>summative-score: <strong>${user.sumScore}</strong></p>
          <p>last-login: <strong>${date.toLocaleString(
            "en-US",
            options
          )}</strong></p>
        </div>
      </div>`;
      console.log("UID: " + uid);
      console.log("UserName: " + user.username);
      console.log("Email: " + user.email);
      console.log("Pre-test : " + user.age);
      //   username.innerHTML = uid;
    });

    tableCardId.innerHTML = tableCard;
  })
  .catch((error) => {
    console.error(error);
  });
