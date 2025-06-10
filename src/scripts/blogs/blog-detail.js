/**
 * Blog Detail Page Script
 * Loads and displays the blog article details
 */

import { getBlogById } from '../actions/blogs/blogActions.js';
import { showNotification } from '../../utils/notificationUtils.js';
import { 
  updateBlogHeader, 
  updateBlogContent, 
  updateCategoryDisplay, 
  updateBlogTags, 
  loadRelatedArticles, 
  setupCopyLinkButton,
  showLoading,
  hideLoading,
  loadAdjacentBlogPosts,
} from '../../utils/blogUtils.js';
import { 
  setupCommentForm, 
  displayComments 
} from '../../utils/commentUtils.js';
import {
  generateTableOfContents,
  initTableOfContents,
  setupTocToggle
} from '../../utils/tocUtils.js';
import {
  setupLikeButton,
  setupSubscribeForm
} from '../../utils/interactionUtils.js';

document.addEventListener('DOMContentLoaded', async function() {
  // Get blog ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');
  
  // Show loading state
  showLoading();
  
  // If no ID is provided, show error and link to blogs page
  if (!blogId) {
    hideLoading();
    document.querySelector('.blog-content').innerHTML = `
      <div class="text-center py-10">
        <div class="text-yellow-500 text-4xl mb-4"><i class="fas fa-exclamation-triangle"></i></div>
        <h2 class="text-2xl font-bold mb-2">Blog Post Not Found</h2>
        <p class="text-gray-400 mb-4">The blog post you're looking for doesn't exist or has been removed.</p>
        <a href="./blogs.html" class="bg-yellow-500 text-black px-4 py-2 rounded-lg inline-block hover:bg-yellow-400 transition-colors">
          Browse All Articles
        </a>
      </div>
    `;
    showNotification('Blog post not found', 'error');
    return;
  }

  try {
    // Get blog data from API
    const blogData = await getBlogById(blogId);
    
    if (!blogData) {
      throw new Error('Blog not found');
    }

    // Update page title
    document.title = `${blogData.title} | NdevuSpace`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = blogData.description || blogData.title;
    }

    // Update the blog header
    updateBlogHeader(blogData);
    
    // Update the blog content
    updateBlogContent(blogData);
    
    // Update the blog category in breadcrumbs using CategoryManager
    updateCategoryDisplay(blogData.category?._id || blogData.category);
    
    // Update tags
    updateBlogTags(blogData.tags);
    
    // Load related articles
    loadRelatedArticles(blogData.category?._id || blogData.category, blogId);
    
    // Setup comment form
    setupCommentForm(blogId);
    
    // Display comments if they exist
    if (blogData.comments) {
      displayComments(blogData.comments);
    }
    
    // Setup like button
    setupLikeButton(blogId, blogData.likes || 0);
    
    // Setup subscribe form in sidebar
    setupSubscribeForm();
    
    // Load adjacent blog posts for navigation
    loadAdjacentBlogPosts(blogId, blogData);
    
    // Generate table of contents
    generateTableOfContents();
    
    // Remove loading indicator
    document.getElementById('loading-indicator')?.remove();
    
    // Hide loading state
    hideLoading();
    
    // Initialize interactive elements
    initTableOfContents();
    setupCopyLinkButton();
  } catch (error) {
    // Hide loading state
    hideLoading();
    
    console.error('Error loading blog:', error);
    
    // Show error message
    document.querySelector('.blog-content').innerHTML = `
      <div class="text-center py-10">
        <div class="text-yellow-500 text-4xl mb-4"><i class="fas fa-exclamation-triangle"></i></div>
        <h2 class="text-2xl font-bold mb-2">Blog Post Not Found</h2>
        <p class="text-gray-400 mb-4">${error.message || 'The blog post you\'re looking for doesn\'t exist or has been removed.'}</p>
        <a href="./blogs.html" class="bg-yellow-500 text-black px-4 py-2 rounded-lg inline-block hover:bg-yellow-400 transition-colors">
          Browse All Articles
        </a>
      </div>
    `;
    showNotification(`Error: ${error.message || 'Failed to load blog'}`, 'error');
  }
});
