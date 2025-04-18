/**
 * Dashboard Category Integration
 * Provides utility functions for integrating CategoryManager with dashboard
 */

import { getCategoryBadgeHTML } from '../../utils/categoryUtils.js';

/**
 * Get category display elements (badge, icon, name) for dashboard display
 * @param {string} categoryId - The category identifier
 * @returns {Object} Category display elements
 */
export function getDashboardCategoryDisplay(categoryId) {
    if (!categoryId || !window.categoryManager) {
        return {
            badge: getCategoryBadgeHTML(''), // Use the utility function
            icon: 'fa-tag',
            name: 'Uncategorized',
            bgClass: 'bg-gray-600/20',
            textClass: 'text-gray-300'
        };
    }
    
    // Get category from CategoryManager
    const category = window.categoryManager.getCategory(categoryId);
    
    if (!category) {
        return {
            badge: getCategoryBadgeHTML(categoryId), // Use the utility function
            icon: 'fa-tag',
            name: categoryId,
            bgClass: 'bg-gray-600/20',
            textClass: 'text-gray-300'
        };
    }
    
    return {
        badge: getCategoryBadgeHTML(categoryId), // Use the utility function
        icon: category.icon,
        name: category.name,
        bgClass: category.bgClass,
        textClass: category.textClass
    };
}

/**
 * Populate a category select element with options from CategoryManager
 * @param {HTMLSelectElement} selectElement - The select element to populate
 * @param {string} [selectedValue] - Optional currently selected value
 * @param {boolean} [addEmptyOption] - Whether to add an empty/all option
 */
export function populateCategorySelect(selectElement, selectedValue = '', addEmptyOption = true) {
    if (!selectElement || !window.categoryManager) return;
    
    // Clear existing options
    selectElement.innerHTML = '';
    
    // Add empty option if requested
    if (addEmptyOption) {
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'All Categories';
        selectElement.appendChild(emptyOption);
    }
    
    // Get categories from CategoryManager using the new array structure
    const categories = window.categoryManager.getAllCategories();
    
    // Add options for each category
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        if (category.id === selectedValue) {
            option.selected = true;
        }
        selectElement.appendChild(option);
    });
}
