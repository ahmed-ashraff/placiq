// Nav scroll
const nav = document.getElementById("nav") as HTMLElement;
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
const navCta = document.querySelector(".nav-cta") as HTMLElement | null;

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.classList.toggle("open", isOpen);

        // Move CTA into / out of the drawer
        if (navCta) {
            if (isOpen) {
                navLinks.appendChild(navCta);
                navCta.classList.add("open");
            } else {
                navToggle.parentElement?.appendChild(navCta);
                navCta.classList.remove("open");
            }
        }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("open");
            navLinks.classList.remove("open");
            if (navCta) {
                navToggle.parentElement?.appendChild(navCta);
                navCta.classList.remove("open");
            }
        });
    });
}

// Reset mobile nav when resizing to desktop
function closeMobileNav(): void {
    if (navToggle && navLinks && navCta) {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
        navCta.classList.remove("open");
        // Move CTA back to nav (outside nav-links)
        nav.appendChild(navCta);
    }
}
window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
        closeMobileNav();
    }
});

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
