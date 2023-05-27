const nav_items = document.querySelectorAll(".nav-item");
const lessonId = document.getElementById("lessons");
const profileId = document.getElementById("profile");
const quizId = document.getElementById("quiz");
const aboutId = document.getElementById("about-us");
const tutorialId = document.getElementById("tutorials");
const guideId = document.getElementById("guide");
const currentRoute = window.location.pathname.substring(1);

function addActiveClass(route) {
  if (route == "lesson/") {
    removeActiveClasses();
    lessonId.classList.add("active");
  }
  if (route == "profile/") {
    removeActiveClasses();
    profileId.classList.add("active");
  }
  if (route == "quiz/") {
    removeActiveClasses();
    quizId.classList.add("active");
  }
  if (route == "about-us/") {
    removeActiveClasses();
    aboutId.classList.add("active");
  }
  if (route == "guide/") {
    removeActiveClasses();
    guideId.classList.add("active");
  }
  if (route == "modules/tutorials/") {
    removeActiveClasses();
    tutorialId.classList.add("active");
  }
}
addActiveClass(currentRoute);

function removeActiveClasses() {
  nav_items.forEach((item) => {
    item.classList.remove("active");
  });
}
