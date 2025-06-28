// Typing Animation
const texts = ["Web Developer", "UI/UX Designer", "Full Stack Developer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
  const currentText = texts[textIndex];
  const typingElement = document.querySelector(".typing-text");

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => (isDeleting = true), pauseTime);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "";
});

navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const themeText = themeToggle.querySelector("span");

function updateThemeUI(isDark) {
  themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  themeText.textContent = isDark ? "Light Mode" : "Dark Mode";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("light-theme");
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  updateThemeUI(isDark);
  localStorage.setItem("theme", isDark ? "dark-theme" : "light-theme");
});

// Form Submission
const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const formData = new FormData(contactForm);
  const formValues = Object.fromEntries(formData.entries());

  // Basic form validation
  if (!formValues.name || !formValues.email || !formValues.message) {
    alert("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formValues.email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Show success message
  successMessage.style.display = "block";
  contactForm.reset();

  // Hide success message after 3 seconds
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
});

// Scroll Animation for Sections
const sections = document.querySelectorAll("section");
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      sectionObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Navbar Scroll Behavior
let lastScroll = 0;
let isScrolling;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const currentScroll = window.pageYOffset;

  window.clearTimeout(isScrolling);

  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;

  isScrolling = setTimeout(() => {
    navbar.style.transform = "translateY(0)";
  }, 150);
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  typeText();

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.className = savedTheme;
    updateThemeUI(savedTheme === "dark-theme");
  }

  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
