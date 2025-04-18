import { BASE_URL } from '../config.js';

async function fetchBlogCategories() {
    try {
        const response = await fetch(`${BASE_URL}/blogCategory`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const categories = await response.json();

        if (!categories || !Array.isArray(categories.categories)) {
            throw new Error('Categories is not an array');
        }
        return categories.categories;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}

export { fetchBlogCategories };