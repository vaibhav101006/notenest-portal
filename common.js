/**
 * ============================================================================
 * NoteNest - Students Notes Sharing Portal
 * common.js - Shared Data, Storage, Theme, Auth, Modals & Global Utilities
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. INITIAL DATASET (Seed data for LocalStorage)
     -------------------------------------------------------------------------- */
  const INITIAL_NOTES = [
    {
      id: 1,
      title: "Data Structures & Algorithms Complete Handwritten Notes",
      subject: "Data Structures",
      department: "Computer Engineering",
      semester: "Semester 3",
      type: "Lecture Notes",
      uploader: "Rahul Patel",
      uploaderAvatar: "RP",
      uploaderEmail: "rahul.p@college.edu",
      date: "12 Jan 2026",
      fileType: "pdf",
      fileSize: "4.2 MB",
      downloads: 348,
      rating: 4.9,
      ratingCount: 142,
      description: "Complete chapter-wise handwritten notes covering Arrays, Linked Lists, Stacks, Queues, Binary Trees, AVL Trees, Graphs, Sorting algorithms, and Big-O time complexity analysis with clean diagrams.",
      tags: ["DSA", "Trees", "Graphs", "Algorithms", "Mid-Sem", "C++"],
      previewPages: [
        `UNIT 1: INTRODUCTION TO ALGORITHM ANALYSIS\n\n1. Big-O Notation:\n   - Defines the upper bound of algorithm growth rate.\n   - Example: Linear Search O(n), Binary Search O(log n).\n\n2. Memory Layout of Arrays:\n   - Contiguous memory allocation: Base_Address + (Index * Element_Size).\n   - Access Time: O(1) instantaneous lookup.\n\n3. Singly Linked List vs Doubly Linked List:\n   - Singly: Single forward pointer (next). Less memory.\n   - Doubly: Two pointers (next, prev). Easy bidirectional traversal.`,
        `UNIT 2: STACKS & QUEUES IMPLEMENTATION\n\n1. Stack (LIFO - Last In First Out):\n   - Push: Insert element onto top (check for overflow).\n   - Pop: Remove element from top (check for underflow).\n   - Applications: Function call stack, Infix to Postfix conversion, Parentheses matching.\n\n2. Queue (FIFO - First In First Out):\n   - Circular Queue: Resolves unused empty memory issue.\n   - Formula: rear = (rear + 1) % MAX_SIZE.`,
        `UNIT 3: TREES & GRAPH TRAVERSALS\n\n1. Binary Search Tree (BST) Property:\n   - Left Subtree < Root < Right Subtree.\n   - Inorder traversal of BST always produces elements in sorted ascending order!\n\n2. Graph Traversal Algorithms:\n   - BFS (Breadth-First Search): Uses Queue, explores level by level.\n   - DFS (Depth-First Search): Uses Stack/Recursion, explores down branch first.`
      ]
    },
    {
      id: 2,
      title: "Operating Systems Process Scheduling & Memory Management",
      subject: "Operating Systems",
      department: "Computer Engineering",
      semester: "Semester 4",
      type: "Lecture Notes",
      uploader: "Ananya Sharma",
      uploaderAvatar: "AS",
      uploaderEmail: "ananya.s@college.edu",
      date: "18 Jan 2026",
      fileType: "pdf",
      fileSize: "3.8 MB",
      downloads: 290,
      rating: 4.8,
      ratingCount: 98,
      description: "Concise revision guide with solved numericals on CPU Scheduling (FCFS, SJF, Round Robin), Deadlock detection Banker's algorithm, Paging, and Virtual Memory replacement policies.",
      tags: ["OS", "Deadlock", "CPU Scheduling", "Paging", "Numericals"],
      previewPages: [
        `CHAPTER 3: CPU SCHEDULING ALGORITHMS\n\n1. Round Robin (RR):\n   - Preemptive scheduling based on fixed Time Quantum (TQ).\n   - If TQ is too large -> Behaves like FCFS.\n   - If TQ is too small -> High context-switching overhead.\n\n2. Solved Numerical Example:\n   Processes: P1(Burst=5ms), P2(Burst=3ms), P3(Burst=8ms)\n   TQ = 2ms -> Gantt Chart: | P1 | P2 | P3 | P1 | P2 | P3 | P1 | P3 |\n   Average Turnaround Time = 9.33 ms`,
        `CHAPTER 5: DEADLOCKS & BANKER'S ALGORITHM\n\nFour Necessary Conditions for Deadlock:\n 1. Mutual Exclusion\n 2. Hold and Wait\n 3. No Preemption\n 4. Circular Wait\n\nBanker's Safety Algorithm:\n Need Matrix = Max Matrix - Allocation Matrix.\n System is in safe state if a sequence exists where Need <= Available.`
      ]
    },
    {
      id: 3,
      title: "Structural Analysis & Reinforced Concrete Quick Formulas",
      subject: "Structural Analysis",
      department: "Civil Engineering",
      semester: "Semester 4",
      type: "Cheat Sheet",
      uploader: "Vikram Kapoor",
      uploaderAvatar: "VK",
      uploaderEmail: "vikram.k@college.edu",
      date: "05 Feb 2026",
      fileType: "pdf",
      fileSize: "5.1 MB",
      downloads: 185,
      rating: 4.7,
      ratingCount: 56,
      description: "Complete formula sheet for Moment Distribution Method, Slope Deflection equations, Shear force and Bending moment diagrams for indeterminate beams.",
      tags: ["Civil", "Structural Analysis", "RCC", "Formulas", "Beams"],
      previewPages: [
        `CIVIL ENGINEERING: STRUCTURAL ANALYSIS CHEAT SHEET\n\n1. Slope Deflection Equations:\n   M_AB = M_F_AB + (2EI/L) * [2*theta_A + theta_B - (3*delta/L)]\n   M_BA = M_F_BA + (2EI/L) * [2*theta_B + theta_A - (3*delta/L)]\n\n2. Moment Distribution Factors:\n   Distribution Factor (DF) = (k / sum(k))\n   Stiffness for far end fixed: k = 4EI/L\n   Stiffness for far end hinged: k = 3EI/L`,
        `REINFORCED CONCRETE DESIGN (IS 456:2000)\n\n1. Limiting Depth of Neutral Axis (x_u,max / d):\n   - Fe 250 : 0.53\n   - Fe 415 : 0.48\n   - Fe 500 : 0.46\n\n2. Ultimate Moment of Resistance (M_u,lim):\n   M_u,lim = 0.36 * f_ck * b * x_u,max * (d - 0.42 * x_u,max)`
      ]
    },
    {
      id: 4,
      title: "Thermodynamics & Fluid Mechanics Previous Year Solved Papers",
      subject: "Applied Thermodynamics",
      department: "Mechanical Engineering",
      semester: "Semester 3",
      type: "Previous Year Paper",
      uploader: "Rohan Verma",
      uploaderAvatar: "RV",
      uploaderEmail: "rohan.v@college.edu",
      date: "20 Jan 2026",
      fileType: "pdf",
      fileSize: "6.5 MB",
      downloads: 412,
      rating: 4.9,
      ratingCount: 178,
      description: "Past 5 years solved university question papers with step-by-step Carnot, Rankine, Otto, and Diesel cycle derivations with P-V and T-S state diagrams.",
      tags: ["Mechanical", "Thermodynamics", "Solved Papers", "Rankine Cycle", "Exam Prep"],
      previewPages: [
        `THERMODYNAMICS - 2025 UNIVERSITY EXAM SOLVED PAPER\n\nQuestion 1(a): Derive thermal efficiency of Otto Cycle in terms of compression ratio (r).\n\nSolution:\nProcess 1-2: Isentropic Compression (PV^gamma = C)\nProcess 2-3: Constant Volume Heat Addition (Q_in = m*Cv*(T3 - T2))\nProcess 3-4: Isentropic Expansion\nProcess 4-1: Constant Volume Heat Rejection (Q_out = m*Cv*(T4 - T1))\n\nEfficiency eta = 1 - (Q_out / Q_in) = 1 - 1/(r^(gamma - 1))\nFor air (gamma = 1.4) and r = 8: eta = 56.47%`
      ]
    },
    {
      id: 5,
      title: "Signals and Systems & Digital Electronics Lab Manual",
      subject: "Signals and Systems",
      department: "Electrical Engineering",
      semester: "Semester 4",
      type: "Lab Manual",
      uploader: "Pooja Hegde",
      uploaderAvatar: "PH",
      uploaderEmail: "pooja.h@college.edu",
      date: "28 Jan 2026",
      fileType: "docx",
      fileSize: "2.9 MB",
      downloads: 142,
      rating: 4.6,
      ratingCount: 38,
      description: "Standard college lab experiment manual including MATLAB scripts for Continuous & Discrete Fourier Transforms (DFT/FFT), Bode Plots, and Nyquist stability checks.",
      tags: ["Electrical", "Signals", "MATLAB", "Lab Manual", "Fourier Transform"],
      previewPages: [
        `EXPERIMENT 4: FOURIER TRANSFORM OF CONTINUOUS TIME SIGNALS USING MATLAB\n\nObjective: To compute and plot the magnitude and phase spectrum of a rectangular pulse.\n\nMATLAB Code:\n>> t = -2:0.001:2;\n>> x = rectpuls(t, 1);\n>> X = fftshift(fft(x));\n>> f = linspace(-500, 500, length(X));\n>> plot(f, abs(X)); title('Magnitude Spectrum');\n\nInference: Fourier transform of a rectangular pulse in time domain results in a Sinc function in frequency domain.`
      ]
    },
    {
      id: 6,
      title: "Database Management Systems (DBMS) SQL Queries & Normalization",
      subject: "DBMS",
      department: "BCA",
      semester: "Semester 3",
      type: "Lecture Notes",
      uploader: "Manya Shah",
      uploaderAvatar: "MS",
      uploaderEmail: "manya.shah@college.edu",
      date: "02 Feb 2026",
      fileType: "pdf",
      fileSize: "3.5 MB",
      downloads: 215,
      rating: 4.9,
      ratingCount: 88,
      description: "Handcrafted notes with 50+ real SQL interview queries, Relational Algebra, ER-to-Relational mapping rules, and step-by-step 1NF, 2NF, 3NF, and BCNF normalization.",
      tags: ["DBMS", "SQL", "Normalization", "BCA", "Database", "ACID"],
      previewPages: [
        `DBMS UNIT 3: NORMALIZATION & DEPENDENCIES\n\n1. Functional Dependency (FD):\n   X -> Y means value of X uniquely determines Y.\n\n2. Normal Forms Breakdown:\n   - 1NF: Atomic values only (no multi-valued attributes).\n   - 2NF: In 1NF and NO Partial Dependencies (Non-prime attr must depend on whole candidate key).\n   - 3NF: In 2NF and NO Transitive Dependencies (X -> Y and Y -> Z where Z is non-prime is disallowed).\n   - BCNF: For every nontrivial FD X -> Y, X MUST be a Super Key!`
      ]
    },
    {
      id: 7,
      title: "Marketing Management & Organizational Behavior Case Studies",
      subject: "Marketing Management",
      department: "BBA",
      semester: "Semester 2",
      type: "Assignment",
      uploader: "Neha Kulkarni",
      uploaderAvatar: "NK",
      uploaderEmail: "neha.k@college.edu",
      date: "10 Feb 2026",
      fileType: "pptx",
      fileSize: "4.8 MB",
      downloads: 165,
      rating: 4.7,
      ratingCount: 42,
      description: "Solved case studies analyzing SWOT, Porter's 5 Forces, Marketing Mix (4Ps & 7Ps), and consumer behavioral models with presentation slide decks.",
      tags: ["BBA", "Marketing", "Case Studies", "SWOT", "Management"],
      previewPages: [
        `MARKETING MANAGEMENT - 4Ps FRAMEWORK APPLIED\n\n1. Product: Core value proposition, brand identity, lifecycle stage.\n2. Price: Penetration pricing vs Price skimming strategy.\n3. Place: Omnichannel distribution & supply chain logistics.\n4. Promotion: Integrated Marketing Communications (IMC), Digital Ads & PR.`
      ]
    },
    {
      id: 8,
      title: "Engineering Mathematics III: Laplace & Fourier Transforms",
      subject: "Engineering Mathematics",
      department: "Mathematics",
      semester: "Semester 3",
      type: "Important Questions",
      uploader: "Prof. K. Raman",
      uploaderAvatar: "KR",
      uploaderEmail: "k.raman@college.edu",
      date: "15 Jan 2026",
      fileType: "pdf",
      fileSize: "5.4 MB",
      downloads: 520,
      rating: 5.0,
      ratingCount: 230,
      description: "Handpicked 50 high-probability exam questions covering Laplace Transforms, Inverse Laplace by Partial Fractions, Convolution Theorem, and Z-Transforms with solutions.",
      tags: ["Maths", "Laplace", "Fourier", "Differential Equations", "High Probability"],
      previewPages: [
        `ENGINEERING MATHEMATICS III - LAPLACE TRANSFORM FORMULAS\n\n1. Standard Transforms:\n   - L{1} = 1/s\n   - L{t^n} = n! / s^(n+1)\n   - L{e^(at)} = 1 / (s - a)\n   - L{sin(at)} = a / (s^2 + a^2)\n   - L{cos(at)} = s / (s^2 + a^2)\n\n2. First Shifting Property:\n   If L{f(t)} = F(s), then L{e^(at) * f(t)} = F(s - a).\n\n3. Convolution Theorem:\n   L^-1{F(s) * G(s)} = integral from 0 to t of f(u) * g(t - u) du.`
      ]
    }
  ];

  const POPULAR_CATEGORIES = [
    { name: "Computer Science", dept: "Computer Engineering", icon: "💻", count: 420 },
    { name: "Civil Engineering", dept: "Civil Engineering", icon: "🏗️", count: 180 },
    { name: "Mechanical", dept: "Mechanical Engineering", icon: "⚙️", count: 210 },
    { name: "Electrical", dept: "Electrical Engineering", icon: "⚡", count: 195 },
    { name: "Management", dept: "BBA", icon: "📊", count: 140 },
    { name: "Mathematics", dept: "Mathematics", icon: "📐", count: 280 }
  ];

  const INITIAL_NOTIFICATIONS = [
    { id: 1, title: "New Material in DSA", text: "Rahul Patel updated Data Structures Unit 3 diagrams.", time: "10 mins ago", icon: "📝" },
    { id: 2, title: "Bookmark Downloaded", text: "Your saved note 'DBMS SQL Queries' received 20+ new upvotes.", time: "1 hour ago", icon: "🔥" },
    { id: 3, title: "Mid-Sem Repository Live", text: "Verified question banks for 2026 are now open.", time: "1 day ago", icon: "🎉" }
  ];

  const DEFAULT_USER = {
    isLoggedIn: true,
    name: "Manya Shah",
    email: "manya.shah@college.edu",
    department: "Computer Engineering",
    semester: "Semester 4",
    college: "National Institute of Engineering",
    bio: "Passionate coding student, DSA enthusiast, and collaborative notes contributor. Always striving for top GPA!",
    avatar: "MS",
    profileViews: 128
  };

  /* --------------------------------------------------------------------------
     2. STORAGE MANAGER
     -------------------------------------------------------------------------- */
  const StorageManager = {
    getNotes() {
      const data = localStorage.getItem('notenest_notes');
      if (!data) {
        localStorage.setItem('notenest_notes', JSON.stringify(INITIAL_NOTES));
        return INITIAL_NOTES;
      }
      try { return JSON.parse(data); } catch (e) { return INITIAL_NOTES; }
    },
    saveNotes(notes) {
      localStorage.setItem('notenest_notes', JSON.stringify(notes));
    },
    getBookmarks() {
      const data = localStorage.getItem('notenest_bookmarks');
      return data ? JSON.parse(data) : [1, 6, 8];
    },
    saveBookmarks(bookmarks) {
      localStorage.setItem('notenest_bookmarks', JSON.stringify(bookmarks));
    },
    getRecentViews() {
      const data = localStorage.getItem('notenest_recent_views');
      return data ? JSON.parse(data) : [1, 2, 6];
    },
    addRecentView(noteId) {
      let recents = this.getRecentViews().filter(id => id !== noteId);
      recents.unshift(noteId);
      if (recents.length > 8) recents.pop();
      localStorage.setItem('notenest_recent_views', JSON.stringify(recents));
    },
    getUser() {
      const data = localStorage.getItem('notenest_user');
      if (!data) {
        localStorage.setItem('notenest_user', JSON.stringify(DEFAULT_USER));
        return { ...DEFAULT_USER };
      }
      try {
        const u = JSON.parse(data);
        if (u.name === 'Siddharth Sharma' || !u.name) {
          u.name = 'Manya Shah';
          u.avatar = 'MS';
          u.email = 'manya.shah@college.edu';
          localStorage.setItem('notenest_user', JSON.stringify(u));
        }
        return u;
      } catch (e) { return { ...DEFAULT_USER }; }
    },
    saveUser(user) {
      localStorage.setItem('notenest_user', JSON.stringify(user));
    },
    getTheme() {
      return localStorage.getItem('notenest_theme') || 'light';
    },
    setTheme(theme) {
      localStorage.setItem('notenest_theme', theme);
    },
    getNotifications() {
      const data = localStorage.getItem('notenest_notifs');
      return data ? JSON.parse(data) : INITIAL_NOTIFICATIONS;
    },
    saveNotifications(notifs) {
      localStorage.setItem('notenest_notifs', JSON.stringify(notifs));
    }
  };

  /* --------------------------------------------------------------------------
     3. APP GLOBAL CONTEXT
     -------------------------------------------------------------------------- */
  const NoteNest = {
    notes: StorageManager.getNotes(),
    bookmarks: StorageManager.getBookmarks(),
    user: StorageManager.getUser(),
    categories: POPULAR_CATEGORIES,
    Storage: StorageManager,
    activeModalNote: null,
    previewCurrentPage: 0
  };

  /* --------------------------------------------------------------------------
     4. GLOBAL UI UTILITIES (Theme, Toast, Auth, Nav)
     -------------------------------------------------------------------------- */
  function setupTheme() {
    const saved = StorageManager.getTheme();
    document.documentElement.setAttribute('data-theme', saved);

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const curr = document.documentElement.getAttribute('data-theme');
        const next = curr === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        StorageManager.setTheme(next);
        showToast('Theme Changed', `Switched to ${next} mode`, 'info');
      });
    }

    const prefToggle = document.getElementById('prefThemeToggleBtn');
    if (prefToggle) {
      prefToggle.addEventListener('click', () => {
        const curr = document.documentElement.getAttribute('data-theme');
        const next = curr === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        StorageManager.setTheme(next);
        showToast('Theme Changed', `Switched to ${next} mode`, 'info');
      });
    }
  }

  function setupNavbar() {
    const hamburger = document.getElementById('hamburgerBtn');
    const drawer = document.getElementById('mobileDrawer');
    const closeDrawer = document.getElementById('closeDrawerBtn');
    const bannerClose = document.getElementById('bannerCloseBtn');
    const announcement = document.querySelector('.top-announcement');
    const quickSearchInput = document.getElementById('quickSearchInput');

    if (hamburger && drawer) hamburger.addEventListener('click', () => drawer.classList.toggle('open'));
    if (closeDrawer && drawer) closeDrawer.addEventListener('click', () => drawer.classList.remove('open'));
    if (bannerClose && announcement) bannerClose.addEventListener('click', () => announcement.style.display = 'none');

    // Global shortcut Ctrl+K & Escape
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (quickSearchInput) quickSearchInput.focus();
      }
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.active').forEach(m => closeModal(m));
        if (drawer) drawer.classList.remove('open');
      }
    });

    // Click outside to close drawer
    document.addEventListener('click', (e) => {
      if (drawer && drawer.classList.contains('open')) {
        if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
          drawer.classList.remove('open');
        }
      }
      const filterSidebar = document.getElementById('filterSidebar');
      const mobileFilterBtn = document.getElementById('mobileFilterToggleBtn');
      if (filterSidebar && filterSidebar.classList.contains('open')) {
        if (!filterSidebar.contains(e.target) && (!mobileFilterBtn || !mobileFilterBtn.contains(e.target))) {
          filterSidebar.classList.remove('open');
        }
      }
    });

    renderUserAuthSlot();
    setupNotifications();
  }

  function setupNotifications() {
    const notifBtn = document.getElementById('notifBtn');
    const notifList = document.getElementById('notifList');
    const notifCount = document.getElementById('notifCount');
    const markAllBtn = document.getElementById('markAllReadBtn');

    const notifs = StorageManager.getNotifications();
    if (notifCount) notifCount.textContent = notifs.length;

    if (notifList) {
      if (notifs.length === 0) {
        notifList.innerHTML = `<li style="text-align:center; padding: 16px; color: var(--text-muted); font-size: 0.85rem;">No new notifications ✨</li>`;
      } else {
        notifList.innerHTML = notifs.map(n => `
          <li class="notif-item">
            <span class="notif-icon">${n.icon}</span>
            <div class="notif-text">
              <strong>${n.title}</strong>
              <span>${n.text}</span>
              <div class="notif-time">${n.time}</div>
            </div>
          </li>
        `).join('');
      }
    }

    if (notifBtn) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifBtn.closest('.dropdown-wrapper').classList.toggle('active');
      });
    }

    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        StorageManager.saveNotifications([]);
        setupNotifications();
        showToast('Notifications Cleared', 'All activity notifications marked as read', 'info');
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-wrapper')) {
        document.querySelectorAll('.dropdown-wrapper').forEach(dw => dw.classList.remove('active'));
      }
    });
  }

  function renderUserAuthSlot() {
    const slot = document.getElementById('userAuthSlot');
    const drawerFooter = document.getElementById('mobileDrawerFooter');
    if (!slot) return;

    if (NoteNest.user && NoteNest.user.isLoggedIn) {
      slot.innerHTML = `
        <a href="profile.html" class="user-profile-badge" title="View Profile">
          <div class="user-avatar-sm">${NoteNest.user.avatar || 'ST'}</div>
          <span class="user-name-sm">${NoteNest.user.name.split(' ')[0]}</span>
        </a>
      `;

      if (drawerFooter) {
        drawerFooter.innerHTML = `
          <button class="btn btn-secondary btn-block" id="mobileLogoutBtn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Sign Out (${NoteNest.user.name.split(' ')[0]})
          </button>
        `;
        const logoutBtn = document.getElementById('mobileLogoutBtn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', () => {
            NoteNest.user.isLoggedIn = false;
            StorageManager.saveUser(NoteNest.user);
            renderUserAuthSlot();
            showToast('Signed Out', 'You have been logged out', 'info');
          });
        }
      }
    } else {
      slot.innerHTML = `
        <button class="btn btn-sm btn-primary" id="openAuthModalBtn">Sign In</button>
      `;
      const authBtn = document.getElementById('openAuthModalBtn');
      if (authBtn) authBtn.addEventListener('click', () => openModal(document.getElementById('authModal')));

      if (drawerFooter) {
        drawerFooter.innerHTML = `<button class="btn btn-primary btn-block" id="mobileLoginBtn">Sign In / Register</button>`;
        const mobileLogin = document.getElementById('mobileLoginBtn');
        if (mobileLogin) {
          mobileLogin.addEventListener('click', () => {
            const drawer = document.getElementById('mobileDrawer');
            if (drawer) drawer.classList.remove('open');
            openModal(document.getElementById('authModal'));
          });
        }
      }
    }
  }

  function setupAuthModal() {
    const authModal = document.getElementById('authModal');
    const closeBtn = document.getElementById('closeAuthModalBtn');
    const tabLogin = document.getElementById('authTabLogin');
    const tabSignup = document.getElementById('authTabSignup');
    const paneLogin = document.getElementById('authPaneLogin');
    const paneSignup = document.getElementById('authPaneSignup');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const demoBtn = document.getElementById('demoStudentLoginBtn');

    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(authModal));

    if (tabLogin && tabSignup) {
      tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active'); tabSignup.classList.remove('active');
        paneLogin.classList.add('active'); paneSignup.classList.remove('active');
      });
      tabSignup.addEventListener('click', () => {
        tabSignup.classList.add('active'); tabLogin.classList.remove('active');
        paneSignup.classList.add('active'); paneLogin.classList.remove('active');
      });
    }

    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        const em = document.getElementById('loginEmail');
        const pw = document.getElementById('loginPassword');
        if (em) em.value = "siddharth.s@college.edu";
        if (pw) pw.value = "student123";
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const em = document.getElementById('loginEmail').value.trim();
        NoteNest.user.isLoggedIn = true;
        NoteNest.user.email = em || "student@college.edu";
        StorageManager.saveUser(NoteNest.user);
        closeModal(authModal);
        renderUserAuthSlot();
        showToast('Welcome back!', `Logged in as ${NoteNest.user.name}`, 'success');
        if (window.onUserUpdate) window.onUserUpdate();
      });
    }

    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const dept = document.getElementById('signupDept').value;
        const sem = document.getElementById('signupSem').value;

        NoteNest.user = {
          isLoggedIn: true,
          name: name || "Student",
          email: email || "student@college.edu",
          department: dept,
          semester: sem,
          college: "National Institute of Engineering",
          bio: "Student exploring verified study materials.",
          avatar: name ? name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase() : "ST",
          profileViews: 1
        };

        StorageManager.saveUser(NoteNest.user);
        closeModal(authModal);
        renderUserAuthSlot();
        showToast('Account Created!', `Welcome to NoteNest, ${NoteNest.user.name}!`, 'success');
        if (window.onUserUpdate) window.onUserUpdate();
      });
    }
  }

  /* --------------------------------------------------------------------------
     5. NOTE CARD BUILDER & PREVIEW MODAL
     -------------------------------------------------------------------------- */
  function createNoteCardHTML(note) {
    const isBookmarked = NoteNest.bookmarks.includes(note.id);
    const fileClass = note.fileType ? note.fileType.toLowerCase() : 'pdf';

    return `
      <div class="note-card" data-note-id="${note.id}">
        <div class="note-card-top">
          <span class="note-file-type ${fileClass}">${note.fileType || 'PDF'}</span>
          <button class="bookmark-icon-btn ${isBookmarked ? 'active' : ''}" 
                  onclick="app.toggleBookmark(${note.id}, event)" 
                  title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Note'}">
            <svg viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>

        <div class="note-meta-badges">
          <span class="note-subject-tag">${note.subject}</span>
          <span class="note-sem-badge">${note.semester}</span>
        </div>

        <h3 class="note-card-title" onclick="app.openNoteModal(${note.id})">${note.title}</h3>
        <p class="note-card-desc">${note.description}</p>

        <div class="note-uploader-bar">
          <div class="uploader-mini-profile">
            <div class="uploader-avatar-circle">${note.uploaderAvatar || 'ST'}</div>
            <span class="uploader-name">${note.uploader}</span>
          </div>
          <div class="note-rating-box">
            <span>★ ${Number(note.rating).toFixed(1)}</span>
          </div>
        </div>

        <div class="note-card-actions">
          <button class="btn btn-secondary btn-sm" onclick="app.openNoteModal(${note.id})">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            View
          </button>
          <button class="btn btn-primary btn-sm" onclick="app.downloadNote(${note.id}, event)">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download
          </button>
        </div>

        <div class="note-card-footer-info">
          <span>${note.downloads} Downloads</span>
          <span>${note.date || 'Jan 2026'}</span>
        </div>
      </div>
    `;
  }

  function setupNoteModal() {
    const modal = document.getElementById('noteDetailsModal');
    const closeBtn = document.getElementById('closeNoteModalBtn');
    const closeBtn2 = document.getElementById('modalCloseBtn2');
    const bmBtn = document.getElementById('modalBookmarkBtn');
    const dlBtn = document.getElementById('modalDownloadBtn');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
    if (closeBtn2) closeBtn2.addEventListener('click', () => closeModal(modal));

    if (bmBtn) {
      bmBtn.addEventListener('click', () => {
        if (NoteNest.activeModalNote) toggleBookmark(NoteNest.activeModalNote.id);
      });
    }

    if (dlBtn) {
      dlBtn.addEventListener('click', () => {
        if (NoteNest.activeModalNote) downloadNote(NoteNest.activeModalNote.id);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (!NoteNest.activeModalNote) return;
        if (NoteNest.previewCurrentPage > 0) {
          NoteNest.previewCurrentPage--;
          renderPreviewPage();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!NoteNest.activeModalNote) return;
        const total = (NoteNest.activeModalNote.previewPages || []).length || 1;
        if (NoteNest.previewCurrentPage < total - 1) {
          NoteNest.previewCurrentPage++;
          renderPreviewPage();
        }
      });
    }

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal(backdrop);
      });
    });
  }

  function openNoteModal(noteId) {
    const note = NoteNest.notes.find(n => n.id === noteId);
    const modal = document.getElementById('noteDetailsModal');
    if (!note || !modal) return;

    NoteNest.activeModalNote = note;
    NoteNest.previewCurrentPage = 0;
    StorageManager.addRecentView(noteId);

    const typeEl = document.getElementById('modalNoteType');
    const deptEl = document.getElementById('modalNoteDept');
    const titleEl = document.getElementById('modalNoteTitle');
    const subEl = document.getElementById('modalNoteSubject');
    const semEl = document.getElementById('modalNoteSem');
    const dateEl = document.getElementById('modalNoteDate');
    const uploaderEl = document.getElementById('modalNoteUploader');
    const ratingEl = document.getElementById('modalNoteRating');
    const dlEl = document.getElementById('modalNoteDownloads');
    const sizeEl = document.getElementById('modalNoteSize');
    const descEl = document.getElementById('modalNoteDesc');
    const tagsEl = document.getElementById('modalNoteTags');

    if (typeEl) typeEl.textContent = note.type || 'Lecture Notes';
    if (deptEl) deptEl.textContent = `${note.department} • ${note.semester}`;
    if (titleEl) titleEl.textContent = note.title;
    if (subEl) subEl.textContent = `Subject: ${note.subject}`;
    if (semEl) semEl.textContent = note.semester;
    if (dateEl) dateEl.textContent = `Uploaded: ${note.date || 'Jan 2026'}`;
    if (uploaderEl) uploaderEl.textContent = note.uploader;
    if (ratingEl) ratingEl.textContent = `★ ${Number(note.rating).toFixed(1)} / 5.0 (${note.ratingCount || 45} ratings)`;
    if (dlEl) dlEl.textContent = `${note.downloads} times`;
    if (sizeEl) sizeEl.textContent = `${(note.fileType || 'PDF').toUpperCase()} • ${note.fileSize || '3.5 MB'}`;
    if (descEl) descEl.textContent = note.description;

    if (tagsEl) {
      if (note.tags && note.tags.length > 0) {
        tagsEl.innerHTML = note.tags.map(t => `<span class="tag-badge">#${t}</span>`).join('');
      } else {
        tagsEl.innerHTML = `<span class="tag-badge">#${note.subject}</span><span class="tag-badge">#${note.department}</span>`;
      }
    }

    updateModalBookmarkBtn();
    renderPreviewPage();
    openModal(modal);
  }

  function renderPreviewPage() {
    const note = NoteNest.activeModalNote;
    if (!note) return;

    const pages = note.previewPages || [
      `PREVIEW SUMMARY FOR ${note.title.toUpperCase()}\n\nSubject: ${note.subject}\nDepartment: ${note.department}\n\n1. Key Concepts Covered:\n   - Comprehensive chapter breakdowns\n   - Solved numericals & formulas\n   - University exam blueprinted topics\n\n2. NoteNest Verified Content:\n   - 100% original academic student submission.`
    ];

    const totalPages = pages.length;
    const current = NoteNest.previewCurrentPage;

    const pageNum = document.getElementById('previewPageNum');
    const footerPage = document.getElementById('previewFooterPage');
    const psSub = document.getElementById('previewSheetSubject');
    const psUnit = document.getElementById('previewSheetUnit');
    const psContent = document.getElementById('previewSheetContent');

    if (pageNum) pageNum.textContent = current + 1;
    if (footerPage) footerPage.textContent = `${current + 1} of ${totalPages}`;
    if (psSub) psSub.textContent = note.subject.toUpperCase();
    if (psUnit) psUnit.textContent = `${note.type.toUpperCase()} • ${note.semester.toUpperCase()}`;
    if (psContent) psContent.textContent = pages[current];
  }

  function updateModalBookmarkBtn() {
    const bmBtn = document.getElementById('modalBookmarkBtn');
    const bmText = document.getElementById('modalBookmarkBtnText');
    if (!NoteNest.activeModalNote || !bmBtn) return;

    const isBookmarked = NoteNest.bookmarks.includes(NoteNest.activeModalNote.id);
    if (isBookmarked) {
      bmBtn.classList.add('btn-primary');
      bmBtn.classList.remove('btn-outline');
      if (bmText) bmText.textContent = "Bookmarked ✓";
    } else {
      bmBtn.classList.remove('btn-primary');
      bmBtn.classList.add('btn-outline');
      if (bmText) bmText.textContent = "Bookmark";
    }
  }

  function toggleBookmark(noteId, e) {
    if (e) e.stopPropagation();

    const idx = NoteNest.bookmarks.indexOf(noteId);
    let isAdded = false;

    if (idx > -1) {
      NoteNest.bookmarks.splice(idx, 1);
      isAdded = false;
    } else {
      NoteNest.bookmarks.push(noteId);
      isAdded = true;
    }

    StorageManager.saveBookmarks(NoteNest.bookmarks);
    updateModalBookmarkBtn();
    if (window.onBookmarksUpdate) window.onBookmarksUpdate();

    const note = NoteNest.notes.find(n => n.id === noteId);
    const title = note ? `"${note.title.substring(0, 24)}..."` : 'Note';

    if (isAdded) {
      showToast('Note Bookmarked! 🔖', `${title} saved to your dashboard bookmarks.`, 'success');
    } else {
      showToast('Bookmark Removed', `${title} removed from saved list.`, 'info');
    }
  }

  function downloadNote(noteId, e) {
    if (e) e.stopPropagation();

    const note = NoteNest.notes.find(n => n.id === noteId);
    if (!note) return;

    note.downloads = (note.downloads || 0) + 1;
    StorageManager.saveNotes(NoteNest.notes);
    StorageManager.addRecentView(noteId);

    if (window.onNotesUpdate) window.onNotesUpdate();

    const sampleText = `=======================================================\n` +
      `NOTENEST - STUDENTS STUDY NOTES SHARING PORTAL\n` +
      `=======================================================\n\n` +
      `Document Title : ${note.title}\n` +
      `Subject        : ${note.subject}\n` +
      `Department     : ${note.department}\n` +
      `Semester       : ${note.semester}\n` +
      `Type           : ${note.type}\n` +
      `Author         : ${note.uploader}\n` +
      `Rating         : ${note.rating} / 5.0\n` +
      `Total Downloads: ${note.downloads}\n\n` +
      `-------------------------------------------------------\n` +
      `DESCRIPTION & SCOPE:\n` +
      `-------------------------------------------------------\n` +
      `${note.description}\n\n` +
      `-------------------------------------------------------\n` +
      `SAMPLE LECTURE CONTENT & FORMULAS:\n` +
      `-------------------------------------------------------\n` +
      (note.previewPages ? note.previewPages.join("\n\n--- PAGE BREAK ---\n\n") : "Standard university syllabus notes.") +
      `\n\n=======================================================\n` +
      `© 2026 NoteNest. Share knowledge, learn together.\n` +
      `=======================================================`;

    const blob = new Blob([sampleText], { type: 'text/plain;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    const cleanFileName = (note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()) + `.${note.fileType || 'pdf'}.txt`;

    tempLink.href = blobUrl;
    tempLink.download = cleanFileName;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    URL.revokeObjectURL(blobUrl);

    showToast('Download Started! 📥', `Downloading "${note.title.substring(0, 30)}..."`, 'success');
  }

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showToast(title, message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3800);
  }

  /* --------------------------------------------------------------------------
     6. INITIALIZATION & EXPORTS
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupNavbar();
    setupAuthModal();
    setupNoteModal();
  });

  // Global window exposure
  window.NoteNest = NoteNest;
  window.showToast = showToast;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.createNoteCardHTML = createNoteCardHTML;

  window.app = {
    openNoteModal,
    toggleBookmark,
    downloadNote
  };

})();
