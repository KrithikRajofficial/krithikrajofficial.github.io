document.addEventListener("DOMContentLoaded", () => {

  /* TYPING */
  const roles = [
    "Robotics & Automation Engineer",
    "ROS 2 • Autonomous Systems",
    "Applied Robotics Research"
  ];
  let i=0,j=0,del=false;
  const typing=document.getElementById("typing");

  function loop(){
    typing.textContent = roles[i].slice(0,j);
    if(!del) j++; else j--;
    if(j>roles[i].length+6) del=true;
    if(j===0&&del){ del=false; i=(i+1)%roles.length; }
    setTimeout(loop, del?40:80);
  }
  loop();

  /* CURSOR GLOW */
  const glow=document.querySelector(".cursor-glow");
  document.addEventListener("mousemove",e=>{
    glow.style.left=e.clientX+"px";
    glow.style.top=e.clientY+"px";
    glow.style.opacity=1;
  });
  document.addEventListener("mouseleave",()=>glow.style.opacity=0);

  /* PARTICLES */
  const canvas=document.getElementById("particles");
  const ctx=canvas.getContext("2d");
  function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
  resize(); addEventListener("resize",resize);

  const dots=[...Array(45)].map(()=>({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*1.4+.6,
    dx:(Math.random()-.5)*.25,
    dy:(Math.random()-.5)*.25
  }));

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dots.forEach(p=>{
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<0||p.x>canvas.width) p.dx*=-1;
      if(p.y<0||p.y>canvas.height) p.dy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle="rgba(127,0,255,.35)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();

  /* THEME TOGGLE */
  const toggle=document.getElementById("themeToggle");
  toggle.onclick=()=>{
    document.body.classList.toggle("light");
    toggle.textContent=document.body.classList.contains("light")?"☀️":"🌙";
  };

});
