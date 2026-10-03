/**
 * ============================================================================
 * NoteNest - Students Notes Sharing Portal
 * explore.js - Notes Explorer & Multi-Criteria Filtering Engine
 * ============================================================================
 */

(function () {
  'use strict';

  const filters = {
    search: '',
    department: 'all',
    semester: 'all',
    subject: 'all',
    type: 'all',
    minRating: 0,
    sortBy: 'popular'
  };

  const DOM = {};

  function initExplorePage() {
    DOM.explorerNotesGrid = document.getElementById('explorerNotesGrid');
    DOM.resultsCountText = document.getElementById('resultsCountText');
    DOM.explorerEmptyState = document.getElementById('explorerEmptyState');
    DOM.activeChipsStrip = document.getElementById('activeChipsStrip');
    DOM.activeFilterBadge = document.getElementById('activeFilterBadge');
    DOM.mobileFilterToggleBtn = document.getElementById('mobileFilterToggleBtn');
    DOM.filterSidebar = document.getElementById('filterSidebar');
    DOM.closeFilterMobileBtn = document.getElementById('closeFilterMobileBtn');

    DOM.filterSearch = document.getElementById('filterSearch');
    DOM.filterDepartment = document.getElementById('filterDepartment');
    DOM.filterSemester = document.getElementById('filterSemester');
    DOM.filterType = document.getElementById('filterType');
    DOM.filterSubject = document.getElementById('filterSubject');
    DOM.sortBySelect = document.getElementById('sortBySelect');
    DOM.resetFiltersBtn = document.getElementById('resetFiltersBtn');
    DOM.emptyStateResetBtn = document.getElementById('emptyStateResetBtn');

    // Parse URL Parameters (?dept=..., ?search=..., ?sem=...)
    const params = new URLSearchParams(window.location.search);
    if (params.get('search')) {
      filters.search = params.get('search');
      if (DOM.filterSearch) DOM.filterSearch.value = filters.search;
    }
    if (params.get('dept')) {
      filters.department = params.get('dept');
      if (DOM.filterDepartment) DOM.filterDepartment.value = filters.department;
    }
    if (params.get('sem')) {
      filters.semester = params.get('sem');
      if (DOM.filterSemester) DOM.filterSemester.value = filters.semester;
    }

    populateSubjectDropdown();
    applyFiltersAndRender();
    setupFilterEvents();
  }

  function populateSubjectDropdown() {
    if (!DOM.filterSubject) return;
    const subjects = Array.from(new Set(NoteNest.notes.map(n => n.subject))).sort();
    
    let html = `<option value="all">All Subjects</option>`;
    subjects.forEach(sub => {
      html += `<option value="${sub}">${sub}</option>`;
    });
    DOM.filterSubject.innerHTML = html;
  }

  function applyFiltersAndRender() {
    if (!DOM.explorerNotesGrid) return;

    let filtered = NoteNest.notes.filter(note => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchTitle = note.title.toLowerCase().includes(q);
        const matchSubject = note.subject.toLowerCase().includes(q);
        const matchDesc = note.description.toLowerCase().includes(q);
        const matchUploader = note.uploader.toLowerCase().includes(q);
        const matchTags = note.tags && note.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchSubject && !matchDesc && !matchUploader && !matchTags) return false;
      }

      if (filters.department !== 'all' && note.department !== filters.department) return false;
      if (filters.semester !== 'all' && note.semester !== filters.semester) return false;
      if (filters.type !== 'all' && note.type !== filters.type) return false;
      if (filters.subject !== 'all' && note.subject !== filters.subject) return false;
      if (filters.minRating > 0 && note.rating < filters.minRating) return false;

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (filters.sortBy === 'popular') return b.downloads - a.downloads;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return b.id - a.id;
      if (filters.sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

    if (DOM.resultsCountText) {
      DOM.resultsCountText.innerHTML = `Showing <strong>${filtered.length}</strong> study notes`;
    }

    if (filtered.length === 0) {
      DOM.explorerNotesGrid.innerHTML = '';
      if (DOM.explorerEmptyState) DOM.explorerEmptyState.style.display = 'block';
    } else {
      if (DOM.explorerEmptyState) DOM.explorerEmptyState.style.display = 'none';
      DOM.explorerNotesGrid.innerHTML = filtered.map(window.createNoteCardHTML).join('');
    }

    renderActiveFilterChips();
    updateFilterBadgeCount();
  }

  function renderActiveFilterChips() {
    if (!DOM.activeChipsStrip) return;
    const chips = [];

    if (filters.search) chips.push({ key: 'search', label: `Search: "${filters.search}"` });
    if (filters.department !== 'all') chips.push({ key: 'department', label: filters.department });
    if (filters.semester !== 'all') chips.push({ key: 'semester', label: filters.semester });
    if (filters.type !== 'all') chips.push({ key: 'type', label: filters.type });
    if (filters.subject !== 'all') chips.push({ key: 'subject', label: filters.subject });
    if (filters.minRating > 0) chips.push({ key: 'minRating', label: `Rating: ${filters.minRating}+ ★` });

    if (chips.length === 0) {
      DOM.activeChipsStrip.innerHTML = '';
      return;
    }

    DOM.activeChipsStrip.innerHTML = chips.map(chip => `
      <span class="filter-chip">
        ${chip.label}
        <span class="chip-remove-btn" onclick="app.removeFilterChip('${chip.key}')">&times;</span>
      </span>
    `).join('');
  }

  function updateFilterBadgeCount() {
    let count = 0;
    if (filters.search) count++;
    if (filters.department !== 'all') count++;
    if (filters.semester !== 'all') count++;
    if (filters.type !== 'all') count++;
    if (filters.subject !== 'all') count++;
    if (filters.minRating > 0) count++;

    if (DOM.activeFilterBadge) {
      DOM.activeFilterBadge.textContent = count;
      DOM.activeFilterBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  function resetAllFilters() {
    filters.search = '';
    filters.department = 'all';
    filters.semester = 'all';
    filters.type = 'all';
    filters.subject = 'all';
    filters.minRating = 0;
    filters.sortBy = 'popular';

    if (DOM.filterSearch) DOM.filterSearch.value = '';
    if (DOM.filterDepartment) DOM.filterDepartment.value = 'all';
    if (DOM.filterSemester) DOM.filterSemester.value = 'all';
    if (DOM.filterType) DOM.filterType.value = 'all';
    if (DOM.filterSubject) DOM.filterSubject.value = 'all';
    if (DOM.sortBySelect) DOM.sortBySelect.value = 'popular';

    const radioAll = document.querySelector('input[name="minRating"][value="0"]');
    if (radioAll) radioAll.checked = true;

    applyFiltersAndRender();
    showToast('Filters Reset', 'All filter constraints cleared', 'info');
  }

  function setupFilterEvents() {
    if (DOM.filterSearch) {
      DOM.filterSearch.addEventListener('input', (e) => {
        filters.search = e.target.value.trim();
        applyFiltersAndRender();
      });
    }

    if (DOM.filterDepartment) {
      DOM.filterDepartment.addEventListener('change', (e) => {
        filters.department = e.target.value;
        applyFiltersAndRender();
      });
    }

    if (DOM.filterSemester) {
      DOM.filterSemester.addEventListener('change', (e) => {
        filters.semester = e.target.value;
        applyFiltersAndRender();
      });
    }

    if (DOM.filterType) {
      DOM.filterType.addEventListener('change', (e) => {
        filters.type = e.target.value;
        applyFiltersAndRender();
      });
    }

    if (DOM.filterSubject) {
      DOM.filterSubject.addEventListener('change', (e) => {
        filters.subject = e.target.value;
        applyFiltersAndRender();
      });
    }

    document.querySelectorAll('input[name="minRating"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        filters.minRating = parseFloat(e.target.value) || 0;
        applyFiltersAndRender();
      });
    });

    if (DOM.sortBySelect) {
      DOM.sortBySelect.addEventListener('change', (e) => {
        filters.sortBy = e.target.value;
        applyFiltersAndRender();
      });
    }

    if (DOM.resetFiltersBtn) DOM.resetFiltersBtn.addEventListener('click', resetAllFilters);
    if (DOM.emptyStateResetBtn) DOM.emptyStateResetBtn.addEventListener('click', resetAllFilters);

    if (DOM.mobileFilterToggleBtn && DOM.filterSidebar) {
      DOM.mobileFilterToggleBtn.addEventListener('click', () => {
        DOM.filterSidebar.classList.add('open');
      });
    }
    if (DOM.closeFilterMobileBtn && DOM.filterSidebar) {
      DOM.closeFilterMobileBtn.addEventListener('click', () => {
        DOM.filterSidebar.classList.remove('open');
      });
    }
  }

  // Bind removal of chip
  window.app.removeFilterChip = function (filterKey) {
    if (filterKey === 'search') {
      filters.search = '';
      if (DOM.filterSearch) DOM.filterSearch.value = '';
    } else if (filterKey === 'department') {
      filters.department = 'all';
      if (DOM.filterDepartment) DOM.filterDepartment.value = 'all';
    } else if (filterKey === 'semester') {
      filters.semester = 'all';
      if (DOM.filterSemester) DOM.filterSemester.value = 'all';
    } else if (filterKey === 'type') {
      filters.type = 'all';
      if (DOM.filterType) DOM.filterType.value = 'all';
    } else if (filterKey === 'subject') {
      filters.subject = 'all';
      if (DOM.filterSubject) DOM.filterSubject.value = 'all';
    } else if (filterKey === 'minRating') {
      filters.minRating = 0;
      const r = document.querySelector('input[name="minRating"][value="0"]');
      if (r) r.checked = true;
    }
    applyFiltersAndRender();
  };

  window.onBookmarksUpdate = applyFiltersAndRender;
  window.onNotesUpdate = applyFiltersAndRender;

  document.addEventListener('DOMContentLoaded', initExplorePage);
})();
