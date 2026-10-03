# 🎓 NoteNest - Students Notes Sharing Portal

A modern, attractive, peer-to-peer digital notes library built with **pure HTML5, CSS3, and Vanilla JavaScript** (Zero dependencies, no frameworks, no backend required).

---

## 🌟 Features

- 🏠 **Landing / Home Page (`index.html`)**: Asymmetrical hero, quick search, interactive preview cards, popular department categories, and trending notes.
- 📚 **Notes Explorer (`explore.html`)**: Multi-criteria filter sidebar (Department, Semester, Subject, Note Type, Rating), real-time search, sorting, and tag chips.
- 📤 **Upload Notes (`upload.html`)**: Publish notes form with drag-and-drop file attachment simulator and client-side validation.
- 📊 **Student Dashboard (`dashboard.html`)**: Real-time stats, time-aware greeting, uploaded notes management (with delete), saved bookmarks, and recently viewed history.
- 👤 **Student Profile (`profile.html`)**: Profile identity card, badges, and interactive profile editing.
- 💡 **About Page (`about.html`)**: Mission statement, community values, and FAQ accordion.
- 🌙 **Dark / Light Mode**: Smooth theme toggling with `localStorage` persistence.
- 📱 **Fully Responsive**: Mobile drawer navigation, collapsible filters, and touch-friendly layout.
- 🚀 **Offline Ready**: Embedded vector SVG icons (no external icon font dependencies).

---

## 📁 File Structure

```
d:\PROJECTMANYA\
│
├── 📄 HTML Pages
│   ├── index.html        # Home / Landing Page
│   ├── explore.html      # Notes Explorer Page
│   ├── upload.html       # Upload Notes Page
│   ├── dashboard.html    # Student Dashboard Page
│   ├── profile.html      # Student Profile Page
│   └── about.html        # About & FAQ Page
│
├── ⚡ JavaScript Modules
│   ├── common.js         # Shared storage, models, theme, modals, bookmarks, toasts
│   ├── home.js           # Home page logic
│   ├── explore.js        # Explorer filter & search logic
│   ├── upload.js         # Upload form & file attachment logic
│   ├── dashboard.js      # Dashboard metrics & tabs logic
│   ├── profile.js        # Profile info & edit logic
│   └── about.js          # About FAQ accordion logic
│
├── 🎨 Styling
│   └── style.css         # Modern responsive CSS design system
│
└── ⚙️ Config
    ├── .gitignore
    └── README.md
```

---

## 🚀 How to Run

Simply open **`index.html`** in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
No installation, `npm`, Node.js, PHP, or local server is required.

---

## 📜 License

MIT License © 2026 NoteNest. Built for Students.
