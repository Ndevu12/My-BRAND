/**
 * Homepage Blog Section Script
 * Dynamically loads and displays latest blogs on the homepage
 */

import { getRecentBlogs } from '../actions/blogs/recentBlogs.js';

/**
 * Create a homepage blog card element
 * @param {Object} blog - Blog data object
 * @returns {HTMLElement} The card element
 */
function createHomepageBlogCard(blog) {
  const article = document.createElement('div');
  article.className = 'card flex flex-col md:flex-row gap-4 group cursor-pointer';
  
  const dateValue = blog.createdAt;
  const date = new Date(dateValue);
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  // Handle different ID property names
  const blogId = blog.id || blog._id || blog.blogId;

  // Handle tags - could be array of strings or objects
  let tagsHtml = '';
  if (blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0) {
    tagsHtml = blog.tags.slice(0, 2).map(tag => {
      const tagName = typeof tag === 'string' ? tag : (tag.name || tag.label || tag);
      return `<span class="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">${tagName}</span>`;
    }).join('');
  }

  // Handle different property names for description
  const description = blog.description || blog.excerpt || blog.summary || 'No description available.';
  
  // Handle different property names for image
  const imageUrl = blog.imageUrl || blog.image || blog.thumbnail || blog.featuredImage || './src/images/mypic.png';

  // Handle read time
  const readTime = blog.readTime || blog.readingTime || blog.estimatedReadTime || '5 min read';
  
  // Handle views
  const views = blog.views || blog.viewCount || 0;

  // Create blog card HTML
  article.innerHTML = `
    <div class="w-full md:w-2/3">
      <div class="flex items-center gap-2 mb-2">
        ${tagsHtml}
        <span class="text-xs text-gray-400">${formattedDate}</span>
      </div>
      <h3 class="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
        ${blog.title || 'Untitled'}
      </h3>
      <p class="text-gray-300 line-clamp-3">
        ${description}
      </p>
      <div class="flex items-center gap-2 mt-3">
        <span class="text-sm text-gray-400">${readTime}</span>
        <span class="text-gray-600">•</span>
        <span class="text-sm text-gray-400">${views} views</span>
      </div>
    </div>
    <div class="w-full md:w-1/3 overflow-hidden rounded-lg">
      <img src="${imageUrl}" 
           class="w-full h-32 md:h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
           alt="${blog.title || 'Blog post'}"
           loading="lazy"
           onerror="this.src='./src/images/mypic.png'">
    </div>
  `;

  // Add click event to navigate to blog detail
  article.addEventListener('click', () => {
    if (blogId) {
      window.location.href = `./src/pages/blog-detail.html?id=${blogId}`;
    } else {
      console.warn('No blog ID found for navigation');
    }
  });

  return article;
}

/**
 * Load and display blogs in the homepage blog section
 */
async function loadHomepageBlogs() {
  const blogContainer = document.getElementById('homepage-blog-container');
  
  if (!blogContainer) {
    console.warn('Homepage blog container not found');
    return;
  }
  try {
    // Show loading state
    blogContainer.innerHTML = `
      <div class="col-span-full flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    `;    // Fetch recent blogs from API (limit to 4 for homepage)
    let blogs = await getRecentBlogs(4);
    blogs = blogs.blogs;

    // Clear loading state
    blogContainer.innerHTML = '';

    if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
      blogContainer.innerHTML = `
        <div class="col-span-full text-center py-12">
          <p class="text-gray-400 text-lg">No blog posts available at the moment.</p>
          <p class="text-gray-500 text-sm mt-2">Check back soon for new content!</p>
        </div>
      `;
      return;
    }

    // Create and append blog cards
    blogs.forEach(blog => {
      const blogCard = createHomepageBlogCard(blog);
      blogContainer.appendChild(blogCard);
    });
  } catch (error) {
    console.error('Error loading homepage blogs:', error);
    
    // Show error state - no fallback to dummy data
    blogContainer.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="text-red-400 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-gray-400 text-lg">Unable to load blog posts</p>
        <p class="text-gray-500 text-sm mt-2">Please check your internet connection and try again</p>
        <button onclick="loadHomepageBlogs()" class="mt-4 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors">
          Retry
        </button>
      </div>
    `;
  }
}

/**
 * Initialize homepage blog functionality
 */
function initHomepageBlogs() {
  // Load blogs when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHomepageBlogs);
  } else {
    loadHomepageBlogs();
  }
}

// Export functions for module use
export { loadHomepageBlogs, createHomepageBlogCard, initHomepageBlogs };

// Make functions available globally for non-module use
if (typeof window !== 'undefined') {
  window.loadHomepageBlogs = loadHomepageBlogs;
  window.createHomepageBlogCard = createHomepageBlogCard;
  window.initHomepageBlogs = initHomepageBlogs;
}

// Auto-initialize if this script is loaded directly
initHomepageBlogs();
