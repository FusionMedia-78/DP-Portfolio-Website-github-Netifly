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

  // ---- Project Page Image Lightbox ----
  if (document.querySelector('.case-study-hero')) {
    const plb = document.createElement('div');
    plb.className = 'lightbox';
    plb.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="" style="max-width:90vw;max-height:90vh;object-fit:contain;">';
    document.body.appendChild(plb);
    const plbImg = plb.querySelector('img');

    function openProjectLightbox(src, alt) {
      plbImg.src = src;
      plbImg.alt = alt;
      plb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeProjectLightbox() {
      plb.classList.remove('open');
      document.body.style.overflow = '';
    }

    plb.addEventListener('click', closeProjectLightbox);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProjectLightbox(); });

    document.querySelectorAll('.case-study-image-full img, .case-study-grid img').forEach(img => {
      img.addEventListener('click', () => openProjectLightbox(img.src, img.alt));
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

  // ---- Share Modal ----
  const shareModal = document.createElement('div');
  shareModal.id = 'share-modal';
  shareModal.innerHTML = `
    <div class="share-modal-backdrop"></div>
    <div class="share-modal-box">
      <button class="share-modal-close" aria-label="Close">&times;</button>
      <p class="section-label" style="color:var(--accent);margin-bottom:0.5rem;">Share this page</p>
      <h3 style="margin-bottom:var(--space-md);">Share my portfolio</h3>
      <div class="share-modal-options">
        <a class="share-option" id="share-linkedin" href="#" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
        <a class="share-option" id="share-twitter" href="#" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.25 2.25h6.908l4.304 5.686 5.782-5.686Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          X / Twitter
        </a>
        <a class="share-option" id="share-facebook" href="#" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Facebook
        </a>
        <a class="share-option" id="share-email" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          Email
        </a>
        <button class="share-option" id="share-copy">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy Link
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(shareModal);

  function openShareModal() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    shareModal.querySelector('#share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    shareModal.querySelector('#share-twitter').href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    shareModal.querySelector('#share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    shareModal.querySelector('#share-email').href = `mailto:?subject=${title}&body=Check out this page: ${url}`;
    shareModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeShareModal() {
    shareModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  shareModal.querySelector('.share-modal-backdrop').addEventListener('click', closeShareModal);
  shareModal.querySelector('.share-modal-close').addEventListener('click', closeShareModal);

  shareModal.querySelector('#share-copy').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = shareModal.querySelector('#share-copy');
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Link`; }, 2000);
    });
  });

  document.querySelectorAll('.nav-icon[aria-label="Share"]').forEach(el => {
    el.removeAttribute('onclick');
    el.addEventListener('click', (e) => { e.preventDefault(); openShareModal(); });
  });

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
