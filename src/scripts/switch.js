import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, child, update, get, set } from "firebase/database";

const uid = localStorage.getItem("uid");
const userRef = ref(realtimeDb, `users/${uid}`);
let switchBtns = [];
let confirmYesBtns = [];
let confirmNoBtns = [];
let overlay = [];
let confirmBox = [];
let moduleCompletedNumber;

get(child(userRef, "moduleCompleted"))
  .then(handleModuleCompleted)
  .catch((error) => {
    console.error(error);
  });

for (let i = 1; i <= 12; i++) {
  switchBtns.push(document.getElementById(`switch-btn${i}`));
  confirmYesBtns.push(document.getElementById(`confirm-yes-btn${i}`));
  confirmNoBtns.push(document.getElementById(`confirm-no-btn${i}`));
  overlay.push(document.getElementById(`overlay${i}`));
  confirmBox.push(document.getElementById(`confirm-box${i}`));
}

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i <= 12; i++) {
    setTimeout(() => {
      switchEvent(
        switchBtns[i],
        overlay[i],
        confirmBox[i],
        confirmYesBtns[i],
        confirmNoBtns[i],
        i
      );
    }, 0);
  }
  function switchEvent(
    switchBtn,
    overlay,
    confirmBox,
    confirmYesBtn,
    confirmNoBtn,
    i
  ) {
    switchBtn?.addEventListener("click", () => {
      overlay.style.display = "block";
      confirmBox.classList.add("active");
    });
    console.log(switchBtn);
    confirmYesBtn?.addEventListener("click", () => {
      // Code to execute when the user confirms the action
      console.log("click yes");
      overlay.style.display = "none";
      confirmBox.classList.remove("active");
      switchBtn.checked = true;
      confirmYesBtn.disabled = true;
      confirmNoBtn.disabled = false;
      updateModuleCompletedNumber(1);
      saveSwitchState(`switch${i}`, switchBtn.checked);
    });

    confirmNoBtn?.addEventListener("click", () => {
      console.log(switchBtn);
      console.log("click no");
      overlay.style.display = "none";
      confirmBox.classList.remove("active");
      switchBtn.checked = false;
      confirmYesBtn.disabled = false;
      confirmNoBtn.disabled = true;
      updateModuleCompletedNumber(-1);
      saveSwitchState(`switch${i}`, switchBtn.checked);
    });
    if (switchBtn) {
      getSwitchState?.(`switch${i}`, switchBtn, confirmYesBtn, confirmNoBtn);
    }
  }
});
function getSwitchState(id, switchBtn, confirmYes, confirmNo) {
  // Get the user ID from Firebase Authentication
  const userRefSwitch = ref(realtimeDb, `users/${uid}/switchStates/`);

  // Save the switch button state in the Realtime Database
  get(child(userRefSwitch, id))
    .then(handleGetSwitchState.bind(null, switchBtn, confirmYes, confirmNo))
    .catch((error) => {
      console.error(error);
    });
}

function handleGetSwitchState(switchBtn, confirmYes, confirmNo, snapshot) {
  const state = snapshot.val();
  console.log(confirmYes);
  if (state === true) {
    switchBtn.checked = true;
    confirmYes.disabled = true;
    confirmNo.disabled = false;
  } else {
    switchBtn.checked = false;
    confirmYes.disabled = false;
    confirmNo.disabled = true;
  }
}

function handleModuleCompleted(snapshot) {
  moduleCompletedNumber = snapshot.val();
}

function updateModuleCompletedNumber(incr) {
  moduleCompletedNumber += incr;
  console.log(moduleCompletedNumber);
  const moduleCompletedAdd = {
    moduleCompleted: moduleCompletedNumber,
  };
  update(userRef, moduleCompletedAdd)
    .then(() => {
      console.log("Module completed number updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating module completed number: ", error);
    });
}

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
