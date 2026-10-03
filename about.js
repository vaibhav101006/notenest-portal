/**
 * ============================================================================
 * NoteNest - Students Notes Sharing Portal
 * about.js - About Page FAQ Accordion Interaction
 * ============================================================================
 */

(function () {
  'use strict';

  function initAboutPage() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        item.classList.toggle('open');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initAboutPage);
})();
