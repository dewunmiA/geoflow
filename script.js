/* Geoflow Resources - Site Interactivity
   Nav scroll, mobile menu, smooth anchor scroll */

(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  var links = nav.querySelector('.nav__links');
  var actions = nav.querySelector('.nav__actions');

  /* --- Nav background on scroll --- */
  var scrollThreshold = 12;

  function checkScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('nav--solid');
    } else {
      nav.classList.remove('nav--solid');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  /* --- Mobile menu toggle --- */
  function closeMenu() {
    nav.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    nav.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');

    // Measure links height so actions position correctly
    requestAnimationFrame(function () {
      var h = links.offsetHeight;
      nav.style.setProperty('--menu-links-h', h + 'px');
    });
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a nav link is clicked
  var navLinks = links.querySelectorAll('.nav__link');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', closeMenu);
  }

  // Close menu on resize past breakpoint
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  /* --- Smooth scroll for anchor links --- */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var j = 0; j < anchorLinks.length; j++) {
    anchorLinks[j].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = nav.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }
})();
