document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     TYPING ANIMATION
  ============================== */
  const roles = [
    "Robotics & AI Engineer",
    "ROS • Computer Vision • Autonomous Systems",
    "Building Intelligent Machines"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typingElement = document.getElementById("typing");

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting && charIndex <= current.length) {
      typingElement.textContent = current.substring(0, charIndex++);
    } else if (deleting && charIndex >= 0) {
      typingElement.textContent = current.substring(0, charIndex--);
    }

    if (charIndex === current.length + 8) deleting = true;
    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeLoop, deleting ? 40 : 80);
  }

  if (typingElement) typeLoop();

  /* ==============================
     SCROLL REVEAL
  ============================== */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".skill-card, .project-card")
    .forEach(el => observer.observe(el));

  /* ==============================
     CURSOR GLOW
  ============================== */
  const cursor = document.querySelector(".cursor-glow");
  if (cursor) {
    document.addEventListener("mousemove", e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
    });
  }

  /* ==============================
     PARTICLES
  ============================== */
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  }));

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(127,0,255,0.4)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();

  /* ==============================
     THEME TOGGLE
  ============================== */
  const toggle = document.getElementById("themeToggle");

  if (toggle) {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light");
      toggle.textContent = "☀️";
    }

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const isLight = document.body.classList.contains("light");
      toggle.textContent = isLight ? "☀️" : "🌙";
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

});
