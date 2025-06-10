/**
 * User Interaction Utilities
 * Utility functions for user interactions like subscriptions and likes
 */

import { subscribe } from '../scripts/actions/subscribers/subscriberActions.js';
import { likeBlog } from '../scripts/actions/blogs/blogActions.js';
import { showNotification } from './notificationUtils.js';

/**
 * Setup the like button
 * @param {string} blogId - The blog ID
 * @param {number} initialLikes - Initial like count
 */
export function setupLikeButton(blogId, initialLikes) {
  // In the updated HTML, we need to find the like buttons in the comments section
  // Since the main article doesn't have a dedicated like button, we'll add one
  
  const articleActions = document.querySelector('.article-actions');
  if (!articleActions) {
    // Create article actions if they don't exist
    const articleElement = document.querySelector('article');
    if (articleElement) {
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'article-actions flex items-center gap-4 mt-6';
      actionsDiv.innerHTML = `
        <button class="like-button flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
          <i class="far fa-heart"></i>
          <span class="like-count">${initialLikes || 0}</span>
        </button>
      `;
      // Find where to insert it - after the content
      const contentDiv = articleElement.querySelector('.blog-content');
      if (contentDiv) {
        contentDiv.parentNode.insertBefore(actionsDiv, contentDiv.nextSibling);
      }
    }
  }

  // Now find the like button
  const likeButton = document.querySelector('.like-button');
  const likeCount = document.querySelector('.like-count');
  
  if (likeButton && likeCount) {
    // Set initial like count
    likeCount.textContent = initialLikes;
    
    // Check if user already liked the blog
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
    if (likedBlogs.includes(blogId)) {
      likeButton.classList.add('text-red-500');
      likeButton.classList.add('liked');
      likeButton.innerHTML = '<i class="fas fa-heart"></i>';
    }
    
    // Handle like button click
    likeButton.addEventListener('click', async function() {
      try {
        // Call like API
        const result = await likeBlog(blogId);
        
        // Update like count
        if (result.blog && result.blog.likes !== undefined) {
          likeCount.textContent = result.blog.likes;
        }
        
        // Toggle liked state
        likeButton.classList.toggle('text-red-500');
        likeButton.classList.toggle('liked');
        
        // Store liked state in local storage
        const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
        
        if (likeButton.classList.contains('liked')) {
          // Add to liked blogs if not already there
          if (!likedBlogs.includes(blogId)) {
            likedBlogs.push(blogId);
            localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
          }
          likeButton.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
          // Remove from liked blogs
          const updatedLikedBlogs = likedBlogs.filter(id => id !== blogId);
          localStorage.setItem('likedBlogs', JSON.stringify(updatedLikedBlogs));
          likeButton.innerHTML = '<i class="far fa-heart"></i>';
        }
        
        showNotification('Thanks for your feedback!', 'success');
      } catch (error) {
        showNotification(`Error liking blog: ${error.message}`, 'error');
      }
    });
  }
}

/**
 * Setup the subscribe form
 */
export function setupSubscribeForm() {
  const subscribeForm = document.querySelector('.bg-secondary form');
  
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const emailInput = subscribeForm.querySelector('input[type="email"]');
      const submitButton = subscribeForm.querySelector('button[type="submit"]');
      
      // Validate inputs
      if (!emailInput) return;
      
      if (!emailInput.value) {
        showNotification('Please enter your email address', 'warning');
        return;
      }
        // Show loading state
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Subscribing...`;
      
      try {
        // Create subscriber object
        const subscriberData = {
          email: emailInput.value
        };
        
        // Submit subscription
        await subscribe(subscriberData);
        
        // Reset form
        emailInput.value = '';
        
        // Show success message
        showNotification('Subscribed successfully!', 'success');
      } catch (error) {
        showNotification(`Error subscribing: ${error.message}`, 'error');
      } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    });
  }
}
