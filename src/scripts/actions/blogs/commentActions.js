/**
 * Comment API Actions
 * Handles all comment-related API requests
 */

import { BASE_URL } from '../../../config/config.js';

/**
 * Add a comment to a blog
 * @param {Object} commentData - The comment data (blogId, name, email, content)
 * @returns {Promise<Object>} - Created comment data
 */
async function addComment(commentData) {
  const endpoint = `${BASE_URL}/comment/add`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Include cookies in the request
      body: JSON.stringify(commentData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add comment');
    }

    const data = await response.json();
    return data.comment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

/**
 * Delete a comment (admin or subscriber only)
 * @param {string} commentId - The ID of the comment to delete
 * @returns {Promise<Object>} - Response data
 */
async function deleteComment(commentId) {
  const endpoint = `${BASE_URL}/comment/${commentId}`;
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete comment');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting comment with ID ${commentId}:`, error);
    throw error;
  }
}

export {
  addComment,
  deleteComment
};
