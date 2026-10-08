/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  const icon = menuToggle.querySelector("i");

  if (navMenu.classList.contains("open")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

/* Close mobile menu when link is clicked */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

/* =====================================================
   DARK MODE
===================================================== */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const darkMode = document.body.classList.contains("dark-mode");

  if (darkMode) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");

    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");

    localStorage.setItem("theme", "light");
  }
});

/* =====================================================
   TYPING ANIMATION
===================================================== */

const typingText = document.getElementById("typingText");

const words = [
  "Web Developer",
  "Frontend Developer",
  "JavaScript Developer",
  "UI Designer",
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;

      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =====================================================
   SCROLL ANIMATION
===================================================== */

const animatedElements = document.querySelectorAll(
  ".section, .hero-content, .hero-image",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

animatedElements.forEach((element) => {
  observer.observe(element);
});

/* =====================================================
   SKILL PROGRESS BARS
===================================================== */

const skillSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".progress-bar");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressBars.forEach((bar) => {
          bar.style.width = bar.dataset.width;
        });

        skillObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
  },
);

skillObserver.observe(skillSection);

/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim();

  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = "Please fill in all fields.";

    formMessage.style.color = "#dc2626";

    return;
  }

  formMessage.textContent = "Thank you! Your message has been received.";

  formMessage.style.color = "#00a6a6";

  contactForm.reset();
});

/* =====================================================
   CURRENT YEAR
===================================================== */

document.getElementById("currentYear").textContent = new Date().getFullYear();
