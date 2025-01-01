/**
 * Header Component
 * Modern and visually appealing header component for NdevuSpace website
 * with improved animations, transitions, and mobile responsiveness.
 */

function createHeader() {
  // Determine if we're on the home page or in a subfolder
  const isHomePage = !window.location.pathname.includes('/views/');
  const basePath = isHomePage ? './' : '../';
  
  // Determine current page for active navigation highlighting
  const currentPath = window.location.pathname;
  const isActive = (path) => {
    const checkPath = path.startsWith('#') 
      ? path 
      : path.includes('index.html') 
        ? 'index.html' 
        : path.split('/').pop();
    return currentPath.endsWith(checkPath) ? 'active-nav-item' : '';
  };

  // Create the header element with all necessary HTML
  const header = document.createElement('header');
  header.className = "fixed top-0 left-0 right-0 z-50 bg-header-bg bg-opacity-95 backdrop-blur-sm transition-all duration-300 border-b border-gray-800/50 shadow-lg py-3 px-4";
  header.id = "main-header";
  header.innerHTML = `
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <div class="flex items-center">
        <a href="${isHomePage ? 'index.html' : '../index.html'}" class="flex items-center group transition-all duration-300" aria-label="NdevuSpace Home">
          <div class="overflow-hidden rounded-lg mr-2 transform transition-all duration-300 group-hover:scale-105">
            <img src="${basePath}images/logo1.png" alt="NdevuSpace Logo" class="w-12 h-12 object-cover">
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transform transition-all duration-300 group-hover:from-yellow-300 group-hover:to-yellow-500">NdevuSpace</span>
        </a>
      </div>

      <div class="flex items-center gap-4">
        <!-- Theme Toggle -->
        <button id="theme-toggle" class="bg-secondary/50 p-2 rounded-full border border-gray-700 hover:border-yellow-500 transition-all duration-300" aria-label="Toggle theme">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Mobile Menu Button -->
        <div class="block lg:hidden">
          <button id="mobile-menu-button" class="flex items-center p-2 rounded-lg border border-gray-700 hover:border-yellow-500 bg-secondary/50 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-1">
          <a href="${basePath}views/skills.html" class="nav-link ${isActive('skills.html')}">Skills</a>
          <a href="${isHomePage ? '#aboutme' : '../index.html#aboutme'}" class="nav-link ${isActive('#aboutme')}">About</a>
          <a href="${basePath}views/blogs.html" class="nav-link ${isActive('blogs.html')}">Blogs</a>
          <a href="${isHomePage ? '#contactme' : '../index.html#contactme'}" class="nav-link ${isActive('#contactme')}">Contact</a>
          <a href="${basePath}views/projects.html" class="nav-link ${isActive('projects.html')}">Portfolio</a>
          <a href="${basePath}views/experience.html" class="nav-link ${isActive('experience.html')}">Experience</a>
        </nav>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div id="mobile-menu" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transform translate-x-full transition-transform duration-300 lg:hidden">
      <div class="h-full w-3/4 ml-auto bg-secondary border-l border-gray-800 overflow-y-auto">
        <div class="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 class="text-xl font-bold text-yellow-400">Menu</h2>
          <button id="close-menu" class="p-2 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav class="p-4 flex flex-col space-y-4">
          <a href="${isHomePage ? 'index.html' : '../index.html'}" class="mobile-nav-link ${isActive('index.html')}">Home</a>
          <a href="${basePath}views/skills.html" class="mobile-nav-link ${isActive('skills.html')}">Skills</a>
          <a href="${isHomePage ? '#aboutme' : '../index.html#aboutme'}" class="mobile-nav-link ${isActive('#aboutme')}">About</a>
          <a href="${basePath}views/blogs.html" class="mobile-nav-link ${isActive('blogs.html')}">Blogs</a>
          <a href="${isHomePage ? '#contactme' : '../index.html#contactme'}" class="mobile-nav-link ${isActive('#contactme')}">Contact</a>
          <a href="${basePath}views/projects.html" class="mobile-nav-link ${isActive('projects.html')}">Portfolio</a>
          <a href="${basePath}views/experience.html" class="mobile-nav-link ${isActive('experience.html')}">Experience</a>
        </nav>
      </div>
    </div>
  `;

  return header;
}

/**
 * Insert the header at the beginning of the body and add necessary styles
 */
function loadHeader() {
  // Add custom styles for the header
  addHeaderStyles();

  // Create and insert header
  const header = createHeader();
  document.body.insertBefore(header, document.body.firstChild);
  
  // Add padding to body to account for fixed header
  const headerHeight = header.offsetHeight;
  document.body.style.paddingTop = `${headerHeight}px`;
  
  // Set up theme toggle button functionality
  setupThemeToggle();
  
  // Set up mobile nav functionality
  setupMobileNav();

  // Set up scroll effects
  setupScrollEffects();
}

/**
 * Add custom styles needed for the header
 */
function addHeaderStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link {
      position: relative;
      padding: 0.5rem 1rem;
      font-weight: 500;
      transition: all 0.3s;
      border-radius: 0.375rem;
    }
    
    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #facc15;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: #facc15;
      transition: all 0.3s;
      transform: translateX(-50%);
    }
    
    .nav-link:hover::after {
      width: 60%;
    }
    
    .nav-link.active-nav-item {
      color: #facc15;
    }
    
    .nav-link.active-nav-item::after {
      width: 60%;
    }
    
    .mobile-nav-link {
      display: block;
      padding: 0.75rem;
      border-left: 3px solid transparent;
      transition: all 0.3s;
      font-weight: 500;
    }
    
    .mobile-nav-link:hover {
      background-color: rgba(255, 255, 255, 0.05);
      border-left-color: #facc15;
      color: #facc15;
      padding-left: 1rem;
    }
    
    .mobile-nav-link.active-nav-item {
      border-left-color: #facc15;
      color: #facc15;
      background-color: rgba(250, 204, 21, 0.1);
    }
    
    .header-scrolled {
      padding-top: 0.5rem !important;
      padding-bottom: 0.5rem !important;
      background-color: rgba(17, 17, 33, 0.98) !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Set up the theme toggle button functionality
 */
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      }
    });
    
    // Apply saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }
}

/**
 * Set up mobile navigation functionality
 */
function setupMobileNav() {
  const menuButton = document.getElementById('mobile-menu-button');
  const closeButton = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      mobileMenu.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (closeButton && mobileMenu) {
    closeButton.addEventListener('click', function() {
      mobileMenu.classList.add('translate-x-full');
      document.body.style.overflow = '';
    });
  }
  
  // Close mobile menu when clicking on a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Set up scroll effects for the header
 */
function setupScrollEffects() {
  const header = document.getElementById('main-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolled down
    if (scrollTop > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
}

// Load header when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadHeader);