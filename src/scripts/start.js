const vidContainer = document.getElementById("vid-container");
const acceptBtn = document.getElementById("accept-btn");
const skipBtn = document.getElementById("skip-video-btn");
const overlayStart = document.getElementById("overlay-start");

console.log(acceptBtn);
console.log(vidContainer);
console.log(overlayStart);
acceptBtn.addEventListener("click", () => {
  vidContainer.classList.add("active");
  overlayStart.style.display = "block";
  console.log("asdfasdf", vidContainer);
  console.log("asdfasdfasdf", overlayStart);
});
skipBtn.addEventListener("click", () => {
  vidContainer.classList.remove("active");
  overlayStart.style.display = "none";
});
