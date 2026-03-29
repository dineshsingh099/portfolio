/* ============================================
   DINESH SINGH PORTFOLIO – SCRIPT.JS
   Enhanced JavaScript
   ============================================ */

// ---- NAVBAR: Active Link on Click ----
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    // Close mobile menu if open
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('menuToggle').classList.remove('open');
  });
});

// ---- NAVBAR: Scrolled Class ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- MOBILE MENU TOGGLE ----
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    menuToggle.classList.remove('open');
    mobileNav.classList.remove('open');
  }
});

// ---- ACTIVE NAV ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const observerOptions = { threshold: 0.3 };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ---- TYPEWRITER EFFECT ----
const texts = ['Data Analyst', 'Web Developer', 'ML Engineer', 'Power BI Expert'];
let textIndex = 0, charIndex = 0, isDeleting = false;

function typeWrite() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const current = texts[textIndex];

  if (isDeleting) {
    el.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeWrite, 400);
      return;
    }
    setTimeout(typeWrite, 60);
  } else {
    el.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeWrite, 1800);
      return;
    }
    setTimeout(typeWrite, 100);
  }
}
typeWrite();

// ---- SKILLS FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards  = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    skillCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.4s, transform 0.4s';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---- SCROLL REVEAL (lightweight) ----
function revealOnScroll() {
  const reveals = document.querySelectorAll(
    '.stat-card, .skill-card, .project-card, .cert-card, .tl-card, .resume-card'
  );

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 80;
    if (inView && !el.classList.contains('revealed')) {
      el.classList.add('revealed');
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

// Set initial state for reveal elements
document.querySelectorAll(
  '.stat-card, .skill-card, .project-card, .cert-card, .tl-card, .resume-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);
setTimeout(revealOnScroll, 300);

// ---- BACK TO TOP ----
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}, { passive: true });

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- CONTACT FORM (UI only) ----
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
      formSuccess.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        formSuccess.classList.remove('show');
      }, 4000);
    }, 1500);
  });
}

// ---- SMOOTH HERO PARALLAX ----
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const scrolled = window.scrollY;
  const orbs = hero.querySelectorAll('.hero-bg-orb');
  orbs.forEach((orb, i) => {
    orb.style.transform = `translateY(${scrolled * (0.1 + i * 0.05)}px)`;
  });
}, { passive: true });
