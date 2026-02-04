document.addEventListener("DOMContentLoaded", () => {

  /* TYPING EFFECT */
  const roles = [
    "Robotics & AI Engineer",
    "ROS • Computer Vision • Autonomous Systems",
    "Building Intelligent Machines"
  ];

  let i = 0, j = 0, del = false;
  const typing = document.getElementById("typing");

  function type() {
    const text = roles[i];
    typing.textContent = text.substring(0, j);

    if (!del) j++;
    else j--;

    if (j > text.length + 8) del = true;
    if (j === 0 && del) {
      del = false;
      i = (i + 1) % roles.length;
    }

    setTimeout(type, del ? 40 : 80);
  }
  type();

  /* CURSOR GLOW */
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  glow.style.opacity = "1";
});

document.addEventListener("mouseleave", () => {
  glow.style.opacity = "0";
});


  /* PARTICLES */
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const dots = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
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
      ctx.fillStyle = "rgba(127,0,255,0.4)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
});
