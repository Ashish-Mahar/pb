// ============ LOAD REELS FROM JSON ============
async function loadReels() {
    const grid = document.getElementById('reels-grid');
    if (!grid) return;
  
    try {
      const res = await fetch('data/videos.json');
      const data = await res.json();
  
      grid.innerHTML = ''; // Clear loading text
  
      if (!data.reels || data.reels.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:#888;">Reels coming soon...</p>';
        return;
      }
  
      data.reels.forEach(reel => {
        const card = document.createElement('a');
        card.href = reel.url;
        card.target = '_blank';
        card.rel = 'noopener';
        card.className = 'reel-card';
        card.innerHTML = `
          <img src="${reel.thumbnail}" alt="${reel.title}" loading="lazy" />
          <div class="reel-info">
            <div class="reel-title">${reel.title}</div>
          </div>
        `;
        grid.appendChild(card);
      });
    } catch (err) {
      console.error('Could not load reels:', err);
      grid.innerHTML = '<p style="text-align:center;color:#888;">Reels coming soon...</p>';
    }
  }
  
  // ============ CONTACT FORM (Formspree) ============
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
  
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      status.textContent = '';
      status.className = 'form-status';
  
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
  
        if (response.ok) {
          status.textContent = '✅ Thank you! Your message has been sent.';
          status.classList.add('success');
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        status.textContent = '❌ Something went wrong. Please try WhatsApp instead.';
        status.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
  
  // ============ MOBILE MENU TOGGLE ============
  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (!toggle || !navLinks) return;
  
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
  
  // ============ FOOTER YEAR ============
  function setFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
  
  // ============ INIT ============
  document.addEventListener('DOMContentLoaded', () => {
    loadReels();
    initContactForm();
    initMobileMenu();
    setFooterYear();
  });