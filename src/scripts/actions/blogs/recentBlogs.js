import { BASE_URL } from '../../../config/config.js';

/**
 * Get most recent public blogs
 * @param {number} limit - Optional limit for number of blogs to return
 * @returns {Promise<Array>} - Array of recent blogs
 */
async function getRecentBlogs(limit) {    // Use the public blogs endpoint
    const endpoint = `${BASE_URL}/blogs/public/recent${limit ? `?limit=${limit}` : ''}`;
    try {
        const response = await fetch(endpoint); // No credentials needed for public endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result.data; // Access the data property containing the blogs array
    } catch (error) {
        console.error('Failed to fetch recent blogs:', error);
        return [];
    }
}

export { getRecentBlogs };