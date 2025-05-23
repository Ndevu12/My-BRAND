/**
 * Edit Blog Page Script
 * Handles loading and updating an existing blog
 */

import { getCategoryBadgeHTML } from '../../utils/categoryUtils.js';
import { getBlogById, updateBlog, uploadBlogImage, deleteBlog } from '../actions/blogs/blogActions.js';
import { showNotification } from '../../utils/notificationUtils.js';

document.addEventListener('DOMContentLoaded', async function() {
  // Get blog ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');
  
  if (!blogId) {
    // No ID provided, redirect to new blog page
    window.location.href = './new-article.html';
    return;
  }  
  
  try {
    // Load blog data from API
    const blog = await getBlogById(blogId);
    
    if (!blog) {
      throw new Error('Blog not found');
    }
    
    // Continue with blog data
    setupBlogEditor(blog);
  } catch (error) {
    // Blog not found or error occurred, show error and redirect
    showNotification(`Error loading blog: ${error.message}`, 'error');
    setTimeout(() => {
      window.location.href = './all_articles.html';
    }, 2000);
    return;
  }
}); 

/**
 * Setup the blog editor with blog data
 * @param {Object} blog - The blog data
 */
function setupBlogEditor(blog) {
    // Update page title
  document.title = `Edit: ${blog.title} | NdevuSpace`;
  
  // Update header
  const pageHeader = document.querySelector('h2');
  const pageSubheader = document.querySelector('h2 + p');
  if (pageHeader) pageHeader.textContent = `Edit Blog`;
  if (pageSubheader) pageSubheader.textContent = `Editing: ${blog.title}`;
  
  // Fill form with blog data
  populateForm(blog);
  
  // Initialize the rich text editor
  initializeEditor(blog.content);
  
  // Initialize category selection
  initializeCategories(blog.category);
  
  // Initialize tag system
  initializeTags(blog.tags);
  
  // Update form to handle updates instead of creation
  const form = document.getElementById('new-blog-form');
  const savePublishBtn = document.getElementById('save-publish');
  
  if (form && savePublishBtn) {
    // Change button text
    savePublishBtn.innerHTML = '<i class="fas fa-save mr-2"></i> Update Article';
      // Override form submission
    form.onsubmit = async function(e) {
      e.preventDefault();
      
      // Get content from editor
      let content = '';
      if (typeof getEditorContent !== 'undefined') {
        content = getEditorContent('editor-container');
      } else if (tinymce.get('editor-container')) {
        content = tinymce.get('editor-container').getContent();
      }
      document.getElementById('content').value = content;
      
      // Gather form data
      const formData = new FormData(form);
      
      // Add image data
      const imagePreview = document.getElementById('image-preview');
      const imageUrl = document.getElementById('image-url').value;
      const featuredImageSrc = imagePreview.classList.contains('hidden') 
        ? (imageUrl || blog.imageUrl) 
        : imagePreview.src;
      
      // Show loading state
      savePublishBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Updating...';
      savePublishBtn.disabled = true;
      
      try {
        // Handle image upload if needed
        let finalImageUrl = featuredImageSrc;
        const featuredImageInput = document.getElementById('featured-image');
        if (featuredImageInput && featuredImageInput.files && featuredImageInput.files[0]) {
          finalImageUrl = await uploadBlogImage(featuredImageInput.files[0]);
        }

        // Get tags
        const tags = formData.get('tags').split(',').map(tag => tag.trim()).filter(Boolean);
        
        // Prepare updated blog data
        const updatedBlog = {
          title: formData.get('title'),
          subtitle: formData.get('subtitle') || '',
          content: formData.get('content'),
          description: formData.get('description'),
          imageUrl: finalImageUrl,
          imageCaption: formData.get('imageCaption') || '',
          category: formData.get('category'),
          tags: tags,
          readTime: parseInt(formData.get('reading-time') || '5'),
          status: formData.get('status'),
          publishDate: formData.get('publish-date') || blog.publishDate,
          metaTitle: formData.get('meta-title') || formData.get('title'),
          metaDescription: formData.get('meta-description') || formData.get('description')
        };
        
        // Call API to update blog
        await updateBlog(blog._id, updatedBlog);
        
        // Show success notification
        showNotification('Blog updated successfully!', 'success');
        
        // Redirect to articles list after a delay
        setTimeout(() => {
          window.location.href = './all_articles.html';
        }, 1500);
      } catch (error) {
        // Error handling
        savePublishBtn.innerHTML = '<i class="fas fa-save mr-2"></i> Update Blog';
        savePublishBtn.disabled = false;
        showNotification(`Error updating blog: ${error.message}`, 'error');
      }
    };
  }
  
  // Setup delete functionality
  setupDeleteBlog(blog._id);
}

/**
 * Populate form fields with blog data
 * @param {Object} blog - The blog data
 */
function populateForm(blog) {
  // Basic information
  document.getElementById('title').value = blog.title || '';
  document.getElementById('subtitle').value = blog.subtitle || '';
  document.getElementById('description').value = blog.description || '';
  
  // Parse reading time (format: "X min read")
  const readingTime = blog.readTime ? parseInt(blog.readTime, 10) : 5;
  document.getElementById('reading-time').value = isNaN(readingTime) ? 5 : readingTime;
  
  document.getElementById('author').value = blog.author || 'Ndevu';
  
  // Featured image
  const imagePreview = document.getElementById('image-preview');
  const uploadUI = document.getElementById('upload-ui');
  const removeImageBtn = document.getElementById('remove-image');
  const imageUrlInput = document.getElementById('image-url');
  
  if (blog.imageUrl) {
    // Display existing image
    imagePreview.src = blog.imageUrl;
    imagePreview.classList.remove('hidden');
    uploadUI.classList.add('hidden');
    removeImageBtn.classList.remove('hidden');
    imageUrlInput.value = blog.imageUrl;
  }
  
  document.getElementById('image-caption').value = blog.imageCaption || '';
  
  // SEO settings
  document.getElementById('meta-title').value = blog.metaTitle || blog.title || '';
  document.getElementById('meta-description').value = blog.metaDescription || blog.description || '';
  
  // Publishing options
  if (blog.status === 'draft') {
    document.querySelector('input[name="status"][value="draft"]').checked = true;
  } else {
    document.querySelector('input[name="status"][value="published"]').checked = true;
  }
  
  // Try to format the date for the datetime-local input
  if (blog.publishDate) {
    try {
      const publishDate = new Date(blog.publishDate);
      // Format as YYYY-MM-DDTHH:MM
      const formattedDate = publishDate.toISOString().slice(0, 16);
      document.getElementById('publish-date').value = formattedDate;
    } catch (error) {
      console.error('Error parsing publish date:', error);
    }
  }
}

/**
 * Initialize the rich text editor with content
 * @param {string} content - The HTML content
 */
function initializeEditor(content) {
  if (typeof initRichTextEditor !== 'undefined') {
    // Use the component if available
    initRichTextEditor('#editor-container', {
      initialContent: content,
      setup: function(editor) {
        editor.on('change', function() {
          // Update the hidden textarea with content
          document.getElementById('content').value = editor.getContent();
        });
      }
    });
  } else {
    // Direct TinyMCE initialization
    tinymce.init({
      selector: '#editor-container',
      height: 500,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
        'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | image link | code | help',
      content_style: 'body { font-family:Roboto,Arial,sans-serif; font-size:16px; color:#d1d5db; }',
      skin: 'oxide-dark',
      content_css: 'dark',
      setup: function(editor) {
        editor.on('init', function() {
          // Set content after initialization
          editor.setContent(content || '');
          // Update the hidden textarea
          document.getElementById('content').value = content || '';
        });
        editor.on('change', function() {
          // Update the hidden textarea with content
          document.getElementById('content').value = editor.getContent();
        });
      }
    });
  }
}

/**
 * Initialize categories with the selected category
 * @param {string} selectedCategoryId - The ID of the selected category
 */
function initializeCategories(selectedCategoryId) {
  // Check if CategoryManager is loaded
  if (window.categoryManager) {
    const categoryContainer = document.getElementById('category-container');
    if (!categoryContainer) return;
    
    // Clear existing categories
    categoryContainer.innerHTML = '';
    
    // Get all categories
    const categories = window.categoryManager.getAllCategories();
    
    // Create category selection options
    categories.forEach(category => {
      const isSelected = category.id === selectedCategoryId;
      
      const categoryEl = document.createElement('label');
      categoryEl.className = `flex items-center space-x-2 bg-primary/50 p-3 rounded-lg border 
        border-gray-700 cursor-pointer hover:border-yellow-400/50 transition-colors 
        ${isSelected ? 'border-yellow-400' : ''}`;
      
      categoryEl.innerHTML = `
        <input type="radio" name="category" value="${category.id}" 
          class="text-yellow-500 focus:ring-yellow-500" ${isSelected ? 'checked' : ''}>
        <span class="flex items-center">
          <i class="fas ${category.icon} mr-2 ${category.textClass}"></i>
          ${category.name}
        </span>
      `;
      
      categoryContainer.appendChild(categoryEl);
    });
    
    // Add change event listeners to all category radio buttons
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    categoryRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        // Update styling for selected category
        const labels = categoryContainer.querySelectorAll('label');
        labels.forEach(label => {
          if (label.contains(this)) {
            label.classList.add('border-yellow-400');
          } else {
            label.classList.remove('border-yellow-400');
          }
        });
      });
    });
  }
}

/**
 * Initialize tags with existing tags
 * @param {Array} tags - Array of tag strings
 */
function initializeTags(tags) {
  if (!tags || !Array.isArray(tags)) return;
  
  const tagsInput = document.getElementById('tags');
  const tagsContainer = document.getElementById('tags-container');
  
  if (!tagsInput || !tagsContainer) return;
  
  // Clear existing tags
  tagsContainer.innerHTML = '';
  
  // Add each tag
  tags.forEach(tag => addTag(tag, tagsContainer, tagsInput));
  
  // Set comma-separated tags in input field
  tagsInput.value = tags.join(', ');
  
  // Setup event listener for adding new tags
  tagsInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      
      const tagText = tagsInput.value.trim();
      if (tagText) {
        addTag(tagText, tagsContainer, tagsInput);
        tagsInput.value = '';
        updateHiddenTagsField(tagsContainer, tagsInput);
      }
    }
  });
}

/**
 * Add a tag to the UI
 * @param {string} tagName - The tag text
 * @param {HTMLElement} container - The tags container
 * @param {HTMLInputElement} input - The tags input field
 */
function addTag(tagName, container, input) {
  const tag = document.createElement('span');
  tag.className = 'bg-primary/70 text-gray-300 px-2 py-1 text-sm rounded-full flex items-center';
  tag.innerHTML = `
    ${tagName}
    <button type="button" class="ml-1 text-gray-400 hover:text-red-400">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add remove functionality
  tag.querySelector('button').addEventListener('click', function() {
    tag.remove();
    updateHiddenTagsField(container, input);
  });
  
  container.appendChild(tag);
}

/**
 * Update the tags input field with all visible tags
 * @param {HTMLElement} container - The tags container
 * @param {HTMLInputElement} input - The tags input field
 */
function updateHiddenTagsField(container, input) {
  const allTags = [];
  container.querySelectorAll('span').forEach(tag => {
    // Get text content without the "×" button text
    const tagText = tag.childNodes[0].textContent.trim();
    allTags.push(tagText);
  });
  
  input.value = allTags.join(', ');
}

/**
 * Set up delete blog functionality
 * @param {string} blogId - The ID of the blog to delete
 */
function setupDeleteBlog(blogId) {
  const deleteBtn = document.getElementById('delete-article');
  const deleteModal = document.getElementById('delete-confirm-modal');
  const modalContent = deleteModal.querySelector('.bg-secondary');
  const cancelDeleteBtn = document.getElementById('cancel-delete');
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  
  if (!deleteBtn || !deleteModal || !cancelDeleteBtn || !confirmDeleteBtn) return;
  
  // Show delete confirmation modal
  deleteBtn.addEventListener('click', function() {
    // Use Tailwind classes for animations
    deleteModal.classList.remove('hidden');
    
    // Trigger animation with a small delay
    setTimeout(() => {
      deleteModal.classList.remove('opacity-0', 'invisible');
      modalContent.classList.remove('scale-95');
      modalContent.classList.add('scale-100');
    }, 10);
  });
  
  // Hide modal when cancel is clicked
  cancelDeleteBtn.addEventListener('click', function() {
    // Reverse the animation
    deleteModal.classList.add('opacity-0', 'invisible');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    // Hide the modal after animation completes
    setTimeout(() => {
      deleteModal.classList.add('hidden');
    }, 300);
  });
  
  // Handle delete confirmation
  confirmDeleteBtn.addEventListener('click', async function() {
    // Show loading state using Tailwind classes
    const originalText = this.innerHTML;
    this.disabled = true;
    this.classList.add('opacity-75', 'cursor-not-allowed');
    this.innerHTML = `
      <div class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Deleting...
      </div>
    `;
    
    try {
      // Delete the blog via API
      await deleteBlog(blogId);
      
      // Hide modal first
      deleteModal.classList.add('opacity-0', 'invisible');
      modalContent.classList.remove('scale-100');
      modalContent.classList.add('scale-95');
      
      setTimeout(() => {
        deleteModal.classList.add('hidden');
        
        // Show success message
        showNotification('Blog deleted successfully!', 'success');
        
        // Redirect to blogs list
        setTimeout(() => {
          window.location.href = './all_articles.html';
        }, 1000);
      }, 300);
    } catch (error) {
      // Reset button state and show error
      this.innerHTML = originalText;
      this.disabled = false;
      this.classList.remove('opacity-75', 'cursor-not-allowed');
      
      // Hide the modal
      deleteModal.classList.add('opacity-0', 'invisible');
      setTimeout(() => {
        deleteModal.classList.add('hidden');
      }, 300);
      
      showNotification(`Error deleting blog: ${error.message}`, 'error');
    }
  });
}
