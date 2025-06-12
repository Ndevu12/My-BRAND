/**
 * Blog Category API Actions
 * Handles all blog category-related API requests
 */

import { BASE_URL } from '../../../config/config.js';

/**
 * Get all blog categories
 * @returns {Promise<Array>} - Array of categories
 */
async function getAllCategories() {
  const endpoint = `${BASE_URL}/blog-category`;
  try {
    const response = await fetch(endpoint, {
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch categories');
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Get a category by ID
 * @param {string} categoryId - The ID of the category
 * @returns {Promise<Object>} - Category data
 */
async function getCategoryById(categoryId) {
  const endpoint = `${BASE_URL}/blog-category/${categoryId}`;
  try {
    const response = await fetch(endpoint, {
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch category');
    }

    const data = await response.json();
    return data.category;
  } catch (error) {
    console.error(`Error fetching category with ID ${categoryId}:`, error);
    throw error;
  }
}

/**
 * Create a new category (admin only)
 * @param {Object} categoryData - The category data
 * @returns {Promise<Object>} - Created category data
 */
async function createCategory(categoryData) {
  const endpoint = `${BASE_URL}/blog-category/create`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Include cookies in the request
      body: JSON.stringify(categoryData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create category');
    }

    const data = await response.json();
    return data.category;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

/**
 * Update a category (admin only)
 * @param {string} categoryId - The ID of the category to update
 * @param {Object} categoryData - The updated category data
 * @returns {Promise<Object>} - Updated category data
 */
async function updateCategory(categoryId, categoryData) {
  const endpoint = `${BASE_URL}/blog-category/update/${categoryId}`;
  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Include cookies in the request
      body: JSON.stringify(categoryData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update category');
    }

    const data = await response.json();
    return data.category;
  } catch (error) {
    console.error(`Error updating category with ID ${categoryId}:`, error);
    throw error;
  }
}

/**
 * Delete a category (admin only)
 * @param {string} categoryId - The ID of the category to delete
 * @returns {Promise<Object>} - Response data
 */
async function deleteCategory(categoryId) {
  const endpoint = `${BASE_URL}/blog-category/delete/${categoryId}`;
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete category');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting category with ID ${categoryId}:`, error);
    throw error;
  }
}

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
