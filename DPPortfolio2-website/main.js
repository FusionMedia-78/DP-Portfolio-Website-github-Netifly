/* ============================================
   DAVID PAULL — PORTFOLIO
   Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Mobile Nav Toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // ---- Scroll Animations ----
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  // ---- Lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // ---- Gallery Filters ----
  const filters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filters.length && galleryItems.length) {
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        galleryItems.forEach(item => {
          if (cat === 'all' || item.dataset.category === cat) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Contact Form (simple validation UI) ----
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'MESSAGE SENT ✓';
      btn.style.background = 'var(--accent)';
      btn.style.color = 'var(--bg-primary)';
      btn.style.borderColor = 'var(--accent)';
      setTimeout(() => {
        btn.textContent = 'SEND MESSAGE';
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
        form.reset();
      }, 3000);
    });
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
