const switchBtn = document.getElementById("switch-btn");
const overlay = document.getElementById("overlay");
const confirmBox = document.getElementById("confirm-box");
const confirmYesBtn = document.getElementById("confirm-yes-btn");
const confirmNoBtn = document.getElementById("confirm-no-btn");

switchBtn.addEventListener("click", () => {
  overlay.style.display = "block";
  confirmBox.classList.add("active");
});

confirmYesBtn.addEventListener("click", () => {
  // Code to execute when the user confirms the action
  overlay.style.display = "none";
  confirmBox.classList.remove("active");
  switchBtn.checked = true;
});

confirmNoBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  confirmBox.classList.remove("active");
  switchBtn.checked = false;
});
