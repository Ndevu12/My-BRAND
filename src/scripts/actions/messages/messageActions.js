/**
 * Message API Actions
 * Handles all message-related API requests
 */

import { BASE_URL } from '../../../config/config.js';

/**
 * Send a contact message
 * @param {Object} messageData - The message data to send
 * @param {string} messageData.name - Sender's name
 * @param {string} messageData.email - Sender's email
 * @param {string} messageData.subject - Message subject
 * @param {string} messageData.message - Message content
 * @returns {Promise<Object>} - Response data
 */
export async function sendContactMessage(messageData) {
  const endpoint = `${BASE_URL}/message/contact-me`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for potential authentication
      body: JSON.stringify(messageData)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to send message' }));
      throw new Error(error.message || 'Failed to send message');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
}

/**
 * Get all messages (admin only)
 * @param {Object} options - Optional pagination and filter parameters
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 10)
 * @param {string} options.status - Filter by status ('read', 'unread', or empty for all)
 * @param {string} options.search - Search term for name, email, subject, or message
 * @param {string} options.sortBy - Field to sort by (default: 'createdAt')
 * @param {string} options.sortOrder - Sort order ('asc' or 'desc', default: 'desc')
 * @returns {Promise<Object|Array>} - Paginated response object or array for backward compatibility
 */
export async function getAllMessages(options = {}) {
  const queryParams = new URLSearchParams();
  
  // Add pagination parameters if provided
  if (options.page) queryParams.append('page', options.page.toString());
  if (options.limit) queryParams.append('limit', options.limit.toString());
  if (options.status) queryParams.append('status', options.status);
  if (options.search) queryParams.append('search', options.search);
  if (options.sortBy) queryParams.append('sortBy', options.sortBy);
  if (options.sortOrder) queryParams.append('sortOrder', options.sortOrder);
  
  const endpoint = `${BASE_URL}/message${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  try {
    const response = await fetch(endpoint, {
      credentials: 'include' // Include cookies for authentication
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch messages' }));
      throw new Error(error.message || 'Failed to fetch messages');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

/**
 * Get a message by ID (admin only)
 * @param {string} messageId - The ID of the message to retrieve
 * @returns {Promise<Object>} - Message data
 */
export async function getMessageById(messageId) {
  const endpoint = `${BASE_URL}/message/${messageId}`;
  
  try {
    const response = await fetch(endpoint, {
      credentials: 'include' // Include cookies for authentication
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch message' }));
      throw new Error(error.message || 'Failed to fetch message');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching message with ID ${messageId}:`, error);
    throw error;
  }
}

/**
 * Mark a message as read (admin only)
 * @param {string} messageId - The ID of the message to mark as read
 * @returns {Promise<Object>} - Response data
 */
export async function markMessageAsRead(messageId) {
  const endpoint = `${BASE_URL}/message/mark-read/${messageId}`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'PATCH',
      credentials: 'include' // Include cookies for authentication
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to mark message as read' }));
      throw new Error(error.message || 'Failed to mark message as read');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error marking message as read with ID ${messageId}:`, error);
    throw error;
  }
}

/**
 * Delete a message by ID (admin only)
 * @param {string} messageId - The ID of the message to delete
 * @returns {Promise<Object>} - Response data
 */
export async function deleteMessage(messageId) {
  const endpoint = `${BASE_URL}/message/delete/${messageId}`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      credentials: 'include' // Include cookies for authentication
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete message' }));
      throw new Error(error.message || 'Failed to delete message');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error deleting message with ID ${messageId}:`, error);
    throw error;
  }
}
