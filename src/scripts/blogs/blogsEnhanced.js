/**
 * Enhanced Blogs Page Script
 * Uses the new blog card components to display blog content
 */

import { getRecentBlogs } from '../actions/blogs/recentBlogs.js';
import { createBlogCard } from '../../components/blogCard.js';
import { createFeaturedBlogCard } from '../../components/featuredBlogCard.js';

document.addEventListener('DOMContentLoaded', async function() {
  // Initialize CategoryManager for category tabs
  initializeCategories();
  
  // Load articles with initial filter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFilter = urlParams.get('category') || '';
  await loadArticles(categoryFilter);
  
  // Load popular posts for the sidebar
  loadPopularPosts();
  
  // Initialize sort options
  const sortSelect = document.getElementById('sort-options');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      loadArticles(getCurrentCategoryFilter(), this.value);
    });
  }
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
      
      // Reload articles with new filter
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
async function loadArticles(categoryFilter = '', sortOption = 'newest') {
  const blogsGrid = document.getElementById('blogs-grid');
  const featuredContainer = document.getElementById('featured-article-container');
  
  if (!blogsGrid) return;
  
  // Show loading state
  blogsGrid.innerHTML = `
    <div class="col-span-full flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  `;
  
  try {
    // First, try to get articles from localStorage
    let articles = JSON.parse(localStorage.getItem('articles') || '[]');
    
    // If no stored articles, try to fetch from API or use dummy data
    if (articles.length === 0) {
      try {
        const fetchedBlogs = await getRecentBlogs();
        if (Array.isArray(fetchedBlogs)) {
          articles = fetchedBlogs.map(blog => ({
            id: blog._id,
            title: blog.title,
            description: blog.description || blog.subtitle || '',
            content: blog.content,
            author: blog.author || 'Ndevu',
            createdAt: blog.createdAt || new Date().toISOString(),
            imageUrl: blog.imageUrl || 'https://via.placeholder.com/800x450?text=NdevuSpace',
            category: blog.category?.[0] || '',
            tags: blog.tags || [],
            readTime: '5 min read',
            status: blog.status || 'published',
            views: blog.views || 0
          }));
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        articles = []; // Reset to empty if fetch fails
      }
    }
    
    // Filter by category if specified
    if (categoryFilter) {
      articles = articles.filter(article => article.category === categoryFilter);
    }
    
    // Sort articles
    switch (sortOption) {
      case 'newest':
        articles.sort((a, b) => new Date(b.createdAt || b.publishDate) - new Date(a.createdAt || a.publishDate));
        break;
      case 'oldest':
        articles.sort((a, b) => new Date(a.createdAt || a.publishDate) - new Date(b.createdAt || b.publishDate));
        break;
      case 'popular':
        articles.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }
    
    // Show empty state if no articles
    if (articles.length === 0) {
      blogsGrid.innerHTML = `
        <div class="col-span-full bg-secondary rounded-xl p-10 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 class="text-xl font-bold mb-2">No Articles Found</h3>
          <p class="text-gray-400">No articles available in this category yet. Check back later or try another category.</p>
        </div>
      `;
      
      // Clear featured article too
      if (featuredContainer) {
        featuredContainer.innerHTML = '';
      }
      
      return;
    }
    
    // Clear the container
    blogsGrid.innerHTML = '';
    
    // If we have at least one article, use the first one as featured
    if (articles.length > 0 && featuredContainer) {
      const featuredArticle = articles[0];
      
      // Format the blog data for the featured component
      const featuredBlogData = {
        id: featuredArticle.id,
        title: featuredArticle.title,
        description: featuredArticle.description,
        imageUrl: featuredArticle.imageUrl || featuredArticle.featuredImage,
        tags: featuredArticle.tags || [],
        author: featuredArticle.author || 'Ndevu',
        authorImage: featuredArticle.authorImage || '../images/mypic.png',
        date: featuredArticle.createdAt || featuredArticle.publishDate || new Date(),
        readTime: featuredArticle.readTime || '5 min read'
      };
      
      // Create featured card using our component
      const featuredBlogCard = createFeaturedBlogCard(featuredBlogData);
      
      // Add the featured article to the featured container
      featuredContainer.innerHTML = '';
      featuredContainer.appendChild(featuredBlogCard);
      
      // Remove the first article so we don't show it twice
      articles = articles.slice(1);
    }
    
    // Render the rest of the articles using our blog card component
    articles.forEach(article => {
      // Format the blog data for the component
      const blogData = {
        id: article.id,
        title: article.title,
        description: article.description,
        imageUrl: article.imageUrl || article.featuredImage,
        author: article.author || 'Ndevu',
        authorImage: article.authorImage || '../images/mypic.png',
        date: article.createdAt || article.publishDate || new Date(),
        category: article.category,
        isNew: article.status === 'new',
        tags: article.tags
      };
      
      // Create card using our component
      const blogCard = createBlogCard(blogData);
      
      // Add the card to the grid
      blogsGrid.appendChild(blogCard);
    });
    
    // Initialize pagination
    initializePagination(articles.length + 1); // +1 for featured article
    
  } catch (error) {
    console.error('Error loading articles:', error);
    blogsGrid.innerHTML = `
      <div class="col-span-full bg-secondary/70 rounded-xl p-10 text-center">
        <h3 class="text-xl font-bold mb-2">Error Loading Articles</h3>
        <p class="text-gray-400">There was a problem loading the articles. Please try again later.</p>
      </div>
    `;
  }
}

/**
 * Load popular posts for the sidebar
 */
function loadPopularPosts() {
  const popularPostsContainer = document.getElementById('popular-posts-container');
  if (!popularPostsContainer) return;
  
  try {
    // Get articles from localStorage
    let articles = JSON.parse(localStorage.getItem('articles') || '[]');
    
    // Sort by views and take the top 3
    const popularArticles = articles
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
      const date = new Date(article.createdAt || article.publishDate || new Date()).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      });
      
      // Create HTML
      return `
        <div class="flex gap-3 group">
          <img src="${article.imageUrl || 'https://via.placeholder.com/800x450?text=NdevuSpace'}" 
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
    console.error('Error loading popular posts:', error);
    popularPostsContainer.innerHTML = `<p class="text-center text-gray-400 py-2">Unable to load popular posts.</p>`;
  }
}

/**
 * Initialize pagination controls
 */
function initializePagination(totalItems) {
  // Use the pagination component if available
  if (typeof insertPagination === 'function') {
    insertPagination('#pagination-container', {
      currentPage: 1,
      totalPages: Math.ceil(totalItems / 8),
      onPageChange: function(page) {
        // In a real app, this would load the specific page
        console.log(`Loading page ${page}`);
        // loadArticles(getCurrentCategoryFilter(), undefined, page);
      }
    });
  } else {
    console.warn('Pagination component not loaded.');
  }
}
