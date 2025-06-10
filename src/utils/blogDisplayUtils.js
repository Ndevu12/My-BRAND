/**
 * Blog Display Utilities
 * Contains utilities for displaying blogs on the public-facing blog pages
 */

import { createBlogCard } from '../components/blogCard.js';
import { createFeaturedBlogCard } from '../components/featuredBlogCard.js';
import { scrollToNewContent } from './scrollHelper.js';

/**
 * Format a blog object for display as a card
 * @param {Object} article - The blog article data from API
 * @param {boolean} isFeatured - Whether this is for a featured card
 * @returns {Object} - Formatted blog data for component
 */
export function formatBlogForDisplay(article, isFeatured = false) {
  if (!article) return null;
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };
    // Core blog data
  const blogData = {
    id: article.id || article._id,
    title: article.title || 'Untitled Article',
    description: article.description || '',
    imageUrl: article.imageUrl || '../images/blogImages/programming.jfif',
    author: article.author || 'Ndevu',
    authorImage: '../images/mypic.png',
    date: formatDate(article.createdAt),
    category: article.category || '',
    isNew: article.isNew || false,
    tags: Array.isArray(article.tags) ? article.tags : []
  };
  
  // Add fields specific to featured cards
  if (isFeatured) {
    blogData.readTime = article.readTime || '5 min read';
  }
  
  return blogData;
}

/**
 * Display a featured article at the top of the blogs page
 * @param {Object} article - The blog article data
 * @param {HTMLElement} container - The container element for the featured article
 * @returns {void}
 */
export function displayFeaturedArticle(article, container) {
  if (!article || !container) return;
  
  // Format the blog data for the featured component
  const featuredBlogData = formatBlogForDisplay(article, true);
  
  // Create featured card using our component
  const featuredBlogCard = createFeaturedBlogCard(featuredBlogData);
  
  // Add the featured article to the featured container
  container.innerHTML = '';
  container.appendChild(featuredBlogCard);
}

/**
 * Display a list of articles in a grid
 * @param {Array} articles - List of article objects
 * @param {HTMLElement} container - The grid container element
 * @returns {void}
 */
export function displayArticleGrid(articles, container) {
  if (!container || !Array.isArray(articles)) return;
  
  articles.forEach(article => {
    // Format the blog data for the component
    const blogData = formatBlogForDisplay(article);
    
    // Create card using our component
    const blogCard = createBlogCard(blogData);
    
    // Add the card to the grid
    container.appendChild(blogCard);
  });
}

/**
 * Show an error message in the container
 * @param {HTMLElement} container - The container to display error in
 * @param {string} title - The error title
 * @param {string} message - The error message
 */
export function showErrorMessage(container, title, message) {
  if (!container) return;
  
  container.innerHTML = `
    <div class="col-span-full bg-secondary/70 rounded-xl p-10 text-center">
      <h3 class="text-xl font-bold mb-2">${title}</h3>
      <p class="text-gray-400">${message}</p>
    </div>
  `;
}

/**
 * Show an empty state message in the container
 * @param {HTMLElement} container - The container to display message in
 * @param {string} title - The title
 * @param {string} message - The message
 * @param {string} icon - SVG path for the icon
 */
export function showEmptyState(container, title, message, icon = 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10') {
  if (!container) return;
  
  container.innerHTML = `
    <div class="col-span-full bg-secondary rounded-xl p-10 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}" />
      </svg>
      <h3 class="text-xl font-bold mb-2">${title}</h3>
      <p class="text-gray-400">${message}</p>
    </div>
  `;
}

/**
 * Show a loading spinner
 * @param {HTMLElement} container - The container to display loader in 
 */
export function showLoader(container) {
  if (!container) return;
  
  container.innerHTML = `
    <div class="col-span-full flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  `;
}

/**
 * Load more blog content with animation
 * @param {Array} articles - The articles to display
 * @param {HTMLElement} container - The container to append to
 * @param {Function} onComplete - Callback after loading completes
 */
export function loadMoreArticles(articles, container, onComplete) {
  if (!container || !Array.isArray(articles) || articles.length === 0) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }
  
  // Store current count to know which are new articles
  const previousCount = container.children.length;
  
  // Display the articles
  displayArticleGrid(articles, container);
  
  // Add animation class to new articles
  const children = Array.from(container.children);
  children.slice(previousCount).forEach(child => {
    child.classList.add('blog-card-appearing');
  });
  
  // Scroll to the first new article with a small offset
  scrollToNewContent(container.id, previousCount, { 
    offset: 80,  // Offset to account for sticky header
    behavior: 'smooth'
  });
  
  if (typeof onComplete === 'function') onComplete();
}
