/**
 * ============================================================================
 * NoteNest - Students Notes Sharing Portal
 * dashboard.js - Student Dashboard, Metrics, Uploads & Saved Management
 * ============================================================================
 */

(function () {
  'use strict';

  function initDashboardPage() {
    updateGreeting();
    renderMetrics();
    renderTabs();
    setupTabSwitching();
  }

  function updateGreeting() {
    const hour = new Date().getHours();
    let timeGreeting = "Good Morning 👋";
    if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon ☀️";
    else if (hour >= 17) timeGreeting = "Good Evening 🌙";

    const greetingTimeEl = document.getElementById('dashboardGreetingTime');
    const studentNameEl = document.getElementById('dashboardStudentName');
    const studentSubEl = document.getElementById('dashboardStudentSub');

    if (greetingTimeEl) greetingTimeEl.textContent = timeGreeting;
    if (studentNameEl) studentNameEl.textContent = NoteNest.user.name || "Student";
    if (studentSubEl) {
      studentSubEl.textContent = `Welcome back to your NoteNest workstation (${NoteNest.user.department} • ${NoteNest.user.semester}). Track your activity, bookmarked guides, and uploaded notes.`;
    }
  }

  function renderMetrics() {
    const myUploads = NoteNest.notes.filter(n => 
      n.uploader.toLowerCase() === NoteNest.user.name.toLowerCase() ||
      (n.uploaderEmail && n.uploaderEmail.toLowerCase() === NoteNest.user.email.toLowerCase())
    );

    const savedNotes = NoteNest.notes.filter(n => NoteNest.bookmarks.includes(n.id));

    const dashMetricUploaded = document.getElementById('dashMetricUploaded');
    const dashMetricDownloaded = document.getElementById('dashMetricDownloaded');
    const dashMetricBookmarks = document.getElementById('dashMetricBookmarks');
    const dashMetricViews = document.getElementById('dashMetricViews');

    if (dashMetricUploaded) dashMetricUploaded.textContent = myUploads.length;
    if (dashMetricDownloaded) dashMetricDownloaded.textContent = 14 + (myUploads.reduce((acc, curr) => acc + (curr.downloads || 0), 0));
    if (dashMetricBookmarks) dashMetricBookmarks.textContent = savedNotes.length;
    if (dashMetricViews) dashMetricViews.textContent = NoteNest.user.profileViews || 128;

    const dashUploadsTabCount = document.getElementById('dashUploadsTabCount');
    const dashSavedTabCount = document.getElementById('dashSavedTabCount');
    const dashRecentTabCount = document.getElementById('dashRecentTabCount');

    const recentNotes = NoteNest.Storage.getRecentViews()
      .map(id => NoteNest.notes.find(n => n.id === id))
      .filter(Boolean);

    if (dashUploadsTabCount) dashUploadsTabCount.textContent = myUploads.length;
    if (dashSavedTabCount) dashSavedTabCount.textContent = savedNotes.length;
    if (dashRecentTabCount) dashRecentTabCount.textContent = recentNotes.length;
  }

  function renderTabs() {
    const myUploads = NoteNest.notes.filter(n => 
      n.uploader.toLowerCase() === NoteNest.user.name.toLowerCase() ||
      (n.uploaderEmail && n.uploaderEmail.toLowerCase() === NoteNest.user.email.toLowerCase())
    );
    const savedNotes = NoteNest.notes.filter(n => NoteNest.bookmarks.includes(n.id));
    const recentNotes = NoteNest.Storage.getRecentViews()
      .map(id => NoteNest.notes.find(n => n.id === id))
      .filter(Boolean);

    // Tab 1: Uploads Table
    const tableBody = document.getElementById('myUploadsTableBody');
    const emptyUploads = document.getElementById('myUploadsEmpty');
    const table = document.getElementById('myUploadsTable');

    if (tableBody) {
      if (myUploads.length === 0) {
        if (table) table.style.display = 'none';
        if (emptyUploads) emptyUploads.style.display = 'block';
      } else {
        if (table) table.style.display = 'table';
        if (emptyUploads) emptyUploads.style.display = 'none';
        tableBody.innerHTML = myUploads.map(note => `
          <tr>
            <td>
              <div style="font-weight: 700; color: var(--text-primary);">${note.title}</div>
              <small style="color: var(--text-muted);">${note.type}</small>
            </td>
            <td>
              <div>${note.subject}</div>
              <small style="color: var(--primary);">${note.semester}</small>
            </td>
            <td>${note.date || 'Jan 2026'}</td>
            <td><strong>${note.downloads}</strong></td>
            <td><span class="status-badge verified">● Active / Verified</span></td>
            <td>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-sm btn-secondary" onclick="app.openNoteModal(${note.id})">Preview</button>
                <button class="btn btn-sm btn-outline-danger" onclick="app.deleteMyNote(${note.id})" title="Delete Note">Delete</button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    // Tab 2: Saved
    const savedGrid = document.getElementById('savedNotesGrid');
    const savedEmpty = document.getElementById('savedNotesEmpty');
    if (savedGrid) {
      if (savedNotes.length === 0) {
        savedGrid.innerHTML = '';
        if (savedEmpty) savedEmpty.style.display = 'block';
      } else {
        if (savedEmpty) savedEmpty.style.display = 'none';
        savedGrid.innerHTML = savedNotes.map(window.createNoteCardHTML).join('');
      }
    }

    // Tab 3: Recent
    const recentGrid = document.getElementById('recentNotesGrid');
    const recentEmpty = document.getElementById('recentNotesEmpty');
    if (recentGrid) {
      if (recentNotes.length === 0) {
        recentGrid.innerHTML = '';
        if (recentEmpty) recentEmpty.style.display = 'block';
      } else {
        if (recentEmpty) recentEmpty.style.display = 'none';
        recentGrid.innerHTML = recentNotes.map(window.createNoteCardHTML).join('');
      }
    }
  }

  function setupTabSwitching() {
    document.querySelectorAll('.dash-tab-btn').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        const targetPaneId = tabBtn.getAttribute('data-dash-tab');
        document.querySelectorAll('.dash-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.dash-tab-pane').forEach(p => p.classList.remove('active'));

        tabBtn.classList.add('active');
        const pane = document.getElementById(`pane-${targetPaneId}`);
        if (pane) pane.classList.add('active');
      });
    });
  }

  window.app.deleteMyNote = function (noteId) {
    if (confirm('Are you sure you want to remove this uploaded note?')) {
      NoteNest.notes = NoteNest.notes.filter(n => n.id !== noteId);
      NoteNest.Storage.saveNotes(NoteNest.notes);
      renderMetrics();
      renderTabs();
      window.showToast('Note Deleted', 'The note has been removed', 'info');
    }
  };

  window.onBookmarksUpdate = function () {
    renderMetrics();
    renderTabs();
  };

  window.onNotesUpdate = function () {
    renderMetrics();
    renderTabs();
  };

  window.onUserUpdate = function () {
    updateGreeting();
    renderMetrics();
    renderTabs();
  };

  document.addEventListener('DOMContentLoaded', initDashboardPage);
})();
