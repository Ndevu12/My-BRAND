/**
 * Public Blogs Page Script
 * Handles displaying blog posts on the public-facing blogs page
 * Fetches blog data from the server API
 */

// Import utility functions
import { fetchBlogs, searchBlogs, fetchPopularBlogs, sortBlogs } from '../../utils/blogApiUtils.js';
import { 
  displayFeaturedArticle, 
  displayArticleGrid, 
  showLoader, 
  showErrorMessage,
  showEmptyState,
  loadMoreArticles
} from '../../utils/blogDisplayUtils.js';
import {
  setupSearch,
  setupLoadMoreButton,
  updateLoadMoreButton,
  getCurrentCategoryFilter,
  initializeCategories
} from '../../utils/blogUiUtils.js';

// Configuration for blog display
const BLOGS_PER_PAGE = 4; // Number of blogs to show initially and on each "Load More" click
let currentlyDisplayedCount = 0;
let filteredArticles = [];

document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const blogsGrid = document.getElementById('blogs-grid');
  const featuredContainer = document.getElementById('featured-article-container');
  const loadMoreContainer = document.getElementById('load-more-container');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const sortSelect = document.getElementById('sort-options');
  
  // Initialize CategoryManager for category tabs
  initializeCategories(function(categoryId) {
    // Reset display count when category changes
    currentlyDisplayedCount = 0;
    loadArticles(categoryId);
  });
  
  // Load articles with initial filter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFilter = urlParams.get('category') || '';
  const searchQuery = urlParams.get('search') || '';
  
  // Initialize with either search results or category filter
  if (searchQuery) {
    loadSearchResults(searchQuery);
  } else {
    loadArticles(categoryFilter);
  }
  
  // Load popular posts for the sidebar
  loadPopularPosts();
  
  // Set up search functionality
  setupSearch(function(searchQuery) {
    // Update URL to reflect search query
    const url = new URL(window.location);
    url.searchParams.set('search', searchQuery);
    url.searchParams.delete('category'); // Remove category filter when searching
    window.history.pushState({}, '', url);
    
    // Reset the active category tab if using CategoryManager
    if (window.categoryManager) {
      const allCategoriesTab = document.querySelector('.category-tab[data-category=""]');
      if (allCategoriesTab) {
        window.categoryManager.setActiveTab(allCategoriesTab);
      }
    }
    
    // Load search results
    loadSearchResults(searchQuery);
  });
  
  // Add options to the sort dropdown if it exists
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
  if (loadMoreBtn) {
    setupLoadMoreButton(loadMoreBtn, function() {
      const categoryFilter = getCurrentCategoryFilter();
      const sortOption = sortSelect ? sortSelect.value : 'newest';
      
      // Get the next batch of articles
      const articlesToDisplay = filteredArticles.slice(
        currentlyDisplayedCount, 
        currentlyDisplayedCount + BLOGS_PER_PAGE
      );
      
      // Load more articles with animation
      loadMoreArticles(articlesToDisplay, blogsGrid, function() {
        // Update the counter
        currentlyDisplayedCount += articlesToDisplay.length;
        
        // Update load more button visibility
        updateLoadMoreButton(loadMoreBtn, loadMoreContainer, filteredArticles.length - currentlyDisplayedCount);
      });
    });
  }
});

/**
 * Load and display articles with optional filtering and sorting
 */
async function loadArticles(categoryFilter = '', sortOption = 'newest') {
  const blogsGrid = document.getElementById('blogs-grid');
  const featuredContainer = document.getElementById('featured-article-container');
  const loadMoreContainer = document.getElementById('load-more-container');
  const loadMoreBtn = document.getElementById('load-more-btn');
  
  if (!blogsGrid) return;
  
  // Show loading state
  showLoader(blogsGrid);
  
  try {
    // Fetch blogs from API
    const blogs = await fetchBlogs(categoryFilter);
    
    // Store fetched blogs in filteredArticles and sort them
    filteredArticles = sortBlogs(blogs, sortOption);
    
    // Show empty state if no articles
      // Show empty state if no articles
    if (filteredArticles.length === 0) {
      showEmptyState(
        blogsGrid, 
        "No Articles Found", 
        "No articles available in this category yet. Check back later or try another category."
      );
      
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
      if (featuredContainer && filteredArticles.length > 0) {
        displayFeaturedArticle(filteredArticles[0], featuredContainer);
        
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
    displayArticleGrid(articlesToDisplay, blogsGrid);
    
    // Update the counter
    currentlyDisplayedCount += articlesToDisplay.length;
    
    // Update load more button visibility
    if (loadMoreBtn && loadMoreContainer) {
      updateLoadMoreButton(loadMoreBtn, loadMoreContainer, filteredArticles.length - currentlyDisplayedCount);
    }
    
  } catch (error) {
    console.error('Error loading articles:', error);
    showErrorMessage(
      blogsGrid,
      "Error Loading Articles",
      "There was a problem loading the articles. Please try again later."
    );
    
    // Hide load more button
    if (loadMoreContainer) {
      loadMoreContainer.classList.add('hidden');
    }
  }
}

/**
 * Load search results based on query
 */
async function loadSearchResults(query) {
  const blogsGrid = document.getElementById('blogs-grid');
  const featuredContainer = document.getElementById('featured-article-container');
  const loadMoreContainer = document.getElementById('load-more-container');
  const loadMoreBtn = document.getElementById('load-more-btn');
  
  if (!blogsGrid) return;
  
  // Show loading state
  showLoader(blogsGrid);
  
  try {
    // Update the search input with the query
    const searchInput = document.querySelector('input[placeholder*="Search articles"]');
    if (searchInput) {
      searchInput.value = query;
    }
    
    // Fetch search results from API
    const blogs = await searchBlogs(query);
    
    // Store fetched blogs in filteredArticles
    filteredArticles = blogs;
    
    // Show empty state if no articles found
    if (filteredArticles.length === 0) {
      showEmptyState(
        blogsGrid,
        "No Results Found",
        `No articles found matching "${query}". Try a different search term or browse by category.`,
        "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" // Sad face icon
      );
      
      // Clear featured article and hide load more button
      if (featuredContainer) {
        featuredContainer.innerHTML = '';
      }
      
      if (loadMoreContainer) {
        loadMoreContainer.classList.add('hidden');
      }
      
      return;
    }
    
    // Reset display counter
    currentlyDisplayedCount = 0;
    
    // Clear the grid for new results
    blogsGrid.innerHTML = '';
    
    // Display featured article if we have results
    if (featuredContainer && filteredArticles.length > 0) {
      displayFeaturedArticle(filteredArticles[0], featuredContainer);
      
      // Skip the featured article in the regular grid
      currentlyDisplayedCount = 1;
    }
    
    // Get the next batch of articles to display
    const articlesToDisplay = filteredArticles.slice(
      currentlyDisplayedCount, 
      currentlyDisplayedCount + BLOGS_PER_PAGE
    );
    
    // Render the current batch of articles
    displayArticleGrid(articlesToDisplay, blogsGrid);
    
    // Update the counter
    currentlyDisplayedCount += articlesToDisplay.length;
    
    // Update load more button visibility
    if (loadMoreBtn && loadMoreContainer) {
      updateLoadMoreButton(loadMoreBtn, loadMoreContainer, filteredArticles.length - currentlyDisplayedCount);
    }
    
  } catch (error) {
    console.error('Error searching articles:', error);
    showErrorMessage(
      blogsGrid,
      "Error Searching Articles",
      "There was a problem searching for articles. Please try again later."
    );
    
    // Hide load more button
    if (loadMoreContainer) {
      loadMoreContainer.classList.add('hidden');
    }
  }
}

/**
 * Load popular posts for the sidebar
 */
async function loadPopularPosts() {
  const popularPostsContainer = document.getElementById('popular-posts-container');
  if (!popularPostsContainer) return;
  
  try {
    // Show loading state
    popularPostsContainer.innerHTML = `
      <div class="flex justify-center py-4">
        <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    `;

    // Fetch popular blogs (top 3 by likes)
    const popularArticles = await fetchPopularBlogs(3);
    
    // If no articles, show message
    if (!popularArticles || popularArticles.length === 0) {
      popularPostsContainer.innerHTML = `<p class="text-center text-gray-400 py-2">No articles available yet.</p>`;
      return;
    }
    
    // Create HTML for each popular post
    popularPostsContainer.innerHTML = popularArticles.map(article => {
      if (!article) return '';
      
      // Format date
      const date = article.createdAt ? new Date(article.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      }) : '';
      
      // Create HTML
      return `
        <div class="flex gap-3 group">
          <img src="${article.imageUrl || '../images/blogImages/programming.jfif'}" 
               alt="${article.title || 'Blog post'}" 
               class="w-16 h-16 rounded object-cover">
          <div>
            <a href="./blog-detail.html?id=${article._id}" class="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium">
              ${article.title || 'Untitled Article'}
            </a>
            <p class="text-xs text-gray-400 mt-1">${date}</p>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Error loading popular posts:', error);
    popularPostsContainer.innerHTML = `<p class="text-center text-gray-400 py-2">Unable to load popular posts.</p>`;
  }
}
