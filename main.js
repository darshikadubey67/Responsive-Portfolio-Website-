// main.js
// About Section
// ================= ScrollReveal Global Animation =================

ScrollReveal({
  duration: 1200,
  distance: '50px',
  easing: 'ease-in-out',
  reset: false,
  viewFactor: 0.2, // reveals earlier
}).reveal(`
  header,
  section,
  section h1,
  section h2,
  section h3,
  section p,
  .about__container,
  .skills__container,
  .skills__block li,
  .service__card,
  .portfolio__container,
  .portfolio__card,
  .contact__socials a,
  footer,
  .btn,
  .button,
  a,
  .chatbot-box
`, {
  interval: 100,
  origin: 'bottom',
});

// Optional zoom effect for cards
ScrollReveal().reveal('.portfolio__card, .service__card', {
  duration: 1000,
  scale: 0.95,
  interval: 120,
  origin: 'bottom',
  reset: false,
});

// Optional from left/right for variety
ScrollReveal().reveal('.skills__container, .about__container', {
  origin: 'left',
});

ScrollReveal().reveal('.contact__form, .contact__socials', {
  origin: 'right',
});


// Animate Contact Social Icons
ScrollReveal().reveal('.contact__socials a', {
  duration: 1000,
  distance: '30px',
  origin: 'bottom',
  interval: 200,
  easing: 'ease-in-out',
  reset: false,
});

// Function to open custom "Hire Me" tab
function openHirePage() {
  window.open("hire.html", "_blank");
}
const hireBtn = document.querySelector('.btn.hire-me');

hireBtn.addEventListener('click', () => {
  hireBtn.classList.add('click-animate');

  setTimeout(() => {
    hireBtn.classList.remove('click-animate');
    window.open('hire.html', '_blank');
  }, 400); // Match animation duration
});
function hireClick() {
  const button = document.querySelector('.hire-click');
  button.classList.add('clicking');

  setTimeout(() => {
    button.classList.remove('clicking');
    window.open('hire.html', '_blank');
  }, 400); // 400ms = same as pulse duration
}

document.querySelector('.animate-contact').style.border = '2px solid lime';


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.portfolio__card');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
});


