/**
 * Blog Detail Page Functionality
 * Handles table of contents, scroll highlighting, and sharing features
 */

document.addEventListener('DOMContentLoaded', function() {
  initTableOfContents();
  setupCopyLinkButton();
});

/**
 * Initialize table of contents functionality
 * - Adds IDs to headings
 * - Sets up click navigation
 * - Highlights current section on scroll
 */
function initTableOfContents() {
  // Handle TOC link click and active state
  const tocLinks = document.querySelectorAll('.toc a');
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(target);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add IDs to heading elements for TOC links
  const articleContent = document.querySelector('.prose');
  if (articleContent) {
    const headings = articleContent.querySelectorAll('h2, h3');
    
    headings.forEach(heading => {
      const id = heading.textContent.toLowerCase().replace(/[^\w]+/g, '-');
      heading.id = id;
    });
    
    // Highlight active section in TOC on scroll
    const observerOptions = {
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            link.classList.remove('text-yellow-400', 'border-yellow-400');
            link.classList.add('text-gray-300', 'border-gray-700');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.remove('text-gray-300', 'border-gray-700');
              link.classList.add('text-yellow-400', 'border-yellow-400');
            }
          });
        }
      });
    }, observerOptions);
    
    headings.forEach(heading => {
      observer.observe(heading);
    });
  }
}

/**
 * Set up copy link button functionality
 */
function setupCopyLinkButton() {
  const copyLinkButton = document.querySelector('button[title="Copy link to clipboard"]');
  if (copyLinkButton) {
    copyLinkButton.addEventListener('click', function() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        // Visual feedback for copy success
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        `;
        setTimeout(() => {
          this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          `;
        }, 2000);
      });
    });
  }
}
