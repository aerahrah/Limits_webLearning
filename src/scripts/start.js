const vidContainer = document.getElementById("vid-container");
const mainContainer = document.getElementById("main-container");
const acceptBtn = document.getElementById("accept-btn");
const skipBtn = document.getElementById("start-btn");
const overlayStart = document.getElementById("overlay-start");

acceptBtn.addEventListener("click", () => {
  vidContainer.classList.add("active");
  overlayStart.style.display = "block";
});
skipBtn.addEventListener("click", () => {
  vidContainer.classList.remove("active");
  overlayStart.style.display = "none";
});
