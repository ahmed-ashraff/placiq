// Nav scroll
const nav = document.getElementById("nav") as HTMLElement;
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
const navCta = document.querySelector(".nav-cta");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("open");
        navLinks.classList.toggle("open");
        navCta?.classList.toggle("open");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("open");
            navLinks.classList.remove("open");
            navCta?.classList.remove("open");
        });
    });
}

// Scroll reveal
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((el) => {
            if (el.isIntersecting) el.target.classList.add("visible");
        });
    },
    { threshold: 0.1 },
);

document
    .querySelectorAll(".scroll-reveal")
    .forEach((el) => observer.observe(el));

// Animate metrics counter
export function countUp(el: HTMLElement, target: number, suffix = ""): void {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.innerHTML =
            (target >= 100 ? Math.floor(current) : current.toFixed(1)) +
            "<span>" +
            suffix +
            "</span>";
        if (current >= target) clearInterval(timer);
    }, 16);
}
