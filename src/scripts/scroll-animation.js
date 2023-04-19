const elementsToAnimate = document.querySelectorAll(".scroll-fade");

window.addEventListener("scroll", () => {
  // get the current scroll position
  const scrollPosition = window.scrollY;

  // loop through the elements to animate and check if they are in the viewport
  elementsToAnimate.forEach((element) => {
    // get the top position of the element
    const elementTop = element.offsetTop;

    // if the element is in the viewport, add the class to trigger the animation
    if (scrollPosition > elementTop - window.innerHeight) {
      element.classList.add("animate-fade");
    }
  });
});
