import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, child, get, update } from "firebase/database";

// Initialize Firebase
const usernameID = document.getElementById("username");
const postScoreID = document.getElementById("post-score");
const preScoreID = document.getElementById("pre-score");
const practiceQuizID = document.getElementById("numOfQuizTaken");
const sumScoreID = document.getElementById("sum-score");
const preTestTakerID = document.getElementById("preTestTaker");
const avatarImgID = document.getElementById("avatar-img");
const avatarImgDefaultID = document.getElementById("avatar-img-default");
const avatarImgContainerID = document.getElementById("avatar-img-container");
const overlayProfileID = document.getElementById("overlay-profile");
const editUsernameCloseBtn = document.getElementById("close-btn-1");
const editUsernameID = document.getElementById("edit-username");
const editUsernameCard = document.getElementById("edit-username-CardContainer");
const changeUsernameBtn = document.getElementById("change-username-btn");
const changeUsernameValue = document.getElementById("change-username-value");
const avatarImg1ID = document.getElementById("avatar-img-1");
const avatarImg2ID = document.getElementById("avatar-img-2");
const avatarImg3ID = document.getElementById("avatar-img-3");
const avatarImg4ID = document.getElementById("avatar-img-4");
const avatarImg5ID = document.getElementById("avatar-img-5");
const avatarImg6ID = document.getElementById("avatar-img-6");
const avatarImg7ID = document.getElementById("avatar-img-7");
const avatarChangeBtn = document.getElementById("avatar-change");
const closeBtn = document.getElementById("close-btn");
const errorMessagesReset = document.getElementById("notify-reset");
// Do something with the UID, such as storing it in a database
const uid = localStorage.getItem("uid");

// Do something with the UID, such as fetch data from Firebase Firestore
const userRef = ref(realtimeDb, `users/${uid}`);
const promises = [];
document.getElementById("loading-screen").style.display = "block";
// Fetch data from Firebase and push the promises to the array
function updateAvatar(imgSrc) {
  const imgUpdate = { avatarImg: imgSrc };
  avatarImgID.src = imgSrc;
  avatarDisplay("remove", "active", "none");
  update(userRef, imgUpdate);
}

let userPreTestScore;
let userPostTestScore;
// Use a loop to add click event listeners to all avatar images
const avatarImgIDs = [
  avatarImgDefaultID,
  avatarImg1ID,
  avatarImg2ID,
  avatarImg3ID,
  avatarImg4ID,
  avatarImg5ID,
  avatarImg6ID,
  avatarImg7ID,
];
for (const avatarImgID of avatarImgIDs) {
  avatarImgID.addEventListener("click", () => {
    updateAvatar(avatarImgID.src);
  });
}

// Add click event listeners to change and close buttons
avatarChangeBtn.addEventListener("click", () => {
  avatarDisplay("add", "active", "block");
});
closeBtn.addEventListener("click", () => {
  avatarDisplay("remove", "active", "none");
  overlayProfileID.classList.remove("active");
});
function avatarDisplay(button, container, overlay) {
  if (button == "remove") {
    avatarImgContainerID.classList.remove(container);
  } else {
    avatarImgContainerID.classList.add(container);
  }
  overlayProfileID.style.display = overlay;
}

editUsernameCloseBtn.addEventListener("click", () => {
  overlayProfileID.style.display = "none";
  editUsernameCard.classList.remove("active");
});
editUsernameID.addEventListener("click", () => {
  editUsernameCard.classList.add("active");
  overlayProfileID.style.display = "block";
});
changeUsernameBtn.addEventListener("click", () => {
  if (changeUsernameValue.value) {
    update(userRef, {
      username: changeUsernameValue.value,
    });

    displayTextMessage(
      "Successfully changed username",
      "notify-success",
      errorMessagesReset
    );
    setTimeout(() => {
      location.reload();
    }, 1500);
  } else {
    displayTextMessage(
      "You need to input a username",
      "notify-failed",
      errorMessagesReset
    );
  }
});

function displayTextMessage(errorMessageText, errorMessageClass, errorElement) {
  errorElement.textContent = errorMessageText;
  errorElement.classList.remove("notify-success", "notify-failed");
  errorElement.classList.add(errorMessageClass);
  errorElement.style.display = "block";
  setTimeout(() => {
    errorElement.style.transform = "scale(1)";
  }, 50);
  setTimeout(() => {
    errorElement.style.transform = "scale(0)";
    setTimeout(() => {
      errorElement.style.display = "none";
    }, 100);
  }, 700);
}
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
  get(child(userRef, "quizTaken"))
    .then((snapshot) => {
      const quizTakenValue = snapshot.val();
      practiceQuizID.innerHTML = quizTakenValue;
    })
    .catch((error) => {
      console.error(error);
    })
);

promises.push(
  get(child(userRef, "avatarImg"))
    .then((snapshot) => {
      const img = snapshot.val();
      avatarImgID.src = img;
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
      userPostTestScore = score;
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
      userPreTestScore = score;
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

      if (moduleNum <= 13) {
        let progressBar = document.getElementById("progress-bar");
        let width = (moduleNum / 13) * 100;
        progressBar.style.width = width + "%";
        document.getElementById("progress-text").textContent =
          "Completed Modules: " + moduleNum + "/13";
      }
    })
    .catch((error) => {
      console.error(error);
    })
);
promises.push(
  get(child(userRef, "preTestTaker"))
    .then((snapshot) => {
      const testTaker = snapshot.val();
      const scoreImprovement = userPostTestScore - userPreTestScore;
      const maxImprovement = 20;
      let progressPercent = 0;
      let progressPercentNegative = 0;
      if (testTaker == "no") {
        console.log("notest");
        let progressBar = document.getElementById("progress-bar-1");
        progressBar.style.opacity = 0.5;
        document.getElementById("progress-text-1").textContent =
          "N/A for not Pre-test taker";
      } else if (testTaker == "N/A") {
        document.getElementById("progress-text-1").textContent =
          "Take the post-test quiz first";
      } else {
        let progressBar = document.getElementById("progress-bar-1");
        if (scoreImprovement >= 0) {
          progressPercent = Math.round(
            (scoreImprovement / maxImprovement) * 100
          );
          progressBar.style.backgroundColor = "#39a24d";
        } else {
          progressPercent = Math.round(
            (scoreImprovement / userPreTestScore) * 100
          );
          progressPercentNegative = progressPercent * -1;
          progressBar.style.backgroundColor = "#c92a2a";
        }

        if (progressPercent < 0 || progressPercent == 0) {
          progressBar.style.width = progressPercentNegative + "%";
          document.getElementById("progress-text-1").textContent =
            "Score Improvement: " + progressPercent + "%";
        } else {
          progressBar.style.width = progressPercent + "%";
          document.getElementById("progress-text-1").textContent =
            "Score Improvement: " + progressPercent + "%";
        }
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
