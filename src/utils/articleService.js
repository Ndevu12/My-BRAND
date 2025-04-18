/**
 * Article Service Utility
 * Handles CRUD operations for articles with localStorage or API
 */

import { BASE_URL } from '../config/config.js';

/**
 * Get all articles
 * @returns {Promise<Array>} Array of articles
 */
export async function getAllArticles() {
  try {
    // Try to get from API if available
    if (BASE_URL) {
      const response = await fetch(`${BASE_URL}/blogs`);
      if (response.ok) {
        const data = await response.json();
        return data.blogs || [];
      }
    }
  } catch (error) {
    console.error('Error fetching articles from API:', error);
  }
  
  // Fallback to localStorage
  return JSON.parse(localStorage.getItem('articles') || '[]');
}

/**
 * Get article by ID
 * @param {string} id - Article ID
 * @returns {Promise<Object|null>} Article object or null if not found
 */
export async function getArticleById(id) {
  if (!id) return null;
  
  try {
    // Try to get from API if available
    if (BASE_URL) {
      const response = await fetch(`${BASE_URL}/blogs/${id}`);
      if (response.ok) {
        const data = await response.json();
        return data.blog || null;
      }
    }
  } catch (error) {
    console.error(`Error fetching article ${id} from API:`, error);
  }
  
  // Fallback to localStorage
  const articles = JSON.parse(localStorage.getItem('articles') || '[]');
  return articles.find(article => article.id === id) || null;
}

/**
 * Create a new article
 * @param {Object} articleData - Article data
 * @returns {Promise<Object>} Created article
 */
export async function createArticle(articleData) {
  try {
    // Try to create via API if available
    if (BASE_URL) {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch(`${BASE_URL}/blogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(articleData)
        });
        
        if (response.ok) {
          const data = await response.json();
          return data.blog;
        }
      }
    }
  } catch (error) {
    console.error('Error creating article via API:', error);
  }
  
  // Fallback to localStorage
  const articles = JSON.parse(localStorage.getItem('articles') || '[]');
  const newArticle = {
    ...articleData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  articles.push(newArticle);
  localStorage.setItem('articles', JSON.stringify(articles));
  
  return newArticle;
}

/**
 * Update an existing article
 * @param {string} id - Article ID
 * @param {Object} updatedData - Updated article data
 * @returns {Promise<Object|null>} Updated article or null if not found
 */
export async function updateArticle(id, updatedData) {
  try {
    // Try to update via API if available
    if (BASE_URL) {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch(`${BASE_URL}/blogs/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updatedData)
        });
        
        if (response.ok) {
          const data = await response.json();
          return data.blog;
        }
      }
    }
  } catch (error) {
    console.error(`Error updating article ${id} via API:`, error);
  }
  
  // Fallback to localStorage
  const articles = JSON.parse(localStorage.getItem('articles') || '[]');
  const index = articles.findIndex(article => article.id === id);
  
  if (index === -1) return null;
  
  const updatedArticle = {
    ...articles[index],
    ...updatedData,
    updatedAt: new Date().toISOString()
  };
  
  articles[index] = updatedArticle;
  localStorage.setItem('articles', JSON.stringify(articles));
  
  return updatedArticle;
}

/**
 * Delete an article
 * @param {string} id - Article ID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteArticle(id) {
  try {
    // Try to delete via API if available
    if (BASE_URL) {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch(`${BASE_URL}/blogs/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          return true;
        }
      }
    }
  } catch (error) {
    console.error(`Error deleting article ${id} via API:`, error);
  }
  
  // Fallback to localStorage
  const articles = JSON.parse(localStorage.getItem('articles') || '[]');
  const filteredArticles = articles.filter(article => article.id !== id);
  
  if (filteredArticles.length === articles.length) {
    return false; // Article not found
  }
  
  localStorage.setItem('articles', JSON.stringify(filteredArticles));
  return true;
}
