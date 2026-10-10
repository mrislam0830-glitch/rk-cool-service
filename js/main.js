/* ==========================================================================
   R.K. Cool Services — Main JavaScript
   Pure vanilla JS, no dependencies
   ========================================================================== */
(function () {
  'use strict';

  /* ----- Preloader ----- */
  window.addEventListener('load', function () {
    var pre = document.querySelector('.preloader');
    if (pre) {
      setTimeout(function () { pre.classList.add('hidden'); }, 300);
    }
  });

  /* ----- Navbar scroll + mobile toggle ----- */
  var navbar = document.querySelector('.navbar');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  /* Close mobile menu on link click */
  var navAnchors = document.querySelectorAll('.nav-links a');
  navAnchors.forEach(function (a) {
    a.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  });

  /* ----- Smooth scroll for in-page anchors ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = this.getAttribute('href');
      if (target === '#' || target.length < 2) return;
      var el = document.querySelector(target);
      if (el) {
        e.preventDefault();
        var offset = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ----- Animate progress bars on scroll ----- */
  var bars = document.querySelectorAll('.progress-bar');
  var barAnimated = false;

  function animateBars() {
    if (barAnimated) return;
    var aboutEl = document.getElementById('about');
    if (!aboutEl) return;
    var rect = aboutEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      barAnimated = true;
      bars.forEach(function (bar) {
        var width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width + '%';
        }
      });
    }
  }
  window.addEventListener('scroll', animateBars);
  animateBars();

  /* ----- WhatsApp function (preserved from original) ----- */
  window.whatsappcall = function () {
    var url = 'https://wa.me/919920291377';
    window.open(url, '_blank').focus();
  };

  /* ----- Form AJAX submission + local redirect ----- */
  var bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    var msgEl = document.getElementById('form-msg');
    var submitBtn = bookingForm.querySelector('.btn-submit');

    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var phoneInput = bookingForm.querySelector('input[name="Phone"]');
      if (phoneInput && phoneInput.value.length !== 10) {
        if (msgEl) {
          msgEl.className = 'form-msg error';
          msgEl.textContent = 'Please enter a valid 10-digit mobile number.';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        submitBtn.style.opacity = '0.7';
      }
      if (msgEl) {
        msgEl.className = 'form-msg success';
        msgEl.textContent = 'Submitting your request...';
      }

      var formData = new FormData(bookingForm);

      fetch(bookingForm.action, {
        method: 'POST',
        body: formData
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          window.location.href = 'thankyou.html';
        } else {
          if (msgEl) {
            msgEl.className = 'form-msg error';
            msgEl.textContent = 'Something went wrong. Please call us at 9920291377.';
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '\uD83D\uDE80 Book Now & Claim \u20B9100 OFF';
            submitBtn.style.opacity = '1';
          }
        }
      })
      .catch(function () {
        /* Fallback: redirect locally even if fetch fails (e.g. file:// CORS) */
        window.location.href = 'thankyou.html';
      });
    });
  }

})();
