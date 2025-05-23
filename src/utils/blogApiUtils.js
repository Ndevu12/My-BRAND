/**
 * Blog API Utilities
 * Provides helper functions for working with the blog API
 */

import { getAllBlogs, getBlogsByCategory, searchBlogsByTitle } from '../scripts/actions/blogs/blogActions.js';

/**
 * Validate blog data structure to ensure required properties are present
 * @param {Object} blog - Blog object to validate
 * @returns {boolean} - True if blog has minimum required properties
 */
function isValidBlog(blog) {
  return blog && 
         typeof blog === 'object' && 
         (typeof blog.id !== 'undefined' || typeof blog._id !== 'undefined') && 
         typeof blog.title === 'string';
}

/**
 * Fetch blogs with enhanced error handling and data validation
 * @param {string} categoryFilter - Optional category to filter by
 * @returns {Promise<Array>} - Array of validated blog objects or empty array on error
 */
export async function fetchBlogs(categoryFilter = '') {
  try {
    let blogs = [];
        
    if (categoryFilter) {
      // Fetch blogs by category
      blogs = await getBlogsByCategory(categoryFilter);
    } else {
      // Fetch all blogs
      blogs = await getAllBlogs();
    }
    
    // Validate response data
    if (!Array.isArray(blogs)) {
      return [];
    }
    
    // Filter out invalid blog entries
    const validatedBlogs = blogs.filter(blog => isValidBlog(blog));
    
    return validatedBlogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

/**
 * Fetch blogs by search term with enhanced error handling
 * @param {string} searchTerm - Term to search for
 * @returns {Promise<Array>} - Array of validated blog objects or empty array on error
 */
export async function searchBlogs(searchTerm) {
  try {
    if (!searchTerm || typeof searchTerm !== 'string') {
      return [];
    }
        
    const blogs = await searchBlogsByTitle(searchTerm);
    
    // Validate response data
    if (!Array.isArray(blogs)) {
      return [];
    }
    
    // Filter out invalid blog entries
    const validatedBlogs = blogs.filter(blog => isValidBlog(blog));
    
    return validatedBlogs;
  } catch (error) {
    console.error(`Error searching blogs for "${searchTerm}":`, error);
    return [];
  }
}

/**
 * Fetch popular blogs based on likes
 * @param {number} limit - Number of blogs to return
 * @returns {Promise<Array>} - Array of validated blog objects or empty array on error
 */
export async function fetchPopularBlogs(limit = 3) {
  try {
    const blogs = await getAllBlogs();
    
    // Validate response data
    if (!Array.isArray(blogs)) {
      return [];
    }
    
    // Filter out invalid blog entries
    const validatedBlogs = blogs.filter(blog => isValidBlog(blog));
    
    if (validatedBlogs.length === 0) {
      return [];
    }
    
    // Sort by likes and take top ones
    const popularBlogs = [...validatedBlogs]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, limit);
    
    return popularBlogs;
  } catch (error) {
    console.error('Error fetching popular blogs:', error);
    return [];
  }
}

/**
 * Sort blogs based on the specified option
 * @param {Array} blogs - Array of blog objects
 * @param {string} sortOption - Sort option ('newest', 'oldest', 'popular')
 * @returns {Array} - Sorted array of blog objects
 */
export function sortBlogs(blogs, sortOption = 'newest') {
  // Input validation
  if (!Array.isArray(blogs)) {
    return [];
  }
  
  if (blogs.length === 0) {
    return [];
  }
  
  try {
    const sortedBlogs = [...blogs];
    
    // Check if sort option is valid
    if (!['newest', 'oldest', 'popular'].includes(sortOption)) {
      sortOption = 'newest';
    }
    
    switch (sortOption) {
      case 'newest':
        sortedBlogs.sort((a, b) => {
          if (!a.createdAt && !b.createdAt) return 0;
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        break;
      case 'oldest':
        sortedBlogs.sort((a, b) => {
          if (!a.createdAt && !b.createdAt) return 0;
          if (!a.createdAt) return -1;
          if (!b.createdAt) return 1;
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        break;
      case 'popular':
        sortedBlogs.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default:
        // We already set a default above, but just in case
        sortedBlogs.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
    }
    
    return sortedBlogs;
  } catch (error) {
    console.error('Error sorting blogs:', error);
    // Return the original array in case of error
    return blogs;
  }
}
