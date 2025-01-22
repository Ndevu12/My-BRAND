/**
 * Public Blogs Page Script
 * Handles displaying blog posts on the public-facing blogs page
 * Uses dummy blog data instead of API calls
 */

import { dummyBlogs } from '../../data/dummyBlogs.js';
import { createBlogCard } from '../../components/blogCard.js';
import { createFeaturedBlogCard } from '../../components/featuredBlogCard.js';
import { scrollToNewContent } from '../../utils/scrollHelper.js';

// Configuration for blog display
const BLOGS_PER_PAGE = 4; // Number of blogs to show initially and on each "Load More" click
let currentlyDisplayedCount = 0;
let filteredArticles = [];

document.addEventListener('DOMContentLoaded', function() {
  // Initialize CategoryManager for category tabs
  initializeCategories();
  
  // Load articles with initial filter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFilter = urlParams.get('category') || '';
  loadArticles(categoryFilter);
  
  // Load popular posts for the sidebar
  loadPopularPosts();
  
  // Add options to the sort dropdown if it exists
  const sortSelect = document.getElementById('sort-options');
  if (sortSelect) {
    sortSelect.innerHTML = `
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="popular">Most Popular</option>
    `;
    
    sortSelect.addEventListener('change', function() {
      currentlyDisplayedCount = 0; // Reset display count when sorting changes
      loadArticles(getCurrentCategoryFilter(), this.value);
    });
  }

  // Set up load more button functionality
  setupLoadMoreButton();
});

/**
 * Initialize categories using the CategoryManager
 */
function initializeCategories() {
  // Check if CategoryManager is loaded
  if (window.categoryManager) {
    const categoryTabsContainer = document.getElementById('category-tabs');
    if (!categoryTabsContainer) return;
    
    // Get current category filter from URL if any
    const urlParams = new URLSearchParams(window.location.search);
    const activeCategory = urlParams.get('category') || '';
    
    // Render the category tabs
    window.categoryManager.renderCategoryTabs('category-tabs', activeCategory, function(categoryId) {
      // This callback is triggered when a category tab is clicked
      
      // Update URL to reflect the filter
      const url = new URL(window.location);
      if (categoryId) {
        url.searchParams.set('category', categoryId);
      } else {
        url.searchParams.delete('category');
      }
      window.history.pushState({}, '', url);
      
      // Reset display count when category changes
      currentlyDisplayedCount = 0;
      loadArticles(categoryId);
    });
  } else {
    console.warn('CategoryManager not loaded. Categories will not be displayed correctly.');
  }
}

/**
 * Get current category filter from active tab
 */
function getCurrentCategoryFilter() {
  const activeTab = document.querySelector('.category-tab span.bg-yellow-500');
  const parentTab = activeTab ? activeTab.closest('.category-tab') : null;
  return parentTab ? parentTab.dataset.category : '';
}

/**
 * Load and display articles with optional filtering and sorting
 */
function loadArticles(categoryFilter = '', sortOption = 'newest') {
  const blogsGrid = document.getElementById('blogs-grid');
  const featuredContainer = document.getElementById('featured-article-container');
  const loadMoreContainer = document.getElementById('load-more-container');
  
  if (!blogsGrid) return;
  
  // Show loading state
  blogsGrid.innerHTML = `
    <div class="col-span-full flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  `;
  
  try {
    // Use the dummy blogs data
    filteredArticles = [...dummyBlogs]; // Create a copy to avoid modifying the original
    
    // Filter by category if specified
    if (categoryFilter) {
      filteredArticles = filteredArticles.filter(article => article.category === categoryFilter);
    }
    
    // Sort articles
    switch (sortOption) {
      case 'newest':
        filteredArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filteredArticles.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'popular':
        filteredArticles.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }
    
    // Show empty state if no articles
    if (filteredArticles.length === 0) {
      blogsGrid.innerHTML = `
        <div class="col-span-full bg-secondary rounded-xl p-10 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 class="text-xl font-bold mb-2">No Articles Found</h3>
          <p class="text-gray-400">No articles available in this category yet. Check back later or try another category.</p>
        </div>
      `;
      
      // Clear featured article and hide load more button
      if (featuredContainer) {
        featuredContainer.innerHTML = '';
      }
      
      if (loadMoreContainer) {
        loadMoreContainer.classList.add('hidden');
      }
      
      return;
    }
    
    // Reset display counter if this is a new search/filter
    if (currentlyDisplayedCount === 0) {
      // Clear the container
      blogsGrid.innerHTML = '';
      
      // Display featured article (first article)
      if (featuredContainer) {
        const featuredArticle = filteredArticles[0];
        
        // Format the blog data for the featured component
        const featuredBlogData = {
          id: featuredArticle.id,
          title: featuredArticle.title,
          description: featuredArticle.description,
          imageUrl: featuredArticle.imageUrl,
          tags: featuredArticle.tags || [],
          author: featuredArticle.author || 'Ndevu',
          authorImage: '../images/mypic.png',
          date: featuredArticle.createdAt,
          readTime: featuredArticle.readTime || '5 min read'
        };
        
        // Create featured card using our component
        const featuredBlogCard = createFeaturedBlogCard(featuredBlogData);
        
        // Add the featured article to the featured container
        featuredContainer.innerHTML = '';
        featuredContainer.appendChild(featuredBlogCard);
        
        // Skip the featured article in the regular grid
        currentlyDisplayedCount = 1;
      } else {
        currentlyDisplayedCount = 0;
      }
    }
    
    // Get the next batch of articles to display
    const articlesToDisplay = filteredArticles.slice(
      currentlyDisplayedCount, 
      currentlyDisplayedCount + BLOGS_PER_PAGE
    );
    
    // Render the current batch of articles
    articlesToDisplay.forEach(article => {
      // Format the blog data for the component
      const blogData = {
        id: article.id,
        title: article.title,
        description: article.description,
        imageUrl: article.imageUrl,
        author: article.author || 'Ndevu',
        authorImage: '../images/mypic.png',
        date: article.createdAt,
        category: article.category,
        isNew: article.isNew || false,
        tags: article.tags
      };
      
      // Create card using our component
      const blogCard = createBlogCard(blogData);
      
      // Add the card to the grid
      blogsGrid.appendChild(blogCard);
    });
    
    // Update the counter
    currentlyDisplayedCount += articlesToDisplay.length;
    
    // Update load more button visibility
    updateLoadMoreButton();
    
  } catch (error) {
    console.error('Error loading articles:', error);
    blogsGrid.innerHTML = `
      <div class="col-span-full bg-secondary/70 rounded-xl p-10 text-center">
        <h3 class="text-xl font-bold mb-2">Error Loading Articles</h3>
        <p class="text-gray-400">There was a problem loading the articles. Please try again later.</p>
      </div>
    `;
    
    // Hide load more button
    if (loadMoreContainer) {
      loadMoreContainer.classList.add('hidden');
    }
  }
}

/**
 * Set up load more button functionality
 */
function setupLoadMoreButton() {
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      // Show loading state
      this.innerHTML = `
        <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
        Loading...
      `;
      this.disabled = true;
      
      // Store current count to know which are new articles
      const previousCount = document.getElementById('blogs-grid').children.length;
      
      // Simulate network delay
      setTimeout(() => {
        // Load more articles
        const categoryFilter = getCurrentCategoryFilter();
        const sortSelect = document.getElementById('sort-options');
        const sortOption = sortSelect ? sortSelect.value : 'newest';
        
        // Load the next batch of articles
        const blogsGrid = document.getElementById('blogs-grid');
        const articlesToDisplay = filteredArticles.slice(
          currentlyDisplayedCount, 
          currentlyDisplayedCount + BLOGS_PER_PAGE
        );
        
        // Render the articles
        articlesToDisplay.forEach(article => {
          const blogData = {
            id: article.id,
            title: article.title,
            description: article.description,
            imageUrl: article.imageUrl,
            author: article.author || 'Ndevu',
            authorImage: '../images/mypic.png',
            date: article.createdAt,
            category: article.category,
            isNew: article.isNew || false,
            tags: article.tags
          };
          
          const blogCard = createBlogCard(blogData);
          blogsGrid.appendChild(blogCard);
        });
        
        // Add animation class to new articles
        const children = Array.from(blogsGrid.children);
        children.slice(previousCount).forEach(child => {
          child.classList.add('blog-card-appearing');
        });
        
        // Scroll to the first new article with a small offset
        scrollToNewContent('blogs-grid', previousCount, { 
          offset: 80,  // Offset to account for sticky header
          behavior: 'smooth'
        });
        
        // Update the counter
        currentlyDisplayedCount += articlesToDisplay.length;
        
        // Reset button state
        this.innerHTML = 'Load More';
        this.disabled = false;
        
        // Update load more button visibility
        updateLoadMoreButton();
      }, 600); // Simulate network delay
    });
  }
}

/**
 * Update load more button visibility
 */
function updateLoadMoreButton() {
  const loadMoreContainer = document.getElementById('load-more-container');
  const loadMoreBtn = document.getElementById('load-more-btn');
  
  if (!loadMoreContainer || !loadMoreBtn) return;
  
  const remainingArticles = filteredArticles.length - currentlyDisplayedCount;
  
  if (remainingArticles > 0) {
    // Show load more button
    loadMoreContainer.classList.remove('hidden');
    
    // Update button text to show remaining count
    loadMoreBtn.innerHTML = `Load More (${remainingArticles})`;
  } else {
    // Hide load more button
    loadMoreContainer.classList.add('hidden');
  }
}

/**
 * Load popular posts for the sidebar
 */
function loadPopularPosts() {
  const popularPostsContainer = document.getElementById('popular-posts-container');
  if (!popularPostsContainer) return;
  
  try {
    // Use dummy data for popular posts
    // Sort by views (random number for each post) and take top 3
    const popularArticles = [...dummyBlogs]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3);
    
    // If no articles, show message
    if (popularArticles.length === 0) {
      popularPostsContainer.innerHTML = `<p class="text-center text-gray-400 py-2">No articles available yet.</p>`;
      return;
    }
    
    // Create HTML for each popular post
    popularPostsContainer.innerHTML = popularArticles.map(article => {
      // Format date
      const date = new Date(article.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      });
      
      // Create HTML
      return `
        <div class="flex gap-3 group">
          <img src="${article.imageUrl}" 
               alt="${article.title}" 
               class="w-16 h-16 rounded object-cover">
          <div>
            <a href="./blog-detail.html?id=${article.id}" class="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium">
              ${article.title}
            </a>
            <p class="text-xs text-gray-400 mt-1">${date}</p>
          </div>
        </div>
      `;
    }).join('');
    
  } catch (error) {
















}  }    paginationContainer.innerHTML = ''; // Remove pagination elements  if (paginationContainer) {  const paginationContainer = document.getElementById('pagination-container');  // We can either remove it or keep it for future use  // This function is no longer needed as we're using Load More instead of paginationfunction initializePagination(totalItems) { */ * Initialize pagination controls/**}  }    popularPostsContainer.innerHTML = `<p class="text-center text-gray-400 py-2">Unable to load popular posts.</p>`;    console.error('Error loading popular posts:', error);