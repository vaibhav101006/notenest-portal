/**
 * ============================================================================
 * NoteNest - Students Notes Sharing Portal
 * profile.js - Student Profile Information & Edit Form Logic
 * ============================================================================
 */

(function () {
  'use strict';

  function initProfilePage() {
    renderProfileDetails();
    setupProfileEditor();
  }

  function renderProfileDetails() {
    const user = NoteNest.user;

    const profileAvatarDisplay = document.getElementById('profileAvatarDisplay');
    const profileNameDisplay = document.getElementById('profileNameDisplay');
    const profileHeadlineDisplay = document.getElementById('profileHeadlineDisplay');
    const profileBioDisplay = document.getElementById('profileBioDisplay');
    const profileCollegeDisplay = document.getElementById('profileCollegeDisplay');
    const profileEmailDisplay = document.getElementById('profileEmailDisplay');
    const profileDeptDisplay = document.getElementById('profileDeptDisplay');
    const profileSemDisplay = document.getElementById('profileSemDisplay');

    if (profileAvatarDisplay) profileAvatarDisplay.textContent = user.avatar || 'SS';
    if (profileNameDisplay) profileNameDisplay.textContent = user.name;
    if (profileHeadlineDisplay) profileHeadlineDisplay.textContent = `${user.department} • ${user.semester}`;
    if (profileBioDisplay) profileBioDisplay.textContent = user.bio || "Student at NoteNest.";
    if (profileCollegeDisplay) profileCollegeDisplay.textContent = user.college || "National Institute of Engineering";
    if (profileEmailDisplay) profileEmailDisplay.textContent = user.email;
    if (profileDeptDisplay) profileDeptDisplay.textContent = user.department;
    if (profileSemDisplay) profileSemDisplay.textContent = user.semester;

    const myUploads = NoteNest.notes.filter(n => 
      n.uploader.toLowerCase() === user.name.toLowerCase() ||
      (n.uploaderEmail && n.uploaderEmail.toLowerCase() === user.email.toLowerCase())
    );

    const profileStatsUploads = document.getElementById('profileStatsUploads');
    const profileStatsDownloads = document.getElementById('profileStatsDownloads');
    const profileStatsSaved = document.getElementById('profileStatsSaved');

    if (profileStatsUploads) profileStatsUploads.textContent = myUploads.length;
    if (profileStatsDownloads) profileStatsDownloads.textContent = 14 + (myUploads.reduce((acc, curr) => acc + (curr.downloads || 0), 0));
    if (profileStatsSaved) profileStatsSaved.textContent = NoteNest.bookmarks.length;
  }

  function setupProfileEditor() {
    const editModal = document.getElementById('editProfileModal');
    const openBtn = document.getElementById('editProfileOpenBtn');
    const closeBtn = document.getElementById('closeEditProfileBtn');
    const cancelBtn = document.getElementById('cancelEditProfileBtn');
    const form = document.getElementById('editProfileForm');
    const resetDataBtn = document.getElementById('resetLocalDataBtn');

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        document.getElementById('editProfileName').value = NoteNest.user.name;
        document.getElementById('editProfileEmail').value = NoteNest.user.email;
        document.getElementById('editProfileDept').value = NoteNest.user.department;
        document.getElementById('editProfileSem').value = NoteNest.user.semester;
        document.getElementById('editProfileCollege').value = NoteNest.user.college;
        document.getElementById('editProfileBio').value = NoteNest.user.bio;
        window.openModal(editModal);
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', () => window.closeModal(editModal));
    if (cancelBtn) cancelBtn.addEventListener('click', () => window.closeModal(editModal));

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('editProfileName').value.trim();
        const email = document.getElementById('editProfileEmail').value.trim();
        const dept = document.getElementById('editProfileDept').value;
        const sem = document.getElementById('editProfileSem').value;
        const college = document.getElementById('editProfileCollege').value.trim();
        const bio = document.getElementById('editProfileBio').value.trim();

        NoteNest.user.name = name;
        NoteNest.user.email = email;
        NoteNest.user.department = dept;
        NoteNest.user.semester = sem;
        NoteNest.user.college = college;
        NoteNest.user.bio = bio;
        NoteNest.user.avatar = name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();

        NoteNest.Storage.saveUser(NoteNest.user);
        window.closeModal(editModal);
        renderProfileDetails();
        window.showToast('Profile Updated! ✅', 'Your student details have been saved.', 'success');
      });
    }

    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', () => {
        if (confirm('Reset demo data back to default notes and profile?')) {
          localStorage.clear();
          location.reload();
        }
      });
    }
  }

  window.onUserUpdate = renderProfileDetails;

  document.addEventListener('DOMContentLoaded', initProfilePage);
})();
