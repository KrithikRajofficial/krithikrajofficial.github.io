/* Particle background + mouse glow + theme toggle + small parallax effects */
/* Adjust number of particles according to device width */
(() => {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;

  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.scale(devicePixelRatio, devicePixelRatio);

  let mouse = { x: w/2, y: h/2 };

  // particles
  const particles = [];
  const count = Math.round(Math.max(40, innerWidth / 20));

  function rand(min, max){ return Math.random()*(max-min)+min; }

  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*innerWidth,
      y: Math.random()*innerHeight,
      r: rand(0.6,2.6),
      vx: rand(-0.2,0.2),
      vy: rand(-0.1,0.1),
      hue: rand(200,210),
      alpha: rand(0.08,0.28)
    });
  }

  function resize(){
    const wpx = innerWidth;
    const hpx = innerHeight;
    canvas.width = wpx * devicePixelRatio;
    canvas.height = hpx * devicePixelRatio;
    canvas.style.width = wpx + 'px';
    canvas.style.height = hpx + 'px';
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  window.addEventListener('resize', resize);

  function update(){
    ctx.clearRect(0,0,innerWidth,innerHeight);

    // soft gradient overlay
    const grad = ctx.createLinearGradient(0,0,innerWidth,innerHeight);
    grad.addColorStop(0,'rgba(5,12,20,0.15)');
    grad.addColorStop(1,'rgba(6,12,24,0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,innerWidth,innerHeight);

    // draw particles
    for(let p of particles){
      p.x += p.vx + (mouse.x - innerWidth/2)*0.00006;
      p.y += p.vy + (mouse.y - innerHeight/2)*0.00004;

      // wrap
      if(p.x < -10) p.x = innerWidth + 10;
      if(p.x > innerWidth + 10) p.x = -10;
      if(p.y < -10) p.y = innerHeight + 10;
      if(p.y > innerHeight + 10) p.y = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${Math.round(90)},${Math.round(160)},${255},${p.alpha})`;
      ctx.arc(p.x, p.y, p.r * (1 + Math.sin(Date.now()/1000 + p.r)*0.2), 0, Math.PI*2);
      ctx.fill();
    }

    // occasional larger subtle nebula blobs
    if(Math.random() > 0.995){
      ctx.beginPath();
      const gx = Math.random() * innerWidth;
      const gy = Math.random() * innerHeight;
      const rg = ctx.createRadialGradient(gx, gy, 10, gx, gy, 300);
      rg.addColorStop(0, 'rgba(94,200,255,0.04)');
      rg.addColorStop(1, 'rgba(58,167,255,0.0)');
      ctx.fillStyle = rg;
      ctx.fillRect(gx-300, gy-300, 600, 600);
    }

    requestAnimationFrame(update);
  }
  update();

  // mouse tracking for glow
  const mg = document.getElementById('mouse-glow');
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mg.style.left = e.clientX + 'px';
    mg.style.top = e.clientY + 'px';
    mg.style.opacity = 1;
  });
  window.addEventListener('mouseleave', ()=> mg.style.opacity = 0 );

  // small parallax for hero elements based on mouse
  const heroLeft = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  document.addEventListener('mousemove', (ev)=>{
    const cx = innerWidth/2;
    const cy = innerHeight/2;
    const dx = (ev.clientX - cx) / cx;
    const dy = (ev.clientY - cy) / cy;

    if(heroLeft) heroLeft.style.transform = `translate3d(${dx*8}px, ${dy*6}px, 0)`;
    if(heroRight) heroRight.style.transform = `translate3d(${dx*-12}px, ${dy*-8}px, 0)`;
  });

  /* Theme toggle */
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const body = document.body;

  // init theme from localStorage
  const saved = localStorage.getItem('site-theme') || 'dark';
  if(saved === 'light'){ body.classList.add('light'); }

  themeToggle.addEventListener('click', ()=>{
    const isLight = body.classList.toggle('light');
    localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
  });

  /* Simple smooth scrolling for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // small performance friendly start: reduce particles on small screens
  window.addEventListener('load', ()=>{
    // nothing else for now
  });

})();
