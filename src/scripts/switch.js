import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, child, update, get, set } from "firebase/database";

const uid = localStorage.getItem("uid");
const userRef = ref(realtimeDb, `users/${uid}`);

const switchBtn1 = document.getElementById("switch-btn1");
const overlay = document.getElementById("overlay");
const confirmBox = document.getElementById("confirm-box");
const confirmYesBtn = document.getElementById("confirm-yes-btn");
const confirmNoBtn = document.getElementById("confirm-no-btn");

let moduleCompletedNumber;

get(child(userRef, "moduleCompleted"))
  .then(handleModuleCompleted)
  .catch((error) => {
    console.error(error);
  });

function handleModuleCompleted(snapshot) {
  moduleCompletedNumber = snapshot.val();
}
switchBtn1.addEventListener("click", () => {
  overlay.style.display = "block";
  confirmBox.classList.add("active");
});

confirmYesBtn.addEventListener("click", () => {
  // Code to execute when the user confirms the action
  overlay.style.display = "none";
  confirmBox.classList.remove("active");
  switchBtn1.checked = true;
  moduleCompletedNumber += 1;
  const moduleCompletedAdd = {
    moduleCompleted: moduleCompletedNumber,
  };
  confirmYesBtn.disabled = true;
  confirmNoBtn.disabled = false;
  saveSwitchState("switch1", switchBtn1.checked);
  update(userRef, moduleCompletedAdd)
    .then(() => {
      console.log("New child node added successfully!");
    })
    .catch((error) => {
      console.error("Error adding new child node: ", error);
    });
});

confirmNoBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  confirmBox.classList.remove("active");
  switchBtn1.checked = false;
  moduleCompletedNumber -= 1;
  confirmYesBtn.disabled = false;
  confirmNoBtn.disabled = true;
  const moduleCompletedAdd = {
    moduleCompleted: moduleCompletedNumber,
  };
  saveSwitchState("switch1", switchBtn1.checked);
  update(userRef, moduleCompletedAdd)
    .then(() => {
      console.log("New child node added successfully!");
    })
    .catch((error) => {
      console.error("Error adding new child node: ", error);
    });
});

function saveSwitchState(id, state) {
  // Get the user ID from Firebase Authentication
  const userRefSwitch = ref(realtimeDb, `users/${uid}/switchStates/${id}`);

  // Save the switch button state in the Realtime Database
  set(userRefSwitch, state)
    .then(() => {
      console.log("New child node added successfully!");
    })
    .catch((error) => {
      console.error("Error adding new child node: ", error);
    });
}
function getSwitchState(id) {
  // Get the user ID from Firebase Authentication
  const userRefSwitch = ref(realtimeDb, `users/${uid}/switchStates/`);

  // Save the switch button state in the Realtime Database
  get(child(userRefSwitch, id))
    .then(handleGetSwitchState)
    .catch((error) => {
      console.error(error);
    });
}

function handleGetSwitchState(snapshot) {
  const state = snapshot.val();
  if (state === true) {
    switchBtn1.checked = true;
  } else {
    // Otherwise, uncheck the switch input
    switchBtn1.checked = false;
  }
}

getSwitchState("switch1");
