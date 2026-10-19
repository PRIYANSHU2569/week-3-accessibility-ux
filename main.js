/*
 * The Field Notes Journal: progressive enhancement script.
 * The page works without JavaScript for reading and navigation.
 * This script adds: a disclosure-style mobile menu, topic filters,
 * search, and form validation with accessible error messages.
 */
(function () {
  'use strict';

  var desktopQuery = window.matchMedia('(min-width: 48em)');

  /* ---------- Mobile navigation (disclosure pattern) ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');

  function setNavOpen(isOpen) {
    navToggle.setAttribute('aria-expanded', String(isOpen));
    siteNav.classList.toggle('is-open', isOpen);
  }

  navToggle.addEventListener('click', function () {
    setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  // Escape closes the menu and returns focus to the button that opened it (2.1.2, 2.4.3)
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  // Close the mobile menu after choosing an in-page link
  siteNav.addEventListener('click', function (event) {
    if (event.target.tagName === 'A' && !desktopQuery.matches) {
      setNavOpen(false);
    }
  });

  // Reset state when the window grows to desktop size
  desktopQuery.addEventListener('change', function (event) {
    if (event.matches) {
      setNavOpen(false);
    }
  });

  /* ---------- Article filtering and search ---------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var articleItems = document.querySelectorAll('#article-list > li');
  var resultsStatus = document.getElementById('results-status');
  var searchForm = document.getElementById('search-form');
  var searchInput = document.getElementById('search-input');
  var activeTopic = 'all';

  function applyFilters() {
    var query = searchInput.value.trim().toLowerCase();
    var shownCount = 0;

    articleItems.forEach(function (item) {
      var topicMatches = activeTopic === 'all' || item.dataset.topic === activeTopic;
      var textMatches = query === '' || item.textContent.toLowerCase().indexOf(query) !== -1;
      var isVisible = topicMatches && textMatches;

      item.hidden = !isVisible;
      if (isVisible) {
        shownCount += 1;
      }
    });

    // Announced politely by the live region (4.1.3)
    var total = articleItems.length;
    if (shownCount === 0) {
      resultsStatus.textContent = 'No articles match your search or topic. Try a different word or topic.';
    } else if (shownCount === total) {
      resultsStatus.textContent = 'Showing all ' + total + ' articles.';
    } else {
      resultsStatus.textContent = 'Showing ' + shownCount + ' of ' + total + ' articles.';
    }
  }

  // Toggle buttons: state is conveyed with aria-pressed (4.1.2)
  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activeTopic = button.dataset.filter;
      filterButtons.forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === button));
      });
      applyFilters();
    });
  });

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    applyFilters();
  });

  searchInput.addEventListener('input', applyFilters);

  /* ---------- Newsletter form validation ---------- */
  var newsletterForm = document.getElementById('newsletter-form');
  var emailInput = document.getElementById('email');
  var emailError = document.getElementById('email-error');
  var subscribeStatus = document.getElementById('subscribe-status');

  newsletterForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = emailInput.value.trim();
    var message = '';

    if (value === '') {
      message = 'Enter your email address to subscribe.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Enter an email address in the format name@example.com.';
    }

    if (message) {
      // Identify the error in text (3.3.1), suggest a fix (3.3.3), and move focus to the field
      emailError.textContent = message;
      emailInput.setAttribute('aria-invalid', 'true');
      subscribeStatus.textContent = '';
      emailInput.focus();
      return;
    }

    emailInput.removeAttribute('aria-invalid');
    emailError.textContent = '';
    newsletterForm.reset();
    subscribeStatus.textContent = 'Thank you. You are now subscribed.';
  });
})();
