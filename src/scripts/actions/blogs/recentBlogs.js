import { BASE_URL } from '../../../config/config.js';

async function getRecentBlogs() {
    const endpoint = `${BASE_URL}/blog/status/published`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const blogs = await response.json();
        return blogs.blogs;
    } catch (error) {
        console.error('Failed to fetch recent blogs:', error);
        return [];
    }
}

export { getRecentBlogs };