/**
 * Dashboard-specific pagination configuration
 * Provides a consistent pagination interface across dashboard pages
 */

/**
 * Creates a standard dashboard pagination component
 * @param {string|HTMLElement} container - Container for the pagination
 * @param {Object} options - Pagination configuration
 * @returns {PaginationComponent|null} Pagination instance or null
 */
function createDashboardPagination(container, options = {}) {
  // Default dashboard pagination options
  const dashboardOptions = {
    theme: 'dashboard',
    size: 'medium',
    align: 'center',
    withText: window.innerWidth > 640, // Only show text on larger screens
    ...options
  };
  
  // Create the pagination
  return createPagination(container, dashboardOptions);
}

/**
 * Creates paginated table controls with items per page selector
 * @param {string|HTMLElement} container - Container for the pagination controls
 * @param {Object} options - Configuration options
 * @param {Function} onChange - Callback when page or items per page changes
 */
function createTablePagination(container, options = {}, onChange) {
  const targetContainer = typeof container === 'string' 
    ? document.querySelector(container) 
    : container;
    
  if (!targetContainer) {
    console.error('Table pagination container not found');
    return;
  }
  
  // Clear container
  targetContainer.innerHTML = '';
  
  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-center justify-between flex-wrap gap-4 mt-6';
  
  // Items per page selector
  const pageSizeOptions = options.pageSizeOptions || [10, 25, 50, 100];
  const currentPageSize = options.pageSize || 10;
  
  const perPageContainer = document.createElement('div');
  perPageContainer.className = 'flex items-center gap-2';
  
  const perPageLabel = document.createElement('span');
  perPageLabel.className = 'text-sm text-gray-400';
  perPageLabel.textContent = 'Items per page:';
  perPageContainer.appendChild(perPageLabel);
  
  const perPageSelect = document.createElement('select');
  perPageSelect.className = 'bg-primary/50 text-white border border-gray-700 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500';
  
  pageSizeOptions.forEach(size => {
    const option = document.createElement('option');
    option.value = size;
    option.textContent = size;
    option.selected = size === currentPageSize;
    perPageSelect.appendChild(option);
  });
  
  perPageSelect.addEventListener('change', (e) => {
    if (onChange) {
      onChange({
        page: 1, // Reset to first page when changing items per page
        pageSize: parseInt(e.target.value, 10)
      });
    }
  });
  
  perPageContainer.appendChild(perPageSelect);
  wrapper.appendChild(perPageContainer);
  
  // Pagination container
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination-container';
  wrapper.appendChild(paginationContainer);
  
  // Add to main container
  targetContainer.appendChild(wrapper);
  
  // Create the pagination and handle page changes
  const pagination = createDashboardPagination(paginationContainer, {
    ...options,
    onPageChange: (page) => {
      if (onChange) {
        onChange({ page, pageSize: options.pageSize });
      }
    }
  });
  
  return {
    pagination,
    update: (newOptions) => {
      return updatePagination(pagination, newOptions, paginationContainer);
    }
  };
}

// Export for use as a module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    createDashboardPagination,
    createTablePagination
  };
}
