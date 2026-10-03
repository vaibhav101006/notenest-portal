/**
 * ============================================================================
 * NoteNest - Students Notes Sharing Portal
 * home.js - Landing / Home Page Logic
 * ============================================================================
 */

(function () {
  'use strict';

  function initHomePage() {
    renderCategories();
    renderTrendingNotes();
  }

  function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = NoteNest.categories.map(cat => `
      <a href="explore.html?dept=${encodeURIComponent(cat.dept)}" class="category-card">
        <div class="category-icon-box">${cat.icon}</div>
        <h3 class="category-title">${cat.name}</h3>
        <span class="category-count">${cat.count}+ Verified Notes</span>
      </a>
    `).join('');
  }

  function renderTrendingNotes() {
    const grid = document.getElementById('homeFeaturedNotesGrid');
    if (!grid) return;

    const sorted = [...NoteNest.notes].sort((a, b) => b.downloads - a.downloads).slice(0, 3);
    grid.innerHTML = sorted.map(window.createNoteCardHTML).join('');
  }

  window.onBookmarksUpdate = renderTrendingNotes;
  window.onNotesUpdate = renderTrendingNotes;

  document.addEventListener('DOMContentLoaded', initHomePage);
})();
