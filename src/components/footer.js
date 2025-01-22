/**
 * Footer Component
 * Modern and visually appealing footer component for NdevuSpace website
 * with improved animations, transitions, and mobile responsiveness.
 */

function createFooter() {
  // Get the current location
  const currentLocation = window.location;
  const path = currentLocation.pathname;
  
  // Determine if we're on the home page or in a subfolder
  const isHomePage = path === '/' || 
                     path.endsWith('index.html') || 
                     path.endsWith('My-BRAND/') || 
                     path === '/My-BRAND';
  
  // Check if we're in a specific subdirectory
  const isInSrcPages = path.includes('/src/pages/');
  const isInViews = path.includes('/views/');
  
  // Compute relative paths based on current location
  let homePath = '';
  let pagesPath = '';
  let imgPath = '';
  
  if (isHomePage) {
    // On home page
    homePath = './index.html';
    pagesPath = './src/pages/';
    imgPath = './src/images/';
  } else if (isInSrcPages) {
    // In src/pages directory
    homePath = '../../index.html';
    pagesPath = './';
    imgPath = '../images/';
  } else if (isInViews) {
    // In views directory
    homePath = '../index.html';
    pagesPath = '../src/pages/';
    imgPath = '../src/images/';
  } else {
    // Default fallback
    homePath = './index.html';
    pagesPath = './src/pages/';
    imgPath = './src/images/';
  }

  // Create the footer element with all necessary HTML
  const footer = document.createElement('footer');
  footer.className = "bg-footer-bg pt-16 pb-8 border-t border-gray-800/50 relative mt-20";
  footer.id = "main-footer";
  footer.innerHTML = `
    <!-- Wave SVG for top decoration -->
    <div class="absolute top-0 left-0 w-full overflow-hidden leading-0 transform translate-y-[-85%] rotate-180">
      <svg class="relative block w-full h-[50px] md:h-[70px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="fill-current text-footer-bg"></path>
      </svg>
    </div>

    <div class="max-w-6xl mx-auto px-4">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
        <!-- Column 1: Logo and About -->
        <div class="flex flex-col items-center md:items-start space-y-4">
          <a href="${homePath}" class="flex items-center group mb-4 transition-all duration-300" aria-label="NdevuSpace Home">
            <div class="overflow-hidden rounded-lg mr-3 transform transition-all duration-300 group-hover:scale-105">
              <img src="${imgPath}logo1.png" alt="NdevuSpace Logo" class="w-14 h-14 object-cover">
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-yellow-500 transition-all duration-300">NdevuSpace</span>
          </a>
          <p class="text-gray-400 leading-relaxed text-center md:text-left">
            Transforming ideas into elegant code and creating digital experiences that inspire and engage.
          </p>
          <div class="flex gap-5 mt-4">
            <a href="https://www.linkedin.com/in/jean-paul-elisa" class="footer-social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://github.com/Ndevu12" class="footer-social-link" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="mailto:contact@ndevuspace.com" class="footer-social-link" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Column 2: Quick Links -->
        <div>
          <h3 class="text-xl font-bold mb-5 relative inline-block">
            <span class="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Quick Links</span>
            <span class="absolute left-0 bottom-0 w-2/3 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500"></span>
          </h3>
          <ul class="space-y-3 footer-links">
            <li>
              <a href="${homePath}">Home</a>
            </li>
            <li>
              <a href="${pagesPath}skills.html">Skills</a>
            </li>
            <li>
              <a href="${pagesPath}projects.html">Projects</a>
            </li>
            <li>
              <a href="${pagesPath}blogs.html">Blogs</a>
            </li>
            <li>
              <a href="${homePath}#contactme">Contact</a>
            </li>
            <li>
              <a href="${pagesPath}experience.html">Experience</a>
            </li>
          </ul>
        </div>
        
        <!-- Column 3: Contact Info -->
        <div>
          <h3 class="text-xl font-bold mb-5 relative inline-block">
            <span class="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Contact Info</span>
            <span class="absolute left-0 bottom-0 w-2/3 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500"></span>
          </h3>
          <ul class="space-y-4">
            <li class="flex items-start">
              <div class="text-yellow-400 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span class="text-gray-400">Gikondo, Kigali, Rwanda</span>
            </li>
            <li class="flex items-start">
              <div class="text-yellow-400 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a href="mailto:contact@ndevuspace.com" class="text-gray-400 hover:text-yellow-400 transition-colors">contact@ndevuspace.com</a>
            </li>
            <li class="flex items-start">
              <div class="text-yellow-400 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span class="text-gray-400">+250 788 123 456</span>
            </li>
          </ul>
          
          <!-- Newsletter Form -->
          <div class="mt-6">
            <h4 class="text-lg font-semibold mb-3 text-gray-300">Subscribe to Newsletter</h4>
            <form class="flex">
              <input type="email" placeholder="Your email" class="bg-secondary/70 text-gray-200 px-3 py-2 rounded-l-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-400 w-full" required>
              <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-black px-4 rounded-r-md transition-colors duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Footer Bottom -->
      <div class="pt-6 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; ${new Date().getFullYear()} NdevuSpace | <a href="${pagesPath}signin.html" class="text-gray-500 hover:text-yellow-400 transition-colors">Ndevu</a> | All rights reserved
          </p>
          <p class="text-sm text-gray-500">
            Full Stack Software Developer | <span class="text-yellow-500">Gikondo-Kigali</span>
          </p>
        </div>
      </div>
    </div>
  `;

  return footer;
}

/**
 * Insert the footer at the end of the body and add necessary styles
 */
function loadFooter() {
  // Add custom styles for the footer
  addFooterStyles();
  
  // Create and insert footer
  const footer = createFooter();
  document.body.appendChild(footer);
  
  // Add scroll-to-top button
  addScrollToTopButton();
  
  // Set up newsletter form
  setupNewsletterForm();
}

/**
 * Add custom styles needed for the footer
 */
function addFooterStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .footer-social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.05);
      color: #facc15;
      transition: all 0.3s;
    }
    
    .footer-social-link:hover {
      background-color: #facc15;
      color: #111111;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(250, 204, 21, 0.4);
    }
    
    .footer-links a {
      color: #9ca3af;
      transition: all 0.3s;
      position: relative;
      display: inline-block;
      padding-left: 1rem;
    }
    
    .footer-links a::before {
      content: '→';
      position: absolute;
      left: 0;
      opacity: 0;
      transition: all 0.3s;
    }
    
    .footer-links a:hover {
      color: #facc15;
      padding-left: 1.5rem;
    }
    
    .footer-links a:hover::before {
      opacity: 1;
    }
    
    .scroll-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: #facc15;
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s;
      box-shadow: 0 4px 14px rgba(250, 204, 21, 0.5);
      z-index: 40;
    }
    
    .scroll-to-top.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .scroll-to-top:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(250, 204, 21, 0.7);
    }
    
    /* Light theme footer styles */
    body.light-theme .footer-social-link {
      background-color: rgba(0, 0, 0, 0.1);
      color: #d97706;
    }
    
    body.light-theme .footer-social-link:hover {
      background-color: #d97706;
      color: #ffffff;
      box-shadow: 0 5px 15px rgba(217, 119, 6, 0.4);
    }
    
    body.light-theme .footer-links a::before {
      color: #d97706;
    }
    
    body.light-theme .footer-links a:hover {
      color: #d97706;
    }
    
    /* Ensure the wave stays the right color in light theme */
    body.light-theme #main-footer .fill-current.text-footer-bg {
      fill: #1f2937;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Add a scroll-to-top button to the page
 */
function addScrollToTopButton() {
  const scrollButton = document.createElement('button');
  scrollButton.className = 'scroll-to-top';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  scrollButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  `;
  document.body.appendChild(scrollButton);
  
  // Show/hide scroll button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });
  
  // Scroll to top when clicked
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Set up newsletter form functionality
 */
function setupNewsletterForm() {
  const form = document.querySelector('#main-footer form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target.querySelector('input[type="email"]').value;
      if (email) {
        // Here you would typically send this to your backend
        alert(`Thank you for subscribing with: ${email}`);
        e.target.reset();
      }
    });
  }
}

// Load footer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadFooter);
