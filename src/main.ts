// Nav scroll
const nav = document.getElementById("nav") as HTMLElement;
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
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
