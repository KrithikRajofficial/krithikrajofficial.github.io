document.addEventListener('DOMContentLoaded', function() {
  // Dark mode toggle
  const toggleSwitch = document.getElementById('theme-toggle');
  toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  });

  // Scroll to top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  });
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
