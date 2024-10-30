// ===== UI ELEMENT SELECTORS =====
const featuresContainer = selectSingleElement("#features-container");
const stepsContainer = selectSingleElement("#steps-container");

const hamburgerMenu = selectSingleElement("#hamburger-menu");
const mobileNav = selectSingleElement("#mobile-nav");
const closeMenu = selectSingleElement("#close-menu");

const navLinks = selectMultipleElement("#nav ul li a");
const mobileNavLinks = selectMultipleElement("#mobile-nav ul li a");

const footerSocials = document.querySelectorAll(".footer-socials a img");
const pageSections = selectMultipleElement("section");
const footer = selectSingleElement("#footer");

// ===== HELPER FUNCTIONS =====

// Function to grab single and multiple elements from the DOM
function selectSingleElement(element) {
  return document.querySelector(element);
}
function selectMultipleElement(elements) {
  return document.querySelectorAll(elements);
}

// Function to set the active link based on the current URL hash
function setActiveLink() {
  const currentHash = window.location.hash;

  navLinks.forEach((link) => {
    link.classList.remove("nav-active");
    if (link.getAttribute("href") === currentHash) {
      link.classList.add("nav-active");
    }
  });

  mobileNavLinks.forEach((link) => {
    link.classList.remove("mobile-navlink-active");
    if (link.getAttribute("href") === currentHash) {
      link.classList.add("mobile-navlink-active");
    }
  });
}

// ===== INTERSECTION OBSERVERS =====

document.addEventListener("DOMContentLoaded", function () {
  // Set initial active link
  window.location.hash = "#hero";

  const observerOptions = { root: null, threshold: 0.5 };

  // Observer to reveal features and steps on scroll
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const featureItems = featuresContainer.querySelectorAll(".feature");
  const stepItems = stepsContainer.querySelectorAll(".step");

  featureItems.forEach((item) => revealObserver.observe(item));
  stepItems.forEach((item) => revealObserver.observe(item));

  // Observer for sections to update URL hash based on viewport
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.location.hash = entry.target.id;
        }
      });
    },
    { threshold: 0.5 }
  );

  pageSections.forEach((section) => sectionObserver.observe(section));
  sectionObserver.observe(footer);
});

// ===== EVENT LISTENERS =====

// Hamburger menu toggle
hamburgerMenu.addEventListener("click", () => {
  mobileNav.classList.toggle("mobile-nav-active");
  mobileNav.classList.toggle("mobile-nav-inactive");
  document.body.style.overflow = "hidden";
});

closeMenu.addEventListener("click", () => {
  mobileNav.classList.toggle("mobile-nav-active");
  mobileNav.classList.toggle("mobile-nav-inactive");
  document.body.style.overflow = "auto";
});

// Hide mobile menu on link click
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-active");
    mobileNav.classList.toggle("mobile-nav-inactive");
    document.body.style.overflow = "auto";
  });
});

// Hover effect for footer social icons
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

// ===== INITIAL SETUP =====
setActiveLink();
window.addEventListener("hashchange", setActiveLink);
