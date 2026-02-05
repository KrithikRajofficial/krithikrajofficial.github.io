// Star Background Engine
const starContainer = document.getElementById('star-container');
const createStars = () => {
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.setProperty('--duration', Math.random() * 3 + 2 + 's');
        starContainer.appendChild(star);
    }
};
createStars();

// Typing Effect
const typingText = document.querySelector('.typing-text');
const roles = ["Robotics Engineer.", "UAV Systems Expert.", "AI Research Graduate."];
let roleIdx = 0, charIdx = 0, isDeleting = false;

function type() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingText.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 50 : 150;
    if (!isDeleting && charIdx === currentRole.length) {
        speed = 2000; isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false; roleIdx = (roleIdx + 1) % roles.length;
        speed = 500;
    }
    setTimeout(type, speed);
}
type();

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
themeBtn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.querySelector('.icon').textContent = isDark ? '☀️' : '🌙';
});

// Cursor Glow Tracking
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});
