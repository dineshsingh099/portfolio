const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		navLinks.forEach((l) => l.classList.remove("active"));
		link.classList.add("active");
		document.getElementById("navMenu").classList.remove("open");
		document.getElementById("hamburger").classList.remove("open");
	});
});

const navbar = document.getElementById("navbar");
window.addEventListener(
	"scroll",
	() => {
		navbar.classList.toggle("scrolled", window.scrollY > 50);
	},
	{ passive: true },
);

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("open");
	navMenu.classList.toggle("open");
});

const navCloseBtn = document.getElementById("navCloseBtn");
if (navCloseBtn) {
	navCloseBtn.addEventListener("click", () => {
		navMenu.classList.remove("open");
		hamburger.classList.remove("open");
	});
}

document.addEventListener("click", (e) => {
	if (!navbar.contains(e.target)) {
		hamburger.classList.remove("open");
		navMenu.classList.remove("open");
	}
});

const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				navLinks.forEach((link) => {
					link.classList.remove("active");
					if (link.getAttribute("href") === `#${entry.target.id}`) {
						link.classList.add("active");
					}
				});
			}
		});
	},
	{ threshold: 0.3 },
);

sections.forEach((s) => sectionObserver.observe(s));

const roles = [
	"Data Analyst",
	"Web Developer",
	"ML Engineer",
	"Power BI Expert",
];
let roleIndex = 0,
	charIndex = 0,
	deleting = false;

function typeWrite() {
	const el = document.getElementById("typewriter");
	if (!el) return;
	const current = roles[roleIndex];

	if (deleting) {
		el.textContent = current.substring(0, charIndex--);
		if (charIndex < 0) {
			deleting = false;
			roleIndex = (roleIndex + 1) % roles.length;
			setTimeout(typeWrite, 400);
			return;
		}
		setTimeout(typeWrite, 60);
	} else {
		el.textContent = current.substring(0, charIndex++);
		if (charIndex > current.length) {
			deleting = true;
			setTimeout(typeWrite, 1800);
			return;
		}
		setTimeout(typeWrite, 100);
	}
}
typeWrite();

const filterBtns = document.querySelectorAll(".filter-btn");
const skillCards = document.querySelectorAll(".skill-card");

filterBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		filterBtns.forEach((b) => b.classList.remove("active"));
		btn.classList.add("active");
		const filter = btn.dataset.filter;
		skillCards.forEach((card) => {
			if (filter === "all" || card.dataset.category === filter) {
				card.style.display = "";
				card.style.opacity = "0";
				card.style.transform = "translateY(20px)";
				requestAnimationFrame(() => {
					card.style.transition = "opacity 0.4s, transform 0.4s";
					card.style.opacity = "1";
					card.style.transform = "translateY(0)";
				});
			} else {
				card.style.display = "none";
			}
		});
	});
});

const revealSelector =
	".stat-card, .skill-card, .project-card, .cert-card, .tl-card, .resume-card";

document.querySelectorAll(revealSelector).forEach((el) => {
	el.style.opacity = "0";
	el.style.transform = "translateY(28px)";
	el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

function revealOnScroll() {
	document.querySelectorAll(revealSelector).forEach((el) => {
		if (
			el.getBoundingClientRect().top < window.innerHeight - 80 &&
			!el.classList.contains("revealed")
		) {
			el.classList.add("revealed");
			el.style.opacity = "1";
			el.style.transform = "translateY(0)";
		}
	});
}

window.addEventListener("scroll", revealOnScroll, { passive: true });
window.addEventListener("load", revealOnScroll);
setTimeout(revealOnScroll, 300);

const backToTopBtn = document.getElementById("backToTop");
window.addEventListener(
	"scroll",
	() => {
		backToTopBtn.classList.toggle("visible", window.scrollY > 400);
	},
	{ passive: true },
);

backToTopBtn.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {
	contactForm.addEventListener("submit", function (e) {
		e.preventDefault();
		if (submitBtn.disabled) return;
		submitBtn.disabled = true;
		submitBtn.innerHTML = "Sending...";

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(new FormData(contactForm)).toString(),
		})
			.then(() => {
				formSuccess.classList.add("show");
				contactForm.reset();
				submitBtn.innerHTML = "Sent ✅";
				setTimeout(() => {
					formSuccess.classList.remove("show");
					submitBtn.disabled = false;
					submitBtn.innerHTML =
						'<i class="fa-solid fa-paper-plane"></i> Send Message';
				}, 3000);
			})
			.catch(() => {
				alert("Something went wrong ❌");
				submitBtn.disabled = false;
				submitBtn.innerHTML =
					'<i class="fa-solid fa-paper-plane"></i> Send Message';
			});
	});
}

window.addEventListener(
	"scroll",
	() => {
		const hero = document.querySelector(".hero");
		if (!hero) return;
		const orbs = hero.querySelectorAll(".hero-orb");
		orbs.forEach((orb, i) => {
			orb.style.transform = `translateY(${window.scrollY * (0.1 + i * 0.05)}px)`;
		});
	},
	{ passive: true },
);

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
let mouseX = 0,
	mouseY = 0,
	ringX = 0,
	ringY = 0;

document.addEventListener("mousemove", (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;
	cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
	ringX += (mouseX - ringX) * 0.12;
	ringY += (mouseY - ringY) * 0.12;
	cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
	requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener("click", () => {
	cursorRing.classList.add("clicked");
	setTimeout(() => cursorRing.classList.remove("clicked"), 300);
});
