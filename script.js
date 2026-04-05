/* =========================================================
   QuickLearn Driving School – Shared JavaScript
   ========================================================= */

const PHONE     = '07365530540';
const PHONE_TEL = 'tel:07365530540';
const WA_LINK   = 'https://wa.me/447365530540';
const EMAIL     = 'Quicklearn.ds@gmail.com';

/* ── Mobile Nav ─────────────────────────────────────────── */
(function () {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  // Close on link click
  document.querySelectorAll('#mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Navbar Scroll ──────────────────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
})();

/* ── FAQ Accordion ──────────────────────────────────────── */
(function () {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      // Close siblings
      document.querySelectorAll('.faq-item.open').forEach(open => {
        if (open !== item) open.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });
})();

/* ── Booking Form ────────────────────────────────────────── */
(function () {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Clear errors
    form.querySelectorAll('.field-error').forEach(el => el.remove());
    form.querySelectorAll('.error-field').forEach(el => el.classList.remove('error-field'));

    // Validate required fields
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.classList.add('error-field');
        const err = document.createElement('span');
        err.className = 'field-error';
        err.textContent = 'This field is required';
        err.style.cssText = 'color:#dc2626;font-size:.8rem;margin-top:4px;display:block;';
        field.parentNode.appendChild(err);
      }
    });

    // Phone validation
    const phoneField = form.querySelector('[name="phone"]');
    if (phoneField && phoneField.value.trim()) {
      const phoneRe = /^[\d\s\+\-\(\)]{7,15}$/;
      if (!phoneRe.test(phoneField.value.trim())) {
        valid = false;
        phoneField.classList.add('error-field');
        const err = document.createElement('span');
        err.className = 'field-error';
        err.textContent = 'Please enter a valid phone number';
        err.style.cssText = 'color:#dc2626;font-size:.8rem;margin-top:4px;display:block;';
        phoneField.parentNode.appendChild(err);
      }
    }

    if (!valid) return;

    // Show success
    const btn = form.querySelector('[type="submit"]');
    const origText = btn.innerHTML;
    btn.innerHTML = '✓ Enquiry Sent!';
    btn.style.background = '#22c55e';
    btn.disabled = true;

    // Show message
    let msg = document.getElementById('form-success');
    if (!msg) {
      msg = document.createElement('div');
      msg.id = 'form-success';
      msg.style.cssText = 'background:#f0fdf4;border:1.5px solid #86efac;border-radius:12px;padding:20px 24px;margin-top:20px;color:#15803d;font-weight:600;text-align:center;';
      msg.innerHTML = '🎉 Thank you! We\'ll contact you within 24 hours to confirm your booking. Call <a href="' + PHONE_TEL + '" style="color:#15803d;">' + PHONE + '</a> if urgent.';
      form.appendChild(msg);
    }

    // Reset after 5s
    setTimeout(() => {
      btn.innerHTML = origText;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
      msg.remove();
    }, 6000);
  });

  // Style error fields
  const style = document.createElement('style');
  style.textContent = '.error-field{border-color:#dc2626!important;box-shadow:0 0 0 3px rgba(220,38,38,.12)!important;}';
  document.head.appendChild(style);
})();

/* ── WhatsApp + Phone Links ──────────────────────────────── */
(function () {
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.href = WA_LINK;
  });
  document.querySelectorAll('[data-call]').forEach(el => {
    el.href = PHONE_TEL;
    if (!el.textContent.includes(PHONE)) {
      // Don't override if it has icon text
    }
  });
})();

/* ── Scroll Reveal ───────────────────────────────────────── */
(function () {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .testimonial-card, .pricing-card, .step, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    obs.observe(el);
  });
})();

/* ── Active Nav Link ─────────────────────────────────────── */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();
