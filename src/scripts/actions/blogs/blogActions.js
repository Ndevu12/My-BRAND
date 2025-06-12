/**
 * Blog API Actions
 * Handles all blog-related API requests
 */

import { BASE_URL } from '../../../config/config.js';

/**
 * Create a new blog post
 * @param {Object} blogData - The blog data to create
 * @returns {Promise<Object>} - Created blog data
 */
async function createBlog(blogData) {
  const endpoint = `${BASE_URL}/blogs/create`;
  
  // Create FormData if there's an image
  let requestBody;
  let headers = {};
  
  if (blogData.image instanceof File) {
    // Use FormData for multipart/form-data when uploading an image
    const formData = new FormData();
    
    // Add text fields
    Object.keys(blogData).forEach(key => {
      if (key === 'image') {
        formData.append('image', blogData.image);
      } else if (key === 'tags' && Array.isArray(blogData.tags)) {
        formData.append('tags', JSON.stringify(blogData.tags));
      } else {
        formData.append(key, blogData[key]);
      }
    });

    // DEBUGGING
    console.log('Logging blog data: ', blogData);
    console.log("Blog data after formatting: ", formData);
    
    requestBody = formData;
  } else {
    // Use JSON when no file upload is needed
    headers['Content-Type'] = 'application/json';
    requestBody = JSON.stringify(blogData);
  }
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include', // Include cookies in the request
      body: requestBody
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create blog');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
}

/**
 * Update an existing blog post
 * @param {string} blogId - The ID of the blog to update
 * @param {Object} blogData - The updated blog data
 * @returns {Promise<Object>} - Updated blog data
 */
async function updateBlog(blogId, blogData) {
  const endpoint = `${BASE_URL}/blogs/update/${blogId}`;
  
  // Create FormData if there's an image
  let requestBody;
  let headers = {};
  
  if (blogData.image instanceof File) {
    // Use FormData for multipart/form-data when uploading an image
    const formData = new FormData();
    
    // Add text fields
    Object.keys(blogData).forEach(key => {
      if (key === 'image') {
        formData.append('image', blogData.image);
      } else if (key === 'tags' && Array.isArray(blogData.tags)) {
        formData.append('tags', JSON.stringify(blogData.tags));
      } else {
        formData.append(key, blogData[key]);
      }
    });
    
    requestBody = formData;
  } else {
    // Use JSON when no file upload is needed
    headers['Content-Type'] = 'application/json';
    requestBody = JSON.stringify(blogData);
  }
  
  try {
    const response = await fetch(endpoint, {
      method: 'PUT', // Using PUT as specified in the endpoint docs
      headers,
      credentials: 'include', // Include cookies in the request
      body: requestBody
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update blog');
    }

    const data = await response.json();
    return data.blog;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
}

/**
 * Get a blog by ID (public endpoint - no auth required)
 * @param {string} blogId - The ID of the blog to retrieve
 * @returns {Promise<Object>} - Blog data
 */
async function getBlogById(blogId) {
  const endpoint = `${BASE_URL}/blogs/public/${blogId}`;
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch blog');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${blogId}:`, error);
    throw error;
  }
}

/**
 * Delete a blog by ID
 * @param {string} blogId - The ID of the blog to delete
 * @returns {Promise<Object>} - Response data
 */
async function deleteBlog(blogId) {
  const endpoint = `${BASE_URL}/blogs/delete/${blogId}`;
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete blog');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting blog with ID ${blogId}:`, error);
    throw error;
  }
}

/**
 * Get all public blogs
 * @returns {Promise<Array>} - Array of blogs
 */
async function getAllBlogs() {
  const endpoint = `${BASE_URL}/blogs/public`;
  try {
    const response = await fetch(endpoint); 
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch blogs');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    throw error;
  }
}

/**
 * Get blogs by status (admin view)
 * @param {string} status - The status to filter by (published or draft)
 * @returns {Promise<Array>} - Array of blogs
 */
async function getBlogsByStatus(status) {
  // Use admin endpoint since we're filtering by status
  const endpoint = `${BASE_URL}/blogs?status=${status}`;
  try {
    const response = await fetch(endpoint, {
      credentials: 'include' // Include cookies in the request
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to fetch ${status} blogs`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching ${status} blogs:`, error);
    throw error;
  }
}

/**
 * Upload a blog image
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - URL of uploaded image
 */
async function uploadBlogImage(file) {
  // Note: We don't have a specific endpoint for image upload only
  // Images should be uploaded as part of the blog create/update operations
  // This function is kept for backward compatibility
  
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    // Use a temporary endpoint - in production, implement proper image upload
    const endpoint = `${BASE_URL}/uploads/blog-image`;
    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload image');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error uploading blog image:', error);
    throw error;
  }
}

/**
 * Get blogs by category
 * @param {string} categoryId - Category ID to filter by
 * @returns {Promise<Array>} - Array of blogs in the category
 */
async function getBlogsByCategory(categoryId) {
  const endpoint = `${BASE_URL}/blogs/by-category/${categoryId}`;
  try {
    const response = await fetch(endpoint, {
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to fetch blogs by category`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching blogs by category:`, error);
    throw error;
  }
}

/**
 * Search blogs by title
 * @param {string} title - Title to search for
 * @returns {Promise<Array>} - Array of matching blogs
 */
async function searchBlogsByTitle(title) {
  const endpoint = `${BASE_URL}/blogs/by-title?title=${encodeURIComponent(title)}`;
  try {
    const response = await fetch(endpoint, {
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to search blogs by title`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error searching blogs by title:`, error);
    throw error;
  }
}

/**
 * Like a blog post
 * @param {string} blogId - The ID of the blog to like
 * @returns {Promise<Object>} - Updated blog with like count
 */
async function likeBlog(blogId) {
  const endpoint = `${BASE_URL}/blogs/like/${blogId}`;
  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to like blog');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error liking blog with ID ${blogId}:`, error);
    throw error;
  }
}

/**
 * Get admin view of all blogs with pagination and filtering
 * @param {Object} params - Query parameters for pagination and filtering
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Number of blogs per page (default: 10)
 * @param {string} params.status - Filter by status ('published', 'draft', or empty for all)
 * @param {string} params.category - Filter by category ID
 * @param {string} params.search - Search term for title/description
 * @param {string} params.sortBy - Sort field ('createdAt', 'title', 'views', etc.)
 * @param {string} params.sortOrder - Sort order ('asc' or 'desc')
 * @returns {Promise<Object>} - Paginated blogs data with metadata
 */
async function getAdminBlogs(params = {}) {
  const {
    page = 1,
    limit = 10,
    status = '',
    category = '',
    search = '',
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  
  if (status) queryParams.append('status', status);
  if (category) queryParams.append('category', category);
  if (search) queryParams.append('search', search);
  if (sortBy) queryParams.append('sortBy', sortBy);
  if (sortOrder) queryParams.append('sortOrder', sortOrder);

  const endpoint = `${BASE_URL}/blogs?${queryParams.toString()}`;
  
  try {
    const response = await fetch(endpoint, {
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch admin blogs');
    }

    const data = await response.json();
    return data.data; // Returns { blogs: [], pagination: {}, filters: {} }
  } catch (error) {
    console.error('Error fetching admin blogs:', error);
    throw error;
  }
}

/**
 * Get blog with comments (authenticated endpoint - for admins or subscribers)
 * @param {string} blogId - The ID of the blog to retrieve with comments
 * @returns {Promise<Object>} - Blog data with comments
 */
async function getBlogWithDetails(blogId) {
  const endpoint = `${BASE_URL}/blogs/${blogId}`;
  try {
    const response = await fetch(endpoint, {
      credentials: 'include' // Include cookies in the request - necessary for auth
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch blog with details');
    }

    const data = await response.json();
    return data.blog;
  } catch (error) {
    console.error(`Error fetching blog with details (ID ${blogId}):`, error);
    throw error;
  }
}

export {
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getAllBlogs,
  getBlogsByStatus,
  uploadBlogImage,
  getBlogsByCategory,
  searchBlogsByTitle,
  likeBlog,
  getAdminBlogs,
  getBlogWithDetails
};