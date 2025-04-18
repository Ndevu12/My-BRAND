/**
 * Content Loader Utility
 * Provides reusable functions for implementing "Load More" functionality
 * across different pages of the website.
 */

import { scrollToNewContent } from './scrollHelper.js';

/**
 * Creates and manages a load more button for paginated content display
 * 
 * @param {Object} options Configuration options
 * @param {string} options.containerId ID of the container that holds the content items
 * @param {string} options.buttonId ID of the load more button
 * @param {Array} options.items The full array of items to be paginated
 * @param {number} options.itemsPerPage Number of items to show per "page" load
 * @param {Function} options.renderItem Function that renders a single item and returns an HTML element
 * @param {Function} options.onLoadComplete Optional callback after items are loaded
 * @returns {Object} Methods to control the loader
 */
export function createContentLoader({
  containerId, 
  buttonId, 
  items, 
  itemsPerPage = 6, 
  renderItem, 
  onLoadComplete = null
}) {
  let currentlyDisplayed = 0;
  let filteredItems = [...items]; // Default to all items
  
  const container = document.getElementById(containerId);
  const loadMoreButton = document.getElementById(buttonId);
  
  if (!container || !loadMoreButton) {
    console.error(`Content loader: Container or button not found (${containerId}, ${buttonId})`);
    return null;
  }
  
  /**
   * Initialize the loader with initial items
   * @param {number} initialCount Number of items to show initially
   */
  function initialize(initialCount = itemsPerPage) {
    // Reset counter
    currentlyDisplayed = 0;
    
    // Clear the container
    container.innerHTML = '';
    
    // Load initial items
    loadMoreItems(initialCount, false);
    
    // Set up click handler for the load more button
    loadMoreButton.removeEventListener('click', handleLoadMoreClick);
    loadMoreButton.addEventListener('click', handleLoadMoreClick);
    
    // Update button visibility
    updateButtonVisibility();
  }
  
  /**
   * Handle click on the load more button
   */
  function handleLoadMoreClick() {
    // Show loading state on the button
    const originalButtonText = loadMoreButton.innerHTML;
    loadMoreButton.innerHTML = `
      <div class="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current mr-2 align-middle"></div>
      <span>Loading...</span>
    `;
    loadMoreButton.disabled = true;
    
    // Store current count to know which are new items
    const previousCount = container.children.length;
    
    // Simulate network delay (can be removed in production)
    setTimeout(() => {
      // Load more items
      loadMoreItems(itemsPerPage);
      
      // Add animation class to new items
      const children = Array.from(container.children);
      children.slice(previousCount).forEach(child => {
        child.classList.add('opacity-0');
        child.classList.add('animate-fade-in');
      });
      
      // Scroll to the first new item with a small offset
      scrollToNewContent(containerId, previousCount, { 
        offset: 80,  // Offset to account for sticky header
        behavior: 'smooth'
      });
      
      // Reset button state
      loadMoreButton.innerHTML = originalButtonText;
      loadMoreButton.disabled = false;
      
      // Update button visibility
      updateButtonVisibility();
    }, 600); // Simulate network delay
  }
  
  /**
   * Load more items into the container
   * @param {number} count Number of items to load
   * @param {boolean} append Whether to append to existing items (true) or replace (false)
   */
  function loadMoreItems(count, append = true) {
    if (!append) {
      container.innerHTML = '';
      currentlyDisplayed = 0;
    }
    
    // Get the next batch of items
    const itemsToDisplay = filteredItems.slice(
      currentlyDisplayed, 
      currentlyDisplayed + count
    );
    
    // Render the items
    itemsToDisplay.forEach(item => {
      const element = renderItem(item);
      if (element) {
        container.appendChild(element);
      }
    });
    
    // Update counter
    currentlyDisplayed += itemsToDisplay.length;
    
    // Call the completion callback if provided
    if (onLoadComplete) {
      onLoadComplete(itemsToDisplay, currentlyDisplayed, filteredItems);
    }
  }
  
  /**
   * Update load more button visibility and text
   */
  function updateButtonVisibility() {
    const remainingItems = filteredItems.length - currentlyDisplayed;
    
    if (remainingItems > 0) {
      // Show load more button
      loadMoreButton.classList.remove('hidden');
      
      // Update button text to show remaining count
      loadMoreButton.innerHTML = `Load More (${remainingItems})`;
    } else {
      // Hide load more button if no more items
      loadMoreButton.classList.add('hidden');
    }
  }
  
  /**
   * Filter the items based on a filter function
   * @param {Function} filterFn Filter function that takes an item and returns boolean
   */
  function filterItems(filterFn) {
    filteredItems = items.filter(filterFn);
    initialize();
    return filteredItems;
  }
  
  /**
   * Reset to show all items
   */
  function resetFilter() {
    filteredItems = [...items];
    initialize();
  }
  
  /**
   * Sort the items based on a sort function
   * @param {Function} sortFn Sort function that takes two items and returns comparison result
   */
  function sortItems(sortFn) {
    filteredItems.sort(sortFn);
    initialize();
  }
  
  // Return public methods
  return {
    initialize,
    loadMoreItems,
    updateButtonVisibility,
    filterItems,
    resetFilter,
    sortItems,
    getDisplayedCount: () => currentlyDisplayed,
    getTotalCount: () => filteredItems.length
  };
}