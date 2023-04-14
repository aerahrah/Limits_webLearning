import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, child, update, get, set } from "firebase/database";

const uid = localStorage.getItem("uid");
const userRef = ref(realtimeDb, `users/${uid}/switchStates`);
console.log(uid);

let circleIds = [];
let switchStatesNode = [];

for (let i = 1; i <= 12; i++) {
  circleIds.push(document.getElementById(`circle-icon${i}`));
}

const fetchData = async () => {
  try {
    document.getElementById("loading-screen").style.display = "block";
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const switchStatesNode = [];
      // Loop through each child node of "switchstate"
      snapshot.forEach((childSnapshot) => {
        // Get the child name
        const circleName = childSnapshot.key;
        // Get the child value
        const circleValue = childSnapshot.val();
        // Create an object with the child name and value
        const childNode = { name: circleName, value: circleValue };
        switchStatesNode.push(childNode);
      });
      for (let i = 0; i < switchStatesNode.length; i++) {
        const childNode = switchStatesNode[i];
        const childName = childNode.name;
        const childValue = childNode.value;
        if (childValue == true) {
          circleIds[i].classList.remove("fa-circle");
          circleIds[i].classList.add("fa-circle-check");
        }
      }
      document.getElementById("loading-screen").style.display = "none";
      return switchStatesNode;
    } else {
      console.log("No data available for the specified user.");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
};

(async () => {
  try {
    const switchStatesNode = await fetchData();
    // Log the switchStatesNode array or perform DOM operations here
    console.log(switchStatesNode);
    // Load the DOM or execute other code that depends on the fetched data
  } catch (error) {
    console.error(error);
  }
})();
