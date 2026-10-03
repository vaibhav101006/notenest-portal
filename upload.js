/**
 * ============================================================================
 * NoteNest - Students Notes Sharing Portal
 * upload.js - Upload Form Handling, File Dropzone & Validation
 * ============================================================================
 */

(function () {
  'use strict';

  let attachedFile = null;

  function initUploadPage() {
    const form = document.getElementById('uploadNoteForm');
    const dropzone = document.getElementById('fileDropzone');
    const fileInput = document.getElementById('uploadFileInput');
    const dropzoneContent = document.getElementById('dropzoneContent');
    const selectedFilePreview = document.getElementById('selectedFilePreview');
    const removeFileBtn = document.getElementById('removeFileBtn');
    const resetBtn = document.getElementById('resetUploadFormBtn');
    const nameInput = document.getElementById('uploadStudentName');
    const emailInput = document.getElementById('uploadEmail');

    if (nameInput && window.NoteNest && window.NoteNest.user && window.NoteNest.user.name) {
      nameInput.value = window.NoteNest.user.name;
    }
    if (emailInput && window.NoteNest && window.NoteNest.user && window.NoteNest.user.email) {
      emailInput.value = window.NoteNest.user.email;
    }

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFileObject(e.target.files[0]);
        }
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropzone.classList.add('dragover');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropzone.classList.remove('dragover');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleFileObject(e.dataTransfer.files[0]);
        }
      });
    }

    if (removeFileBtn) {
      removeFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        attachedFile = null;
        if (fileInput) fileInput.value = '';
        if (dropzoneContent) dropzoneContent.style.display = 'block';
        if (selectedFilePreview) selectedFilePreview.style.display = 'none';
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (form) form.reset();
        attachedFile = null;
        if (fileInput) fileInput.value = '';
        if (dropzoneContent) dropzoneContent.style.display = 'block';
        if (selectedFilePreview) selectedFilePreview.style.display = 'none';
        document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
      });
    }

    if (form) form.addEventListener('submit', handleUploadSubmit);
  }

  function handleFileObject(file) {
    attachedFile = file;
    const nameEl = document.getElementById('selectedFileName');
    const sizeEl = document.getElementById('selectedFileSize');
    const dropzoneContent = document.getElementById('dropzoneContent');
    const selectedFilePreview = document.getElementById('selectedFilePreview');

    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    if (nameEl) nameEl.textContent = file.name;
    if (sizeEl) sizeEl.textContent = `${sizeMb} MB`;

    if (dropzoneContent) dropzoneContent.style.display = 'none';
    if (selectedFilePreview) selectedFilePreview.style.display = 'block';

    const err = document.getElementById('err-uploadFile');
    if (err) err.textContent = '';
  }

  function handleUploadSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('uploadStudentName');
    const emailInput = document.getElementById('uploadEmail');
    const deptInput = document.getElementById('uploadDepartment');
    const semInput = document.getElementById('uploadSemester');
    const subjectInput = document.getElementById('uploadSubject');
    const typeInput = document.getElementById('uploadType');
    const titleInput = document.getElementById('uploadTitle');
    const descInput = document.getElementById('uploadDescription');
    const tagsInput = document.getElementById('uploadTags');

    let isValid = true;
    if (!nameInput.value.trim()) { setError('err-uploadStudentName', 'Please enter your name'); isValid = false; } else clearError('err-uploadStudentName');
    if (!emailInput.value.trim() || !emailInput.value.includes('@')) { setError('err-uploadEmail', 'Please enter a valid college email'); isValid = false; } else clearError('err-uploadEmail');
    if (!deptInput.value) { setError('err-uploadDepartment', 'Please select a department'); isValid = false; } else clearError('err-uploadDepartment');
    if (!semInput.value) { setError('err-uploadSemester', 'Please select a semester'); isValid = false; } else clearError('err-uploadSemester');
    if (!subjectInput.value.trim()) { setError('err-uploadSubject', 'Please enter subject name'); isValid = false; } else clearError('err-uploadSubject');
    if (!typeInput.value) { setError('err-uploadType', 'Please select note type'); isValid = false; } else clearError('err-uploadType');
    if (!titleInput.value.trim()) { setError('err-uploadTitle', 'Please provide a descriptive title'); isValid = false; } else clearError('err-uploadTitle');
    if (!descInput.value.trim()) { setError('err-uploadDescription', 'Please write a brief summary'); isValid = false; } else clearError('err-uploadDescription');

    if (!isValid) {
      window.showToast('Incomplete Form', 'Please fill in all required fields correctly', 'warning');
      return;
    }

    const fileExt = attachedFile ? attachedFile.name.split('.').pop().toLowerCase() : 'pdf';
    const fileSizeStr = attachedFile ? `${(attachedFile.size / (1024 * 1024)).toFixed(1)} MB` : '3.8 MB';
    const rawTags = tagsInput.value.trim() ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean) : [subjectInput.value.trim(), deptInput.value];
    const initials = nameInput.value.trim().split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();

    const newNote = {
      id: Date.now(),
      title: titleInput.value.trim(),
      subject: subjectInput.value.trim(),
      department: deptInput.value,
      semester: semInput.value,
      type: typeInput.value,
      uploader: nameInput.value.trim(),
      uploaderAvatar: initials,
      uploaderEmail: emailInput.value.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      fileType: fileExt,
      fileSize: fileSizeStr,
      downloads: 1,
      rating: 5.0,
      ratingCount: 1,
      description: descInput.value.trim(),
      tags: rawTags,
      previewPages: [
        `NOTES DOCUMENT: ${titleInput.value.toUpperCase()}\n\nSubject: ${subjectInput.value}\nDepartment: ${deptInput.value}\nSemester: ${semInput.value}\nUploaded by: ${nameInput.value}\n\nOVERVIEW:\n${descInput.value.trim()}\n\nNoteNest Verified Student Document.`
      ]
    };

    NoteNest.notes.unshift(newNote);
    NoteNest.Storage.saveNotes(NoteNest.notes);

    const notifs = NoteNest.Storage.getNotifications();
    notifs.unshift({
      id: Date.now(),
      title: "Note Published! 🚀",
      text: `Your note "${newNote.title.substring(0, 25)}..." is now live.`,
      time: "Just now",
      icon: "🎉"
    });
    NoteNest.Storage.saveNotifications(notifs);

    window.showToast('Success! 🌟', 'Your notes have been added successfully!', 'success');

    setTimeout(() => {
      window.location.href = 'explore.html';
    }, 1200);
  }

  function setError(elementId, msg) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = msg;
  }

  function clearError(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = '';
  }

  document.addEventListener('DOMContentLoaded', initUploadPage);
})();
