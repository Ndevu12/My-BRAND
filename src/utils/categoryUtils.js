/**
 * Category Utils
 * Shared utility functions for working with categories across the application
 */

/**
 * Render a category badge HTML string
 * @param {string} categoryId - Category ID
 * @param {boolean} withIcon - Whether to include the icon
 * @returns {string} HTML string for the badge
 */
export function getCategoryBadgeHTML(categoryId, withIcon = true) {
    if (!categoryId || !window.categoryManager) {
        return `<span class="text-xs bg-gray-600/20 text-gray-300 px-2 py-1 rounded-full">Uncategorized</span>`;
    }
    
    const category = window.categoryManager.getCategory(categoryId);
    if (!category) {
        return `<span class="text-xs bg-gray-600/20 text-gray-300 px-2 py-1 rounded-full">${categoryId}</span>`;
    }
    
    return `<span class="text-xs ${category.bgClass} ${category.textClass} px-2 py-1 rounded-full">
        ${withIcon ? `<i class="fas ${category.icon} mr-1"></i>` : ''}
        ${category.name}
    </span>`;
}

/**
 * Get a list of popular/common categories
 * @param {number} limit - Maximum number of categories to return
 * @returns {Array} Array of category objects
 */
export function getPopularCategories(limit = 5) {
    if (!window.categoryManager) return [];
    
    // Get all categories and limit to the requested number
    // In a real app, this could be sorted by popularity metrics
    return window.categoryManager.getAllCategories().slice(0, limit);
}

/**
 * Find a category that matches a string (useful for importing/migration)
 * @param {string} categoryText - Text to match against category names or IDs
 * @returns {Object|null} Matching category or null
 */
export function findMatchingCategory(categoryText) {
    if (!categoryText || !window.categoryManager) return null;
    
    // Check for exact ID match first
    let category = window.categoryManager.getCategory(categoryText.toLowerCase());
    if (category) return category;
    
    // Try to find by name (case-insensitive)
    return window.categoryManager.findCategoryByName(categoryText);
}
