document.addEventListener("DOMContentLoaded", () => {

  /* Typing */
  const roles = [
    "Robotics & AI Engineer",
    "ROS • Computer Vision • Autonomous Systems",
    "Building Intelligent Machines"
  ];
  let i = 0, j = 0, del = false;
  const el = document.getElementById("typing");

  function type() {
    if (!el) return;
    const text = roles[i];
    el.textContent = text.substring(0, j);

    if (!del) j++; else j--;

    if (j > text.length + 8) del = true;
    if (j === 0 && del) { del = false; i = (i + 1) % roles.length; }

    setTimeout(type, del ? 40 : 80);
  }
  type();

  /* Cursor Glow */
  const cursor = document.querySelector(".cursor-glow");
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  /* Particles */
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
    r: Math.random() * 2 + 1
  }));

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dots.forEach(d => {
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle = "rgba(127,0,255,0.4)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
});
