/**
 * main.js – Malini Sundar Portfolio
 * CS 463/563 Final Project – Intro to Web Development
 *
 * Features:
 *   1. Active nav link detection
 *   2. Typing animation for hero section
 *   3. Scroll-triggered fade-in animations (IntersectionObserver API)
 *   4. Back-to-top button
 *   5. Contact form validation (real-time + on submit)
 *   6. Character counter for message textarea
 *   7. Project category filtering
 *   8. GitHub API fetch (live repository cards)
 *   9. Bootstrap Toast notifications
 *  10. jQuery: smooth scroll for anchor links
 */

// Mark JS as available — scopes fade-in CSS so elements stay visible if JS fails
document.documentElement.classList.add('js');

'use strict'; // Enforce stricter parsing and error handling

/* ─────────────────────────────────────────────────────────────
   1. ACTIVE NAV LINK
   Highlight the current page's nav link based on the filename.
───────────────────────────────────────────────────────────── */
const setActiveNavLink = () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
};

/* ─────────────────────────────────────────────────────────────
   2. TYPING ANIMATION
   Cycles through titles with a typewriter effect.
───────────────────────────────────────────────────────────── */
const initTypingAnimation = () => {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'CS Educator & Instructor',
    'Ph.D. Student @ PSU',
    'AI / NLP Researcher',
    'Full-Stack Developer',
    'Curriculum Designer',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER_WORD = 1800;
  const PAUSE_BEFORE_DELETE = 400;

  const type = () => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // Typing forward
      el.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        // Finished typing – pause, then delete
        isDeleting = true;
        setTimeout(type, PAUSE_AFTER_WORD);
        return;
      }
      setTimeout(type, TYPING_SPEED);
    } else {
      // Deleting
      el.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Finished deleting – move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, PAUSE_BEFORE_DELETE);
        return;
      }
      setTimeout(type, DELETING_SPEED);
    }
  };

  type();
};

/* ─────────────────────────────────────────────────────────────
   3. INTERSECTION OBSERVER – SCROLL ANIMATIONS
   Elements with .fade-in-up / .fade-in-left / .fade-in-right
   become visible when they enter the viewport.
───────────────────────────────────────────────────────────── */
const initScrollAnimations = () => {
  const animatedEls = document.querySelectorAll(
    '.fade-in-up, .fade-in-left, .fade-in-right'
  );
  if (!animatedEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation to save resources
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animatedEls.forEach(el => observer.observe(el));
};

/* ─────────────────────────────────────────────────────────────
   4. BACK TO TOP BUTTON
   Appears after scrolling 300px; smooth scroll on click.
───────────────────────────────────────────────────────────── */
const initBackToTop = () => {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

/* ─────────────────────────────────────────────────────────────
   5. CONTACT FORM VALIDATION
   Real-time validation + full validation on submit.
   Uses the Bootstrap 5 validated form pattern.
───────────────────────────────────────────────────────────── */
const initContactForm = () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn    = document.getElementById('submitBtn');
  const submitText   = document.getElementById('submitText');
  const submitSpinner = document.getElementById('submitSpinner');
  const formSuccess  = document.getElementById('formSuccess');

  // Real-time field validation on blur
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        validateField(input);
      }
    });
  });

  // Email format check helper
  const isValidEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // Validate a single field and toggle Bootstrap classes
  const validateField = (field) => {
    let valid = true;

    if (field.type === 'checkbox') {
      valid = field.checked;
    } else if (field.type === 'email') {
      valid = field.value.trim() !== '' && isValidEmail(field.value);
    } else if (field.id === 'message') {
      valid = field.value.trim().length >= 20;
    } else {
      valid = field.value.trim() !== '';
    }

    field.classList.toggle('is-valid',   valid);
    field.classList.toggle('is-invalid', !valid);
    return valid;
  };

  // Submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let allValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) allValid = false;
    });

    if (!allValid) {
      form.classList.add('was-validated');
      form.querySelector('.is-invalid')?.focus();
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitText.classList.add('d-none');
    submitSpinner.classList.remove('d-none');

    // Simulate async submission (replace with fetch() to a real endpoint)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success
    form.classList.add('d-none');
    formSuccess.classList.remove('d-none');
    showToast('<i class="bi bi-check-circle-fill me-2 text-mint"></i>Message sent successfully!');
  });
};

/* ─────────────────────────────────────────────────────────────
   6. CHARACTER COUNTER for message textarea
───────────────────────────────────────────────────────────── */
const initCharCounter = () => {
  const textarea = document.getElementById('message');
  const counter  = document.getElementById('charCount');
  if (!textarea || !counter) return;

  textarea.addEventListener('input', () => {
    const len = textarea.value.trim().length;
    counter.textContent = len;
    counter.style.color = len >= 20
      ? 'var(--mint-dark)'
      : len > 10
        ? 'var(--text-muted)'
        : '#e07a7a';
  });
};

/* ─────────────────────────────────────────────────────────────
   7. PROJECT CATEGORY FILTERING
   Filter project cards by data-category attribute.
───────────────────────────────────────────────────────────── */
const initProjectFilters = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  const noResults = document.getElementById('noResults');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button states
      filterBtns.forEach(b => {
        b.classList.remove('active', 'btn-primary-custom');
        b.classList.add('btn-outline-custom');
      });
      btn.classList.add('active', 'btn-primary-custom');
      btn.classList.remove('btn-outline-custom');

      // Show / hide project cards
      let visibleCount = 0;
      projectItems.forEach(item => {
        const categories = item.dataset.category || '';
        const matches = filter === 'all' || categories.split(' ').includes(filter);

        item.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });

      // Show "no results" message if nothing matches
      if (noResults) {
        noResults.classList.toggle('d-none', visibleCount > 0);
      }
    });
  });
};

/* ─────────────────────────────────────────────────────────────
   8. GITHUB API FETCH
   Fetches public repos and renders cards in #githubRepos.
   TODO: Replace 'YOUR_GITHUB_USERNAME' with your actual username.
───────────────────────────────────────────────────────────── */
const fetchGithubRepos = async () => {
  const container = document.getElementById('githubRepos');
  const loading   = document.getElementById('reposLoading');
  if (!container) return;

  const GITHUB_USERNAME = 'YOUR_GITHUB_USERNAME'; // ← TODO: replace this

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    if (loading) loading.remove();

    if (!repos.length) {
      container.innerHTML = '<p class="text-muted">No public repositories found.</p>';
      return;
    }

    const repoCards = repos.map(repo => `
      <div class="col-md-6 col-lg-4">
        <div class="exp-card lavender h-100">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <i class="bi bi-folder2-open fs-4 text-lavender"></i>
            <div class="d-flex gap-2 small text-muted">
              <span><i class="bi bi-star me-1"></i>${repo.stargazers_count}</span>
              <span><i class="bi bi-diagram-2 me-1"></i>${repo.forks_count}</span>
            </div>
          </div>
          <div class="exp-title">
            <a href="${repo.html_url}" target="_blank" rel="noopener"
               style="color:inherit; text-decoration:none;">${repo.name}</a>
          </div>
          <p class="small text-muted mt-1 mb-2">
            ${repo.description || 'No description provided.'}
          </p>
          ${repo.language
            ? `<span class="badge-custom badge-mint small">${repo.language}</span>`
            : ''}
        </div>
      </div>
    `).join('');

    container.innerHTML = repoCards;

  } catch (err) {
    // Graceful fallback if API unavailable or username not set
    if (loading) loading.remove();
    container.innerHTML = `
      <div class="col-12">
        <p class="text-muted small">
          <i class="bi bi-info-circle me-1"></i>
          GitHub repos will appear here once you update <code>GITHUB_USERNAME</code> in
          <code>js/main.js</code>. &nbsp;
          <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </p>
      </div>`;
    console.warn('GitHub API fetch failed:', err.message);
  }
};

/* ─────────────────────────────────────────────────────────────
   9. BOOTSTRAP TOAST HELPER
───────────────────────────────────────────────────────────── */
const showToast = (message, delay = 4000) => {
  const toastEl  = document.getElementById('globalToast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toastEl || !toastMsg) return;

  toastMsg.innerHTML = message;
  const toast = new bootstrap.Toast(toastEl, { delay });
  toast.show();
};

/* ─────────────────────────────────────────────────────────────
   10. JQUERY – SMOOTH SCROLL for anchor links
   (Demonstrates jQuery usage as allowed by assignment)
───────────────────────────────────────────────────────────── */
const initJQueryFeatures = () => {
  if (typeof $ === 'undefined') return;

  // Smooth scroll to anchor links on the same page
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate(
        { scrollTop: target.offset().top - 80 },
        500,
        'swing'
      );
    }
  });

  // Animate stat numbers on scroll into view (jQuery-powered)
  const animateStat = ($el) => {
    const target = parseInt($el.text(), 10);
    if (isNaN(target)) return;
    $({ count: 0 }).animate({ count: target }, {
      duration: 1200,
      easing: 'swing',
      step: function () {
        $el.text(Math.floor(this.count) + '+');
      },
      complete: function () {
        $el.text($el.data('original'));
      },
    });
  };

  // Store original text and animate on first scroll into view
  $('.stat-number').each(function () {
    $(this).data('original', $(this).text());
  });
};

/* ─────────────────────────────────────────────────────────────
   INITIALISATION — runs when the DOM is ready
───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
  initTypingAnimation();
  initScrollAnimations();
  initBackToTop();
  initContactForm();
  initCharCounter();
  initProjectFilters();
  fetchGithubRepos();
  initJQueryFeatures();
});
