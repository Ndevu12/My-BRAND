/**
 * Subscriber API Actions
 * Handles all subscriber-related API requests
 */

import { BASE_URL } from '../../../config/config.js';

/**
 * Subscribe to the blog (newsletter)
 * @param {Object} subscriberData - Subscriber data (name and email)
 * @returns {Promise<Object>} - Created subscriber data
 */
async function subscribe(subscriberData) {
  const endpoint = `${BASE_URL}/subscriber/create`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(subscriberData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to subscribe');
    }

    const data = await response.json();
    return data.subscriber;
  } catch (error) {
    console.error('Error subscribing:', error);
    throw error;
  }
}

/**
 * Get all subscribers (admin only)
 * @returns {Promise<Array>} - Array of subscribers
 */
async function getAllSubscribers() {
  const endpoint = `${BASE_URL}/subscriber`;
  try {
    const response = await fetch(endpoint, {
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch subscribers');
    }

    const data = await response.json();
    return data.subscribers;
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    throw error;
  }
}

/**
 * Delete a subscriber (admin only)
 * @param {string} subscriberId - The ID of the subscriber to delete
 * @returns {Promise<Object>} - Response data
 */
async function deleteSubscriber(subscriberId) {
  const endpoint = `${BASE_URL}/subscriber/delete/${subscriberId}`;
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete subscriber');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting subscriber with ID ${subscriberId}:`, error);
    throw error;
  }
}

export {
  subscribe,
  getAllSubscribers,
  deleteSubscriber
};
