/**
 * UI Interaction Utilities for Blog Page
 */

/**
 * Setup search functionality for the blog page
 * @param {Function} onSearch - Callback when search is performed
 * @returns {void}
 */
export function setupSearch(onSearch) {
  const searchInput = document.querySelector('input[placeholder*="Search articles"]');
  const searchButton = searchInput?.nextElementSibling;
  
  if (!searchInput || !searchButton || typeof onSearch !== 'function') {
    return;
  }
  
  // Handle search button click
  searchButton.addEventListener('click', function() {
    performSearch();
  });
  
  // Handle enter key press in search input
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  function performSearch() {
    const searchQuery = searchInput.value.trim();
    if (searchQuery.length > 0) {
      onSearch(searchQuery);
    }
  }
}

/**
 * Set up the load more button functionality
 * @param {HTMLElement} button - The load more button element
 * @param {Function} onLoadMore - Callback when the button is clicked
 * @returns {void}
 */
export function setupLoadMoreButton(button, onLoadMore) {
  if (!button || typeof onLoadMore !== 'function') {
    return;
  }
  
  button.addEventListener('click', function() {
    // Show loading state
    const originalText = this.innerHTML;
    this.innerHTML = `
      <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
      Loading...
    `;
    this.disabled = true;
    
    // Simulate network delay for better UX
    setTimeout(() => {
      onLoadMore();
    }, 400);
  });
}

/**
 * Update load more button state
 * @param {HTMLElement} button - The load more button
 * @param {HTMLElement} container - The container element
 * @param {number} remainingCount - Number of remaining items 
 */
export function updateLoadMoreButton(button, container, remainingCount) {
  if (!button || !container) return;
  
  if (remainingCount > 0) {
    // Show load more button
    container.classList.remove('hidden');
    
    // Update button text to show remaining count
    button.innerHTML = `Load More (${remainingCount})`;
    button.disabled = false;
  } else {
    // Hide load more button
    container.classList.add('hidden');
  }
}

/**
 * Get current category filter from active tab
 * @returns {string} - Current category ID or empty string
 */
export function getCurrentCategoryFilter() {
  const activeTab = document.querySelector('.category-tab span.bg-yellow-500');
  const parentTab = activeTab ? activeTab.closest('.category-tab') : null;
  return parentTab ? parentTab.dataset.category : '';
}

/**
 * Initialize categories using the CategoryManager
 * @param {Function} onCategoryChange - Callback when category is changed
 * @returns {void}
 */
export function initializeCategories(onCategoryChange) {
  // Check if CategoryManager is loaded
  if (!window.categoryManager || typeof onCategoryChange !== 'function') {
    console.warn('CategoryManager not loaded or callback missing. Categories will not be displayed correctly.');
    return;
  }
  
  const categoryTabsContainer = document.getElementById('category-tabs');
  if (!categoryTabsContainer) return;
  // Wait for CategoryManager to be initialized
  const waitForCategories = () => {
    if (window.categoryManager.isReady()) {
      renderCategoryTabs();
    } else {
      // Check again after a short delay
      setTimeout(waitForCategories, 100);
    }
  };

  const renderCategoryTabs = () => {
    // Get current category filter from URL if any
    const urlParams = new URLSearchParams(window.location.search);
    const activeCategory = urlParams.get('category') || '';
    
    // Render the category tabs
    window.categoryManager.renderCategoryTabs('category-tabs', activeCategory, function(categoryId) {
      // This callback is triggered when a category tab is clicked
      
      // Update URL to reflect the filter
      const url = new URL(window.location);
      if (categoryId) {
        url.searchParams.set('category', categoryId);
      } else {
        url.searchParams.delete('category');
      }
      window.history.pushState({}, '', url);
      
      // Call the provided callback
      onCategoryChange(categoryId);
    });
  };

  // Start waiting for categories to be ready
  waitForCategories();
}
