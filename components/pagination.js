/**
 * Pagination Component
 * A reusable pagination component for NdevuSpace website
 * with customizable appearance and functionality
 */

/**
 * Creates a pagination component with the specified options
 * @param {Object} options - Configuration options
 * @param {number} options.currentPage - Current active page (default: 1)
 * @param {number} options.totalPages - Total number of pages (default: 1)
 * @param {string} options.containerClass - Additional CSS classes for the container (optional)
 * @param {Function} options.onPageChange - Callback function when page changes (optional)
 * @returns {HTMLElement} The pagination component element
 */
function createPagination(options = {}) {
  // Set default options
  const config = {
    currentPage: options.currentPage || 1,
    totalPages: options.totalPages || 1,
    containerClass: options.containerClass || '',
    onPageChange: options.onPageChange || function(page) { console.log(`Page changed to ${page}`); }
  };

  // Create the pagination container
  const paginationContainer = document.createElement('div');
  paginationContainer.className = `flex justify-center items-center gap-2 my-8 ${config.containerClass}`;
  
  // Previous page button
  const prevButton = document.createElement('button');
  prevButton.className = `pagination-btn ${config.currentPage <= 1 ? 'disabled opacity-50 cursor-not-allowed' : 'hover:border-yellow-400 bg-secondary border border-gray-700'}`;
  prevButton.title = "Previous page";
  prevButton.setAttribute('aria-label', 'Go to previous page');
  prevButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  `;
  if (config.currentPage > 1) {
    prevButton.addEventListener('click', () => config.onPageChange(config.currentPage - 1));
  }
  paginationContainer.appendChild(prevButton);

  // Generate page buttons
  const createPageButton = (pageNum) => {
    const button = document.createElement('button');
    button.className = `pagination-btn ${pageNum === config.currentPage ? 'active bg-yellow-500 text-black' : 'hover:border-yellow-400 bg-secondary border border-gray-700'}`;
    button.textContent = pageNum;
    button.addEventListener('click', () => config.onPageChange(pageNum));
    return button;
  };

  // Add page numbers with ellipsis for many pages
  if (config.totalPages <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= config.totalPages; i++) {
      paginationContainer.appendChild(createPageButton(i));
    }
  } else {
    // Show first page
    paginationContainer.appendChild(createPageButton(1));
    
    // Show ellipsis or pages
    if (config.currentPage > 3) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'text-gray-500 mx-1';
      ellipsis.textContent = '...';
      paginationContainer.appendChild(ellipsis);
    } else {
      paginationContainer.appendChild(createPageButton(2));
    }

    // Middle pages
    let startPage = Math.max(2, config.currentPage - 1);
    let endPage = Math.min(config.totalPages - 1, config.currentPage + 1);
    
    // Adjust if current page is near beginning or end
    if (config.currentPage <= 3) {
      endPage = Math.min(4, config.totalPages - 1);
    }
    if (config.currentPage >= config.totalPages - 2) {
      startPage = Math.max(config.totalPages - 3, 2);
    }

    // Add middle page buttons
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== config.totalPages) {
        paginationContainer.appendChild(createPageButton(i));
      }
    }

    // Show ellipsis or pages
    if (config.currentPage < config.totalPages - 2) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'text-gray-500 mx-1';
      ellipsis.textContent = '...';
      paginationContainer.appendChild(ellipsis);
    }

    // Show last page
    if (config.totalPages > 1) {
      paginationContainer.appendChild(createPageButton(config.totalPages));
    }
  }

  // Next page button
  const nextButton = document.createElement('button');
  nextButton.className = `pagination-btn ${config.currentPage >= config.totalPages ? 'disabled opacity-50 cursor-not-allowed' : 'hover:border-yellow-400 bg-secondary border border-gray-700'}`;
  nextButton.title = "Next page";
  nextButton.setAttribute('aria-label', 'Go to next page');
  nextButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  `;
  if (config.currentPage < config.totalPages) {
    nextButton.addEventListener('click', () => config.onPageChange(config.currentPage + 1));
  }
  paginationContainer.appendChild(nextButton);

  return paginationContainer;
}

/**
 * Insert a pagination component into the specified container
 * @param {string|HTMLElement} container - Container element or selector
 * @param {Object} options - Pagination options
 */
function insertPagination(container, options = {}) {
  const targetContainer = typeof container === 'string' 
    ? document.querySelector(container) 
    : container;
  
  if (!targetContainer) {
    console.error('Pagination container not found');
    return;
  }
  
  const pagination = createPagination(options);
  
  // Clear the container before inserting
  if (options.clearContainer !== false) {
    targetContainer.innerHTML = '';
  }
  
  targetContainer.appendChild(pagination);
}

/**
 * Add the necessary styles for the pagination component
 */
function addPaginationStyles() {
  // Only add styles once
  if (document.getElementById('pagination-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'pagination-styles';
  style.textContent = `
    .pagination-btn {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
    }
    
    .pagination-btn:not(.disabled):hover {
      border-color: #facc15;
      color: #facc15;
    }
    
    .pagination-btn.active {
      background-color: #facc15;
      color: #000000;
    }
  `;
  
  document.head.appendChild(style);
}

// Add styles when the script is loaded
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', addPaginationStyles);
}
