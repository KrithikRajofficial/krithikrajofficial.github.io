document.addEventListener("DOMContentLoaded", () => {

  /* TYPING EFFECT */
  const roles = [
    "Robotics & AI Engineer",
    "ROS • Computer Vision • Autonomous Systems",
    "Building Intelligent Machines"
  ];

  let i = 0, j = 0, del = false;
  const typing = document.getElementById("typing");

  function typeLoop() {
    const text = roles[i];
    typing.textContent = text.slice(0, j);

    j = del ? j - 1 : j + 1;

    if (j > text.length + 6) del = true;
    if (j === 0 && del) {
      del = false;
      i = (i + 1) % roles.length;
    }

    setTimeout(typeLoop, del ? 40 : 80);
  }
  typeLoop();

  /* CURSOR GLOW */
  const glow = document.querySelector(".cursor-glow");
  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
    glow.style.opacity = "1";
  });
  document.addEventListener("mouseleave", () => glow.style.opacity = "0");

  /* PARTICLES */
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const dots = Array.from({ length: 45 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.6,
    dx: (Math.random() - 0.5) * 0.25,
    dy: (Math.random() - 0.5) * 0.25
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(127,0,255,0.35)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();

  /* THEME TOGGLE */
  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  });

});
