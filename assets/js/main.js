// Grab variables from DOM
const featuresContainer = document.querySelector("#features-container");
const stepsContainer = document.querySelector("#steps-container");

const hamburgerMenu = document.getElementById("hamburger-menu");
const mobileHeader = document.getElementById("mobile-header");
const closeMenu = document.getElementById("close-menu");

const navLinks = document.querySelectorAll("#nav ul li a");
const mobileNavLinks = document.querySelectorAll("#mobile-nav ul li a");

const footerSocials = document.querySelectorAll(".footer-socials a img");

const pageSections = document.querySelectorAll("section");
const footer = document.querySelector("#footer");

// Display features and steps on scroll point
document.addEventListener("DOMContentLoaded", function () {
  // Set active link to home on DOM load
  window.location.hash = "#hero";

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

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.location.hash = entry.target.id;
      }
    });
  },
  {
    threshold: 0.5, // Adjusts how much of the section needs to be visible to trigger
  }
);

pageSections.forEach((section) => sectionObserver.observe(section));
sectionObserver.observe(footer);
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

// Function to set the active link based on the current URL hash
function setActiveLink() {
  const currentHash = window.location.hash;

  navLinks.forEach((link) => {
    link.classList.remove("nav-active"); // Remove active class from all links
    if (link.getAttribute("href") === currentHash) {
      link.classList.add("nav-active"); // Add active class to the current link
    }
  });

  mobileNavLinks.forEach((link) => {
    link.classList.remove("mobile-nav-active"); // Remove active class from all links
    if (link.getAttribute("href") === currentHash) {
      link.classList.add("mobile-nav-active"); // Add active class to the current link
    }
  });
}

// Hide mobile menu when on link click
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileHeader.classList.toggle("active");
    mobileHeader.classList.toggle("inactive");
    document.body.style.overflow = "auto";
  });
});

// Hover footer social
footerSocials.forEach((icon) => {
  icon.addEventListener("mouseover", () => {
    const newAttribute = icon.getAttribute("src").replace(".png", "-hover.png");
    icon.setAttribute("src", newAttribute);
  });

  icon.addEventListener("mouseout", () => {
    const newAttribute = icon.getAttribute("src").replace("-hover.png", ".png");
    icon.setAttribute("src", newAttribute);
  });
});

// Initial call to set the active link
setActiveLink();

// Update active link on hash change (when navigating via anchor links)
window.addEventListener("hashchange", setActiveLink);
