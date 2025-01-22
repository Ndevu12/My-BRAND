/**
 * Scroll Helper Utility
 * Provides utilities for smooth scrolling and scroll-related functionality
 */

/**
 * Scrolls to new content items that have been loaded
 * @param {string} containerId - ID of the container element
 * @param {number} startIndex - Index of the first new item
 * @param {Object} options - Scroll options
 * @param {number} options.offset - Offset from the top (useful for fixed headers)
 * @param {string} options.behavior - Scroll behavior ('auto' or 'smooth')
 */
export function scrollToNewContent(containerId, startIndex, options = {}) {
  const container = document.getElementById(containerId);
  if (!container || startIndex >= container.children.length) return;
  
  const firstNewItem = container.children[startIndex];
  if (!firstNewItem) return;
  
  // Default options
  const { 
    offset = 0, 
    behavior = 'auto' 
  } = options;
  
  // Calculate position
  const rect = firstNewItem.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const targetPosition = rect.top + scrollTop - offset;
  
  // Perform scroll
  window.scrollTo({
    top: targetPosition,
    behavior: behavior
  });
}

/**
 * Scrolls to a specific element
 * @param {string|HTMLElement} target - Target element or its ID
 * @param {Object} options - Scroll options
 * @param {number} options.offset - Offset from the top
 * @param {string} options.behavior - Scroll behavior ('auto' or 'smooth')
 */
export function scrollToElement(target, options = {}) {
  const element = typeof target === 'string' ? document.getElementById(target) : target;
  if (!element) return;
  
  // Default options
  const { 
    offset = 0, 
    behavior = 'smooth' 
  } = options;
  
  // Calculate position
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const targetPosition = rect.top + scrollTop - offset;
  
  // Perform scroll
  window.scrollTo({
    top: targetPosition,
    behavior: behavior
  });
}

/**
 * Check if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Offset from the viewport edges
 * @returns {boolean} - True if element is in viewport
 */
export function isInViewport(element, offset = 0) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top >= 0 - offset &&
    rect.left >= 0 - offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}
