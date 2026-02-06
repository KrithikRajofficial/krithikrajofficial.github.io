document.addEventListener("DOMContentLoaded", () => {
  
  // ===== TYPING EFFECT =====
  const roles = [
    "Robotics & Automation Engineer",
    "ROS • Computer Vision • Autonomous Systems",
    "Building Intelligent Machines",
    "SLAM • Python • Embedded Systems"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typing");
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseTime = 2000;
  
  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let timeout = isDeleting ? deletingSpeed : typingSpeed;
    
    if (!isDeleting && charIndex === currentRole.length) {
      timeout = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    
    setTimeout(typeEffect, timeout);
  }
  
  typeEffect();
  
  
  // ===== CURSOR GLOW =====
  const cursorGlow = document.querySelector(".cursor-glow");
  
  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
    cursorGlow.style.opacity = "1";
  });
  
  document.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });
  
  
  // ===== PARTICLES BACKGROUND =====
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  
  const particlesArray = [];
  const numberOfParticles = 60;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 1.5 + 0.5;
      this.dx = (Math.random() - 0.5) * 0.3;
      this.dy = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(127, 0, 255, ${this.opacity})`;
      ctx.fill();
    }
    
    update() {
      this.x += this.dx;
      this.y += this.dy;
      
      if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
      
      this.draw();
    }
  }
  
  function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(particle => {
      particle.update();
    });
    
    connectParticles();
    requestAnimationFrame(animateParticles);
  }
  
  function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i + 1; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(127, 0, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  initParticles();
  animateParticles();
  
  
  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    themeToggle.textContent = "☀️";
  }
  
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    const isLight = body.classList.contains("light");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
  
  
  // ===== SMOOTH SCROLL WITH OFFSET =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
  
  
  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.background = "rgba(10, 10, 20, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.background = "rgba(10, 10, 20, 0.75)";
      navbar.style.boxShadow = "none";
    }
    
    lastScroll = currentScroll;
  });
  
  
  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);
  
  // Observe sections for fade-in animation
  document.querySelectorAll(".section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
  
  
  // ===== PROJECT CARDS ENHANCED HOVER =====
  const projectCards = document.querySelectorAll(".project-card");
  
  projectCards.forEach(card => {
    card.addEventListener("mouseenter", function() {
      this.style.zIndex = "10";
    });
    
    card.addEventListener("mouseleave", function() {
      this.style.zIndex = "1";
    });
  });
  
  
  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        company: document.getElementById("company").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
      };
      
      // Display success message
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;
      
      // Simulate form submission (replace with actual backend call)
      setTimeout(() => {
        submitButton.textContent = "Message Sent! ✓";
        submitButton.style.background = "linear-gradient(135deg, #3cff8f, #00c6ff)";
        
        setTimeout(() => {
          contactForm.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          submitButton.style.background = "";
        }, 3000);
        
        console.log("Form data:", formData);
        // Here you would normally send the data to your backend
        // For example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
        
      }, 1500);
    });
  }
  
  
  // ===== SKILL CARDS RANDOM ANIMATION DELAY =====
  const skillCards = document.querySelectorAll(".skill-card");
  
  skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
  });
  
  
  // ===== STATS COUNTER ANIMATION =====
  const statCards = document.querySelectorAll(".stat-card h3");
  
  const countUp = (element) => {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 50;
    const suffix = element.textContent.includes('+') ? '+' : '';
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.ceil(current) + suffix;
      }
    }, 30);
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        countUp(entry.target);
        entry.target.classList.add("counted");
      }
    });
  }, { threshold: 0.5 });
  
  statCards.forEach(stat => statsObserver.observe(stat));
  
  
  // ===== DYNAMIC YEAR IN FOOTER =====
  const currentYear = new Date().getFullYear();
  const footerCopyright = document.querySelector(".footer-copyright");
  if (footerCopyright) {
    footerCopyright.textContent = `© ${currentYear} Krithik Raj. All Rights Reserved.`;
  }
  
  
  // ===== LOADING ANIMATION =====
  window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "1";
    }, 100);
  });
  
  
  // ===== PARALLAX EFFECT FOR HERO =====
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });
  
  
  // ===== MOBILE MENU (BASIC) =====
  // You can expand this if you want a hamburger menu for mobile
  const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
      // Add mobile menu logic here if needed
      console.log("Mobile view detected");
    }
  };
  
  window.addEventListener("resize", createMobileMenu);
  createMobileMenu();
  
  
  // ===== EASTER EGG: KONAMI CODE =====
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;
  
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  function activateEasterEgg() {
    // Fun animation when Konami code is entered
    document.body.style.animation = "rainbow 2s linear infinite";
    
    setTimeout(() => {
      document.body.style.animation = "";
    }, 5000);
    
    console.log("🎮 Konami Code Activated! You found the easter egg!");
  }
  
  
  // ===== CONSOLE MESSAGE =====
  console.log(
    "%c👋 Hello, Developer!",
    "color: #b983ff; font-size: 24px; font-weight: bold;"
  );
  console.log(
    "%cLooking for opportunities in Robotics & Automation?",
    "color: #00c6ff; font-size: 16px;"
  );
  console.log(
    "%cLet's connect: krithikraj@email.com",
    "color: #3cff8f; font-size: 14px;"
  );
  
});


// ===== RAINBOW ANIMATION FOR EASTER EGG =====
const style = document.createElement("style");
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);
