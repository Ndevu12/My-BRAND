/**
 * Table of Contents Utilities
 * Utility functions for handling table of contents functionality
 */

/**
 * Generate table of contents from article headings
 */
export function generateTableOfContents() {
  const tocNavContainer = document.querySelector('.toc');
  if (!tocNavContainer) return;
  
  const articleContent = document.querySelector('.blog-content');
  if (!articleContent) return;
  
  const headings = articleContent.querySelectorAll('h2, h3');
  
  if (headings.length === 0) {
    // Hide TOC if no headings
    const tocSection = tocNavContainer.closest('.toc-container');
    if (tocSection) tocSection.style.display = 'none';
    return;
  }
  
  // Clear existing TOC content
  tocNavContainer.innerHTML = '';
  
  // Generate TOC entries
  headings.forEach(heading => {
    // Ensure each heading has an ID
    if (!heading.id) {
      heading.id = heading.textContent.toLowerCase().replace(/[^\w]+/g, '-');
    }
    
    const isMainHeading = heading.tagName.toLowerCase() === 'h2';
    const isSubHeading = heading.tagName.toLowerCase() === 'h3';
    
    // Create TOC item
    const tocItem = document.createElement('a');
    tocItem.href = `#${heading.id}`;
    
    if (isMainHeading) {
      tocItem.className = 'block pl-4 text-gray-300 hover:text-yellow-400 transition-colors border-l-2 border-gray-700 hover:border-yellow-400 py-1';
      tocItem.textContent = heading.textContent;
      tocNavContainer.appendChild(tocItem);
    } else if (isSubHeading) {
      tocItem.className = 'block pl-6 text-gray-300 hover:text-yellow-400 transition-colors border-l-2 border-gray-700 hover:border-yellow-400 py-1 text-sm';
      tocItem.textContent = heading.textContent;
      tocNavContainer.appendChild(tocItem);
    }
  });
}

/**
 * Initialize table of contents functionality
 */
export function initTableOfContents() {
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
        
        // On mobile, collapse TOC after clicking a link
        if (window.innerWidth < 1024) { // lg breakpoint in Tailwind
          const tocContent = document.querySelector('.toc-content');
          if (tocContent && !tocContent.classList.contains('hidden')) {
            toggleToc();
          }
        }
      }
    });
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
          // Remove active class from all links
          link.classList.remove('text-yellow-400', 'border-yellow-400');
          link.classList.add('text-gray-300', 'border-gray-700');
          
          // Add active class to the current section's link
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.remove('text-gray-300', 'border-gray-700');
            link.classList.add('text-yellow-400', 'border-yellow-400');
          }
        });
      }
    });
  }, observerOptions);
  
  // Observe all headings in the article
  const articleContent = document.querySelector('.blog-content');
  if (articleContent) {
    const headings = articleContent.querySelectorAll('h2, h3');
    headings.forEach(heading => {
      observer.observe(heading);
    });
  }
  
  // Initialize TOC toggle functionality
  setupTocToggle();
}

/**
 * Setup toggle functionality for Table of Contents
 */
export function setupTocToggle() {
  const tocToggle = document.getElementById('toc-toggle');
  if (!tocToggle) return;
  
  // Add click event listener to the toggle button
  tocToggle.addEventListener('click', toggleToc);
  
  // Set initial state - always collapsed on page load
  const tocContent = document.querySelector('.toc-content');
  const expandIcon = document.querySelector('.toc-expand-icon');
  const collapseIcon = document.querySelector('.toc-collapse-icon');
  
  if (tocContent && expandIcon && collapseIcon) {
    // Make sure TOC is collapsed by default
    tocContent.classList.add('hidden');
    expandIcon.classList.remove('hidden');
    collapseIcon.classList.add('hidden');
  }
}

/**
 * Toggle the TOC visibility
 */
export function toggleToc() {
  const tocContent = document.querySelector('.toc-content');
  const expandIcon = document.querySelector('.toc-expand-icon');
  const collapseIcon = document.querySelector('.toc-collapse-icon');
  
  if (tocContent && expandIcon && collapseIcon) {
    // Toggle visibility
    tocContent.classList.toggle('hidden');
    
    // Toggle icons
    expandIcon.classList.toggle('hidden');
    collapseIcon.classList.toggle('hidden');
  }
}
