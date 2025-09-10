// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(27, 41, 81, 0.98)';
    } else {
      navbar.style.background = 'rgba(27, 41, 81, 0.95)';
    }
  });

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.car-card, .part-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Lazy loading for images
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  // Add loading animation to WhatsApp buttons
  document.querySelectorAll('.whatsapp-btn, .whatsapp-main-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const originalText = this.innerHTML;
      this.innerHTML = '<span class="whatsapp-icon">📱</span> Opening WhatsApp...';
      this.style.opacity = '0.7';
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.opacity = '1';
      }, 2000);
    });
  });

  // Add hover effect to car cards
  document.querySelectorAll('.car-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add parallax effect to hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--royal-gold)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          heroTitle.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }

  // Add counter animation to stats
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
      }
    }, 20);
  };

  // Observe stats for counter animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('h3');
        if (statNumber && !statNumber.classList.contains('animated')) {
          statNumber.classList.add('animated');
          const text = statNumber.textContent;
          const number = parseInt(text.replace(/\D/g, ''));
          statNumber.textContent = '0' + text.replace(/\d/g, '');
          animateCounter(statNumber, number);
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
  });
});

// Add custom cursor effect for premium feel
document.addEventListener('mousemove', function(e) {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    const newCursor = document.createElement('div');
    newCursor.className = 'custom-cursor';
    newCursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: var(--royal-gold);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.7;
      transition: transform 0.1s ease;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(newCursor);
  }
  
  const customCursor = document.querySelector('.custom-cursor');
  if (customCursor) {
    customCursor.style.left = e.clientX - 10 + 'px';
    customCursor.style.top = e.clientY - 10 + 'px';
  }
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
  const interactiveElements = document.querySelectorAll('button, a, .car-card, .part-card');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'var(--deep-red)';
      }
    });
    
    element.addEventListener('mouseleave', function() {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'var(--royal-gold)';
      }
    });
  });
});


