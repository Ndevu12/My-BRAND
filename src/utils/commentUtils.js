/**
 * Comment Utilities
 * Utility functions for handling blog comments
 */

import { addComment, deleteComment } from '../scripts/actions/blogs/commentActions.js';
import { showNotification } from './notificationUtils.js';

/**
 * Setup the comment form
 * @param {string} blogId - The blog ID
 */
export function setupCommentForm(blogId) {
  const commentForm = document.querySelector('form.mb-10');
  
  if (commentForm) {
    commentForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const nameInput = commentForm.querySelector('input[placeholder="Name"]');
      const emailInput = commentForm.querySelector('input[placeholder="Email"]');
      const contentInput = commentForm.querySelector('textarea');
      const submitButton = commentForm.querySelector('button[type="submit"]');
      
      // Validate inputs
      if (!nameInput.value || !emailInput.value || !contentInput.value) {
        showNotification('Please fill in all fields', 'warning');
        return;
      }
      
      // Show loading state
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Posting...`;
      
      try {
        // Create comment object
        const commentData = {
          blogId: blogId,
          name: nameInput.value,
          email: emailInput.value,
          content: contentInput.value
        };
        
        // Submit comment
        const comment = await addComment(commentData);
        
        // Reset form
        nameInput.value = '';
        emailInput.value = '';
        contentInput.value = '';
        
        // Show success message
        showNotification('Comment posted successfully!', 'success');
        
        // Reload page to show new comment
        setTimeout(() => {
          location.reload();
        }, 1500);
      } catch (error) {
        showNotification(`Error posting comment: ${error.message}`, 'error');
      } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    });
  }
}

/**
 * Display comments for a blog
 * @param {Array} comments - Array of comment objects
 */
export function displayComments(comments) {
  const commentsContainer = document.querySelector('.space-y-6');
  const commentsCount = document.querySelector('h3.text-2xl span');
  
  if (!commentsContainer) return;
  
  // Update comment count
  if (commentsCount) {
    commentsCount.textContent = `(${comments.length})`;
  }
  
  // Clear existing comments
  commentsContainer.innerHTML = '';
  
  if (!comments || comments.length === 0) {
    // No comments yet
    commentsContainer.innerHTML = `
      <div class="text-center py-8 text-gray-400">
        <i class="far fa-comment-dots text-3xl mb-2"></i>
        <p>No comments yet. Be the first to comment!</p>
      </div>
    `;
    return;
  }
  
  // Sort comments by date (newest first)
  const sortedComments = [...comments].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  // Add each comment
  sortedComments.forEach(comment => {
    const commentDate = new Date(comment.createdAt);
    const formattedDate = commentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    const commentElement = document.createElement('div');
    commentElement.className = 'border-b border-gray-700/50 pb-6 mb-6';
    commentElement.dataset.commentId = comment._id;
    
    // Generate initial avatar from name (first letter)
    const initial = (comment.name && comment.name[0]) || 'A';
    const randomColor = getAvatarColor(comment.name || '');
    
    commentElement.innerHTML = `
      <div class="flex gap-4">
        <div class="flex-shrink-0">
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-gray-800" style="background-color: ${randomColor}">
            ${initial}
          </div>
        </div>
        
        <div class="flex-grow">
          <div class="flex flex-wrap justify-between items-center mb-2">
            <h4 class="font-medium text-lg">${comment.name}</h4>
            <span class="text-sm text-gray-400">${formattedDate}</span>
          </div>
          
          <p class="text-gray-300 mb-3">${comment.content}</p>
          
          <div class="flex gap-4">
            <button class="text-sm text-gray-400 hover:text-yellow-400 transition-colors reply-btn">
              <i class="fas fa-reply mr-1"></i> Reply
            </button>
            
            <!-- Delete button (only shown to admin or comment author) -->
            ${isCurrentUserAdmin() || isCommentAuthor(comment) ? 
              `<button class="text-sm text-gray-400 hover:text-red-400 transition-colors delete-comment-btn">
                <i class="fas fa-trash-alt mr-1"></i> Delete
              </button>` : ''}
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners
    const replyButton = commentElement.querySelector('.reply-btn');
    if (replyButton) {
      replyButton.addEventListener('click', function() {
        // Scroll to comment form
        const commentForm = document.getElementById('comment-form');
        if (commentForm) {
          commentForm.scrollIntoView({ behavior: 'smooth' });
          
          // Pre-fill reply prefix
          const commentInput = document.getElementById('comment-content');
          if (commentInput) {
            commentInput.value = `@${comment.name} `;
            commentInput.focus();
          }
        }
      });
    }
    
    // Add delete functionality if applicable
    const deleteButton = commentElement.querySelector('.delete-comment-btn');
    if (deleteButton) {
      deleteButton.addEventListener('click', function() {
        handleDeleteComment(comment._id);
      });
    }
    
    commentsContainer.appendChild(commentElement);
  });
}

/**
 * Handle delete comment
 * @param {string} commentId - The comment ID
 */
export async function handleDeleteComment(commentId) {
  if (!commentId) return;
  
  if (confirm('Are you sure you want to delete this comment?')) {
    try {
      await deleteComment(commentId);
      
      // Remove comment from UI
      const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
      if (commentElement) {
        commentElement.remove();
      }
      
      // Show success message
      showNotification('Comment deleted successfully', 'success');
      
      // Update comment count
      const commentsCount = document.querySelector('.comments-count');
      if (commentsCount) {
        const currentCount = parseInt(commentsCount.textContent);
        commentsCount.textContent = `${currentCount - 1} Comment${currentCount - 1 !== 1 ? 's' : ''}`;
      }
    } catch (error) {
      showNotification(`Error deleting comment: ${error.message}`, 'error');
    }
  }
}

/**
 * Generate a random but consistent color for avatar based on name
 * @param {string} name - User name
 * @returns {string} - CSS color value
 */
export function getAvatarColor(name) {
  // Generate a consistent hash from the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert to RGB color with muted tone (good for backgrounds)
  const h = hash % 360;
  return `hsl(${h}, 70%, 80%)`;
}

/**
 * Check if current user is admin
 * @returns {boolean} - True if user is admin
 */
export function isCurrentUserAdmin() {
  // Check user role from localStorage or session
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'admin';
}

/**
 * Check if current user is the author of the comment
 * @param {Object} comment - Comment object 
 * @returns {boolean} - True if user is comment author
 */
export function isCommentAuthor(comment) {
  // Check if user email matches comment email
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.email && user.email === comment.email;
}
