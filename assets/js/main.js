// Grab variables from DOM
const featuresContainer = document.querySelector("#features-container");
const stepsContainer = document.querySelector("#steps-container");

const hamburgerMenu = document.getElementById("hamburger-menu");
const mobileHeader = document.getElementById("mobile-header");
const closeMenu = document.getElementById("close-menu");

// Display features and steps on scroll point
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    root: null, // relative to viewport
    threshold: 0.5, // trigger when 50% is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Select and observe each child in features and steps containers
  const featureItems = featuresContainer.querySelectorAll(".feature");
  const stepItems = stepsContainer.querySelectorAll(".step");

  stepItems.forEach((item) => observer.observe(item));
  featureItems.forEach((item) => observer.observe(item));
});

// Display hamburger menu
hamburgerMenu.addEventListener("click", () => {
  mobileHeader.classList.toggle("active");
  mobileHeader.classList.toggle("inactive");
  document.body.style.overflow = "hidden";
});

// Hide hamburger menu
closeMenu.addEventListener("click", () => {
  mobileHeader.classList.toggle("active");
  mobileHeader.classList.toggle("inactive");
  document.body.style.overflow = "auto";
});
