/**
 * Enhanced Pagination Component
 * A highly configurable and accessible pagination component for NdevuSpace
 */

class PaginationComponent {
  constructor(options = {}) {
    // Core pagination properties
    this.currentPage = options.currentPage || 1;
    this.totalPages = options.totalPages || 1;
    this.pageSize = options.pageSize || 10;
    this.totalItems = options.totalItems || 0;
    
    // Appearance and behavior options
    this.containerClass = options.containerClass || '';
    this.theme = options.theme || 'default'; // 'default', 'minimal', 'rounded', 'dashboard'
    this.size = options.size || 'medium'; // 'small', 'medium', 'large'
    this.withText = options.withText !== false; // Show "Previous" and "Next" text
    this.showTotal = options.showTotal !== false;
    this.align = options.align || 'center'; // 'left', 'center', 'right'
    this.maxVisiblePages = options.maxVisiblePages || 7;
    
    // Callbacks
    this.onPageChange = options.onPageChange || function(page) { 
      console.log(`Page changed to ${page}`); 
    };
    
    // Calculate total pages if we have totalItems and pageSize
    if (this.totalItems && this.pageSize) {
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    }
    
    // Ensure current page is in range
    this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));
  }
  
  // Get theme-specific classes
  getThemeClasses() {
    const themes = {
      default: {
        container: 'py-4',
        button: 'px-3 py-1.5 bg-secondary border border-gray-700 hover:border-yellow-400 rounded-lg mx-1',
        active: 'bg-yellow-500 text-gray-900 border-yellow-500',
        disabled: 'opacity-50 cursor-not-allowed',
      },
      minimal: {
        container: 'py-3',
        button: 'px-3 py-1.5 hover:bg-secondary rounded-md mx-0.5',
        active: 'bg-secondary font-medium text-yellow-400',
        disabled: 'opacity-40 cursor-not-allowed',
      },
      rounded: {
        container: 'py-4',
        button: 'h-10 w-10 flex items-center justify-center rounded-full border border-gray-700 hover:border-yellow-400 mx-1',
        active: 'bg-yellow-500 text-gray-900 border-yellow-500',
        disabled: 'opacity-50 cursor-not-allowed',
      },
      dashboard: {
        container: 'py-2',
        button: 'px-3 py-1.5 bg-primary/50 text-white rounded border border-gray-700 hover:bg-gray-700/50 mx-1',
        active: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/20',
        disabled: 'opacity-50 cursor-not-allowed',
      }
    };
    
    return themes[this.theme] || themes.default;
  }
  
  // Get size-related classes
  getSizeClasses() {
    const sizes = {
      small: {
        text: 'text-xs',
        container: 'gap-1',
      },
      medium: {
        text: 'text-sm',
        container: 'gap-2', 
      },
      large: {
        text: 'text-base',
        container: 'gap-3',
      }
    };
    
    return sizes[this.size] || sizes.medium;
  }
  
  // Get alignment classes
  getAlignmentClass() {
    const alignments = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };
    
    return alignments[this.align] || alignments.center;
  }
  
  // Generate pagination HTML
  render() {
    // No pagination needed if there's only one page
    if (this.totalPages <= 1) {
      return null;
    }
    
    const themeClasses = this.getThemeClasses();
    const sizeClasses = this.getSizeClasses();
    
    // Create container
    const container = document.createElement('div');
    container.className = `flex items-center ${this.getAlignmentClass()} ${sizeClasses.container} ${themeClasses.container} ${this.containerClass}`;
    
    // Previous button
    const prevButton = this.createButton({
      content: this.withText ? 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg><span class="ml-1">Previous</span>` :
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`,
      isDisabled: this.currentPage <= 1,
      onClick: () => this.goToPage(this.currentPage - 1),
      ariaLabel: 'Go to previous page',
      classes: `flex items-center ${sizeClasses.text}`
    });
    container.appendChild(prevButton);
    
    // Page number buttons
    const pages = this.getVisiblePages();
    
    // First page
    if (pages[0] > 1) {
      container.appendChild(this.createButton({
        content: '1',
        isActive: this.currentPage === 1,
        onClick: () => this.goToPage(1),
        ariaLabel: 'Go to page 1',
        classes: sizeClasses.text
      }));
      
      // Show ellipsis if needed
      if (pages[0] > 2) {
        container.appendChild(this.createEllipsis());
      }
    }
    
    // Page numbers
    pages.forEach(page => {
      container.appendChild(this.createButton({
        content: page.toString(),
        isActive: this.currentPage === page,
        onClick: () => this.goToPage(page),
        ariaLabel: `Go to page ${page}`,
        classes: sizeClasses.text
      }));
    });
    
    // Last page
    if (pages[pages.length - 1] < this.totalPages) {
      // Show ellipsis if needed
      if (pages[pages.length - 1] < this.totalPages - 1) {
        container.appendChild(this.createEllipsis());
      }
      
      container.appendChild(this.createButton({
        content: this.totalPages.toString(),
        isActive: this.currentPage === this.totalPages,
        onClick: () => this.goToPage(this.totalPages),
        ariaLabel: `Go to page ${this.totalPages}`,
        classes: sizeClasses.text
      }));
    }
    
    // Next button
    const nextButton = this.createButton({
      content: this.withText ? 
        `<span class="mr-1">Next</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>` :
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>`,
      isDisabled: this.currentPage >= this.totalPages,
      onClick: () => this.goToPage(this.currentPage + 1),
      ariaLabel: 'Go to next page',
      classes: `flex items-center ${sizeClasses.text}`
    });
    container.appendChild(nextButton);
    
    // Results summary
    if (this.showTotal && this.totalItems) {
      const start = ((this.currentPage - 1) * this.pageSize) + 1;
      const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
      
      const summary = document.createElement('div');
      summary.className = `text-gray-400 ml-4 ${sizeClasses.text}`;
      summary.innerHTML = `Showing <span class="font-medium">${start}</span> to <span class="font-medium">${end}</span> of <span class="font-medium">${this.totalItems}</span>`;
      container.appendChild(summary);
    }
    
    return container;
  }
  
  // Create button element
  createButton({ content, isActive = false, isDisabled = false, onClick, ariaLabel, classes = '' }) {
    const themeClasses = this.getThemeClasses();
    
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = content;
    button.className = `
      transition-colors duration-200
      ${themeClasses.button}
      ${isActive ? themeClasses.active : ''}
      ${isDisabled ? themeClasses.disabled : ''}
      ${classes}
    `.trim().replace(/\s+/g, ' ');
    
    button.setAttribute('aria-label', ariaLabel);
    button.setAttribute('aria-current', isActive ? 'page' : 'false');
    
    if (isDisabled) {
      button.disabled = true;
      button.setAttribute('aria-disabled', 'true');
    } else {
      button.addEventListener('click', onClick);
    }
    
    return button;
  }
  
  // Create ellipsis element
  createEllipsis() {
    const themeClasses = this.getThemeClasses();
    const sizeClasses = this.getSizeClasses();
    
    const ellipsis = document.createElement('span');
    ellipsis.className = `text-gray-500 mx-1 ${sizeClasses.text}`;
    ellipsis.textContent = '...';
    ellipsis.setAttribute('aria-hidden', 'true');
    
    return ellipsis;
  }
  
  // Calculate which page numbers should be visible
  getVisiblePages() {
    if (this.totalPages <= this.maxVisiblePages) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
    
    const halfVisible = Math.floor(this.maxVisiblePages / 2);
    
    // If current page is near the beginning
    if (this.currentPage <= halfVisible + 1) {
      return Array.from({ length: this.maxVisiblePages - 2 }, (_, i) => i + 2);
    }
    
    // If current page is near the end
    if (this.currentPage >= this.totalPages - halfVisible) {
      return Array.from(
        { length: this.maxVisiblePages - 2 }, 
        (_, i) => this.totalPages - this.maxVisiblePages + i + 3
      );
    }
    
    // Current page is in the middle
    return Array.from(
      { length: this.maxVisiblePages - 2 },
      (_, i) => this.currentPage - halfVisible + i + (this.maxVisiblePages % 2 === 0 ? 1 : 0)
    );
  }
  
  // Go to specific page
  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    
    this.currentPage = page;
    this.onPageChange(page);
  }
}

/**
 * Create a pagination component and insert it into the DOM
 * @param {string|HTMLElement} container - Target container element or selector
 * @param {Object} options - Pagination configuration options
 */
function createPagination(container, options = {}) {
  const targetContainer = typeof container === 'string' 
    ? document.querySelector(container) 
    : container;
  
  if (!targetContainer) {
    console.error('Pagination container not found');
    return;
  }
  
  // Clear container if requested (default is true)
  if (options.clearContainer !== false) {
    targetContainer.innerHTML = '';
  }
  
  // Create the pagination component
  const pagination = new PaginationComponent(options);
  const paginationElement = pagination.render();
  
  // Only append if pagination is needed (more than one page)
  if (paginationElement) {
    targetContainer.appendChild(paginationElement);
    return pagination; // Return instance for potential future updates
  }
  
  return null;
}

/**
 * Update an existing pagination component with new options
 * @param {PaginationComponent} instance - The pagination instance to update
 * @param {Object} newOptions - New options to apply
 * @param {string|HTMLElement} container - Container to re-render into
 */
function updatePagination(instance, newOptions = {}, container) {
  if (!instance || !(instance instanceof PaginationComponent)) {
    console.error('Invalid pagination instance');
    return;
  }
  
  // Update instance properties
  Object.keys(newOptions).forEach(key => {
    instance[key] = newOptions[key];
  });
  
  // Re-calculate total pages if totalItems or pageSize was updated
  if (newOptions.totalItems || newOptions.pageSize) {
    instance.totalPages = Math.ceil(instance.totalItems / instance.pageSize);
  }
  
  // Ensure current page is still valid
  instance.currentPage = Math.max(1, Math.min(instance.currentPage, instance.totalPages));
  
  // Re-render the pagination if container provided
  if (container) {
    const targetContainer = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;
      
    if (targetContainer) {
      targetContainer.innerHTML = '';
      const paginationElement = instance.render();
      if (paginationElement) {
        targetContainer.appendChild(paginationElement);
      }
    }
  }
  
  return instance;
}

// Add the necessary styles on load
function addPaginationStyles() {
  if (document.getElementById('pagination-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'pagination-styles';
  style.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    .pagination-loading {
      animation: pulse 1.5s infinite;
    }
  `;
  
  document.head.appendChild(style);
}

// Initialize styles when script is loaded
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', addPaginationStyles);
}

// Export for use as a module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    createPagination, 
    updatePagination,
    PaginationComponent
  };
}
