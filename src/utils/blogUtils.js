/**
 * Blog Utilities
 * Utility functions for blog-related functionality
 */
import { getCategoryBadgeHTML } from './categoryUtils.js';
import { getBlogsByCategory, getAllBlogs } from '../scripts/actions/blogs/blogActions.js';

/**
 * Update blog header information
 * @param {Object} blog - The blog data object
 */
export function updateBlogHeader(blog) {
  const headerElement = document.querySelector('header.mb-8');
  if (!headerElement) return;
  
  // If using a breadcrumb with category, update it
  const categoryBreadcrumb = document.querySelector('.category-breadcrumb');
  if (categoryBreadcrumb && window.categoryManager) {
    const category = window.categoryManager.getCategory(blog.category);
    if (category) {
      categoryBreadcrumb.href = `./blogs.html?category=${blog.category}`;
      categoryBreadcrumb.innerHTML = category.name;
    }
  }
  
  // Update subtitle in header if not already handled in updateBlogContent
  const subtitleElement = document.getElementById('blog-subtitle');
  if (subtitleElement && blog.subtitle && subtitleElement.classList.contains('hidden')) {
    subtitleElement.textContent = blog.subtitle;
    subtitleElement.classList.remove('hidden');
  }
  
  // Update read time if not done elsewhere
  if (blog.readTime) {
    const readTimeElement = document.querySelector('.read-time');
    if (readTimeElement) {
      const svgIcon = readTimeElement.querySelector('svg');
      if (svgIcon) {
        readTimeElement.innerHTML = '';
        readTimeElement.appendChild(svgIcon);
        readTimeElement.appendChild(document.createTextNode(' ' + blog.readTime));
      } else {
        readTimeElement.textContent = blog.readTime;
      }
    }
  }
}

/**
 * Update the main blog content
 * @param {Object} blog - The blog data object
 */
export function updateBlogContent(blog) {
  // Set main blog elements
  const titleElement = document.querySelector('h1');
  const subtitleElement = document.getElementById('blog-subtitle');
  const dateElement = document.querySelector('.blog-date');
  const authorElement = document.querySelector('.blog-author');
  const featuredImageElement = document.querySelector('.featured-image');
  const contentElement = document.querySelector('.blog-content');
  const readTimeElement = document.querySelector('.read-time');
  
  if (titleElement) titleElement.textContent = blog.title;
  
  // Handle subtitle display
  if (subtitleElement && blog.subtitle) {
    subtitleElement.textContent = blog.subtitle;
    subtitleElement.classList.remove('hidden');
  } else if (subtitleElement) {
    subtitleElement.classList.add('hidden');
  }
  
  if (dateElement) {
    const date = new Date(blog.createdAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Keep the SVG icon intact
    const svgIcon = dateElement.querySelector('svg');
    if (svgIcon) {
      dateElement.innerHTML = '';
      dateElement.appendChild(svgIcon);
      dateElement.appendChild(document.createTextNode(' ' + date));
    } else {
      dateElement.textContent = date;
    }
  }
  
  if (authorElement) authorElement.textContent = blog.author || 'Ndevu';
  if (featuredImageElement) featuredImageElement.src = blog.imageUrl;
  if (contentElement) contentElement.innerHTML = blog.content;
  
  // Update read time if available
  if (readTimeElement && blog.readTime) {
    const svgIcon = readTimeElement.querySelector('svg');
    if (svgIcon) {
      readTimeElement.innerHTML = '';
      readTimeElement.appendChild(svgIcon);
      readTimeElement.appendChild(document.createTextNode(' ' + blog.readTime));
    } else {
      readTimeElement.textContent = blog.readTime;
    }
  }
}

/**
 * Update category display in breadcrumbs using CategoryManager
 * @param {string} categoryId - The category ID
 */
export function updateCategoryDisplay(categoryId) {
  const categoryDisplay = document.querySelector('.category-display');
  if (!categoryDisplay) return;

  // Check if CategoryManager is available globally
  if (window.categoryManager) {
    const category = window.categoryManager.getCategory(categoryId);
    if (category) {
      // Update breadcrumb with category name and styling
      categoryDisplay.innerHTML = `
        <span class="${category.textClass}">
          <i class="fas ${category.icon} mr-1"></i>
          ${category.name}
        </span>
      `;
      
      // Also update category link in breadcrumb navigation
      const categoryLink = categoryDisplay.closest('a');
      if (categoryLink) {
        categoryLink.href = `./blogs.html?category=${categoryId}`;
      }
    } else {
      categoryDisplay.textContent = categoryId || 'Uncategorized';
    }
  } else {
    // Fallback if category manager not available
    const categories = {
      programming: "Programming",
      webdev: "Web Development",
      design: "UX/UI Design",
      technology: "Technology",
      entrepreneurship: "Entrepreneurship"
    };
    categoryDisplay.textContent = categories[categoryId] || categoryId || 'Uncategorized';
  }
}

/**
 * Update blog tags display
 * @param {Array} tags - Array of tag strings
 */
export function updateBlogTags(tags) {
  const tagsContainer = document.querySelector('.blog-tags');
  if (!tagsContainer || !tags || !Array.isArray(tags)) return;
  
  tagsContainer.innerHTML = tags.map(tag => `
    <a href="./blogs.html?tag=${encodeURIComponent(tag)}" class="px-3 py-1 bg-secondary text-gray-300 hover:bg-yellow-500 hover:text-black rounded-full text-sm transition-colors">
      ${tag}
    </a>
  `).join('');
}

/**
 * Load related articles based on the current article's category
 * @param {string} categoryId - The category ID
 * @param {string} currentBlogId - The current blog ID to exclude from results
 */
export async function loadRelatedArticles(categoryId, currentBlogId) {
  const relatedArticlesContainer = document.querySelector('.related-articles');
  if (!relatedArticlesContainer) return;

  try {
    // Get related articles by category from API
    let relatedArticles = [];
    
    // If we have a valid category ID, fetch blogs by that category
    if (categoryId) {
      try {
        const blogs = await getBlogsByCategory(categoryId);
        if (blogs && blogs.length > 0) {
          // Filter out the current blog and limit to 3
          relatedArticles = blogs
            .filter(blog => blog._id !== currentBlogId)
            .slice(0, 3);
        }
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
    }
    
    // If no related articles by category or error occurred, get recent blogs
    if (relatedArticles.length === 0) {
      try {
        const recentBlogs = await getAllBlogs();
        if (recentBlogs && recentBlogs.length > 0) {
          // Filter out the current blog and limit to 3
          relatedArticles = recentBlogs
            .filter(blog => blog._id !== currentBlogId)
            .slice(0, 3);
        }
      } catch (error) {
        console.error('Error fetching recent blogs:', error);
      }
    }
    
    // Display related articles
    if (relatedArticles.length > 0) {
      relatedArticlesContainer.innerHTML = relatedArticles.map(article => {
        // Get formatted date
        const date = new Date(article.createdAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        });
        
        // Get category badge HTML using our utility function
        const categoryBadge = article.category ? getCategoryBadgeHTML(article.category._id || article.category, true) : '';
        
        return `
          <div class="flex gap-3 group">
            <img src="${article.imageUrl || 'https://via.placeholder.com/800x450?text=NdevuSpace'}" 
                alt="${article.title}" 
                class="w-16 h-16 rounded object-cover">
            <div>
              <div class="mb-1">${categoryBadge}</div>
              <a href="./blog-detail.html?id=${article._id}" class="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium">
                ${article.title}
              </a>
              <p class="text-xs text-gray-400 mt-1">${date}</p>
            </div>
          </div>
        `;
      }).join('');
    } else {
      relatedArticlesContainer.innerHTML = `
        <p class="text-sm text-gray-400">No related articles found.</p>
      `;
    }
  } catch (error) {
    console.error('Error loading related articles:', error);
    relatedArticlesContainer.innerHTML = `
      <p class="text-sm text-gray-400">Unable to load related articles.</p>
    `;
  }
}

/**
 * Load adjacent blog posts (previous and next) for navigation
 * @param {string} currentBlogId - The ID of the current blog post
 * @param {Object} currentBlog - The current blog data object
 */
export async function loadAdjacentBlogPosts(currentBlogId, currentBlog) {
  // Find the container for the article navigation
  const navigationContainer = document.querySelector('.article-navigation');
  if (!navigationContainer) return;
  try {
    // Get all blogs to determine the order
    const allBlogs = await getAllBlogs();
    if (!Array.isArray(allBlogs) || allBlogs.length === 0) {
      console.warn('No blogs found when trying to load adjacent posts');
      return;
    }
    
    // Sort blogs by date (most recent first)
    const sortedBlogs = [...allBlogs].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date();
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date();
      return dateB - dateA;
    });// Find the index of the current blog
    const currentIndex = sortedBlogs.findIndex(blog => 
      blog._id === currentBlogId || blog.id === currentBlogId
    );

    if (currentIndex === -1) {
      console.warn('Current blog not found in the sorted list');
      return;
    }

    let prevBlog = null;
    let nextBlog = null;

    // Define previous and next blogs
    // We're ensuring both next and previous blogs are properly assigned
    if (currentIndex > 0) {
      nextBlog = sortedBlogs[currentIndex - 1]; // More recent = next
    }
    
    if (currentIndex < sortedBlogs.length - 1) {
      prevBlog = sortedBlogs[currentIndex + 1]; // Less recent = previous
    }// Generate HTML for navigation with improved sizing and mobile compatibility
    const navigationHTML = `
      <div class="max-w-6xl mx-auto px-4 py-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${prevBlog ? `
            <a href="./blog-detail.html?id=${prevBlog._id || prevBlog.id}" class="group flex items-center p-4 rounded-lg hover:bg-[#1f1f3d] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-400 group-hover:text-yellow-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <div class="truncate">
                <p class="text-sm text-gray-400">Previous Article</p>
                <p class="font-medium text-base group-hover:text-yellow-400 transition-colors truncate">${prevBlog.title}</p>
              </div>
            </a>
          ` : `<div class="hidden md:block"></div>`}
          
          ${nextBlog ? `
            <a href="./blog-detail.html?id=${nextBlog._id || nextBlog.id}" class="group flex items-center justify-end p-4 rounded-lg hover:bg-[#1f1f3d] transition-colors ${!prevBlog ? 'col-span-2' : ''}">
              <div class="text-right truncate">
                <p class="text-sm text-gray-400">Next Article</p>
                <p class="font-medium text-base group-hover:text-yellow-400 transition-colors truncate">${nextBlog.title}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-3 text-gray-400 group-hover:text-yellow-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ` : `<div class="hidden md:block"></div>`}
        </div>
      </div>
    `;    // Update the navigation container and ensure proper styling
    navigationContainer.innerHTML = navigationHTML;
    
    // Ensure the navigation container has the correct styling classes
    navigationContainer.className = 'bg-secondary border-t border-gray-700/50 article-navigation w-full';
    
    // Add additional styles to ensure links are properly styled
    const navigationLinks = navigationContainer.querySelectorAll('a');
    navigationLinks.forEach(link => {
      // Make sure hover effects and transitions are working
      link.addEventListener('mouseenter', () => {
        const arrowIcon = link.querySelector('svg');
        if (arrowIcon) arrowIcon.classList.add('text-yellow-400');
        
        const titleElement = link.querySelector('.font-medium');
        if (titleElement) titleElement.classList.add('text-yellow-400');
      });
      
      link.addEventListener('mouseleave', () => {
        const arrowIcon = link.querySelector('svg');
        if (arrowIcon && !arrowIcon.classList.contains('group-hover:text-yellow-400')) {
          arrowIcon.classList.remove('text-yellow-400');
        }
        
        const titleElement = link.querySelector('.font-medium');
        if (titleElement && !titleElement.classList.contains('group-hover:text-yellow-400')) {
          titleElement.classList.remove('text-yellow-400');
        }
      });
    });
  } catch (error) {
    console.error('Error loading adjacent blog posts:', error);
  }
}

/**
 * Display error message on the page
 * @param {string} message - The error message to display
 */
export function displayErrorMessage(message) {
  const container = document.querySelector('main') || document.body;
  const errorDiv = document.createElement('div');
  
  errorDiv.className = 'bg-red-600 text-white p-4 rounded-lg my-8 text-center';
  errorDiv.textContent = message;
  
  container.prepend(errorDiv);
}

/**
 * Setup copy link button functionality
 */
export function setupCopyLinkButton() {
  const copyLinkButton = document.querySelector('button[title="Copy link to clipboard"]');
  if (copyLinkButton) {
    copyLinkButton.addEventListener('click', function() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        // Visual feedback for copy success
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        `;
        setTimeout(() => {
          this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          `;
        }, 2000);
      });
    });
  }
}

/**
 * Show loading state
 */
export function showLoading() {
  // Add loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'fixed inset-0 bg-primary bg-opacity-75 flex items-center justify-center z-50';
  loadingOverlay.id = 'loading-overlay';
  
  loadingOverlay.innerHTML = `
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      <p class="mt-2 text-yellow-500">Loading blog...</p>
    </div>
  `;
  
  document.body.appendChild(loadingOverlay);
}

/**
 * Hide loading state
 */
export function hideLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.remove();
  }
}
