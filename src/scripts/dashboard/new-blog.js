/**
 * New Blog Page Script
 * Handles blog creation, preview, and form interactions
 */

import { getCategoryBadgeHTML } from '../../utils/categoryUtils.js';
import { createBlog, uploadBlogImage } from '../actions/blogs/blogActions.js';
import { showNotification } from '../../utils/notificationUtils.js';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize rich text editor
  if (typeof initRichTextEditor !== 'undefined') {
    // Use the component if available
    initRichTextEditor('#editor-container', {
      setup: function(editor) {
        editor.on('change', function() {
          // Update the hidden textarea with content
          document.getElementById('content').value = editor.getContent();
        });
      }
    });
  } else {
    // Fallback to direct TinyMCE initialization
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
        editor.on('change', function() {
          // Update the hidden textarea with content
          document.getElementById('content').value = editor.getContent();
        });
      }
    });
  }

  // Initialize tag manager
  let tagManager;
  if (typeof createTagManager !== 'undefined') {
    // Use the component if available
    tagManager = createTagManager({
      inputSelector: '#tags',
      containerSelector: '#tags-container',
      initialTags: ['javascript', 'tutorial', 'technology']
    });
  } else {
    // Fallback to manual tag handling
    const tagsInput = document.getElementById('tags-input');
    const tagsHiddenInput = document.getElementById('tags');
    const tagsContainer = document.getElementById('tags-container');
    
    // Function to add tag
    function addTag(tagName) {
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
        updateHiddenTagsField();
      });
      
      tagsContainer.appendChild(tag);
      updateHiddenTagsField(); // Update immediately after adding
    }
    
    // Update hidden field with all tags
    function updateHiddenTagsField() {
      const allTags = [];
      tagsContainer.querySelectorAll('span').forEach(tag => {
        // Get only the text content before the button
        const tagText = tag.firstChild.textContent.trim();
        if (tagText) {
          allTags.push(tagText);
        }
      });
      
      tagsHiddenInput.value = allTags.join(', ');
    }
    
    // Handle tag input
    tagsInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        
        const tagText = tagsInput.value.trim();
        if (tagText) {
          addTag(tagText);
          tagsInput.value = '';
        }
      }
    });
      // Initialize with example tags
    addTag('javascript');
    addTag('tutorial');
    addTag('technology');
    updateHiddenTagsField();
    
    tagsContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', function() {
        btn.parentElement.remove();
        updateHiddenTagsField();
      });
    });
  }

  // Featured image handling
  const featuredImageInput = document.getElementById('featured-image');
  const imagePreview = document.getElementById('image-preview');
  const uploadUI = document.getElementById('upload-ui');
  const removeImageBtn = document.getElementById('remove-image');
  
  featuredImageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove('hidden');
        uploadUI.classList.add('hidden');
        removeImageBtn.classList.remove('hidden');
      }
      
      reader.readAsDataURL(file);
    }
  });
  
  removeImageBtn.addEventListener('click', function() {
    // Clear the file input
    featuredImageInput.value = "";
    
    // Hide preview, show upload UI
    imagePreview.classList.add('hidden');
    uploadUI.classList.remove('hidden');
    removeImageBtn.classList.add('hidden');
  });
  
  // Preview functionality
  const previewBtn = document.getElementById('preview-blog');
  const previewModal = document.getElementById('preview-modal');
  const previewContent = document.getElementById('preview-content');
  const closePreviewBtns = document.querySelectorAll('#close-preview, #close-preview-btn');
  
  previewBtn.addEventListener('click', function() {
    // Get form values
    const title = document.getElementById('title').value || 'Blog Title';
    const subtitle = document.getElementById('subtitle').value;
    const description = document.getElementById('description').value;
    
    // Get content from TinyMCE
    let content = '';
    if (typeof getEditorContent !== 'undefined') {
      content = getEditorContent('editor-container');
    } else if (tinymce.get('editor-container')) {
      content = tinymce.get('editor-container').getContent();
    }
    
    const imageUrl = imagePreview.classList.contains('hidden') ? '' : imagePreview.src;
    const imageCaption = document.getElementById('image-caption').value;
    
    // Get selected category
    const selectedCategory = document.querySelector('input[name="category"]:checked');
    let categoryDisplay = '';
    
    if (selectedCategory && window.categoryManager) {
      categoryDisplay = getCategoryBadgeHTML(selectedCategory.value);
    }
    
    // Build preview HTML with article structure that matches blog-detail.html
    let previewHTML = `
      <article class="max-w-4xl mx-auto">
        <header class="mb-8">
          <h1 class="text-3xl md:text-4xl font-bold mb-4">${title}</h1>
          ${subtitle ? `<h2 class="text-xl text-gray-300 mb-4">${subtitle}</h2>` : ''}
          
          <div class="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-700/50">
            <div class="flex items-center">
              <img src="../images/mypic.png" alt="Author" class="w-12 h-12 rounded-full border-2 border-yellow-500">
              <div class="ml-3">
                <p class="font-medium">${document.getElementById('author').value || 'Ndevu'}</p>
                <p class="text-sm text-gray-400">Full Stack Developer</p>
              </div>
            </div>
            
            <div class="flex items-center gap-6 text-sm text-gray-400">
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                ${new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
              </span>
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ${document.getElementById('reading-time').value || '5'} min read
              </span>
            </div>
          </div>
        </header>
    `;
    
    if (imageUrl) {
      previewHTML += `
        <figure class="mb-10 relative overflow-hidden rounded-xl">
          <img src="${imageUrl}" alt="${title}" class="w-full h-auto rounded-xl">
          ${imageCaption ? `<figcaption class="text-sm text-gray-400 mt-2 italic text-center">${imageCaption}</figcaption>` : ''}
        </figure>
      `;
    }
    
    // Add category badge if selected
    if (categoryDisplay) {
      previewHTML += `
        <div class="mb-4">
          ${categoryDisplay}
        </div>
      `;
    }
    
    // Add lead paragraph if description exists
    if (description) {
      previewHTML += `
        <p class="lead text-xl text-gray-300 mb-6">${description}</p>
      `;
    }
    
    // Add main content
    previewHTML += `
      <div class="article-content prose prose-invert max-w-none">
        ${content || '<p>No content yet...</p>'}
      </div>
    `;
    
    // Add tags
    const tags = tagManager ? tagManager.getTags() : 
      document.getElementById('tags').value.split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
    
    if (tags.length > 0) {
      previewHTML += `
        <div class="mt-10 pt-6 border-t border-gray-700/50">
          <h3 class="text-lg font-bold mb-3">Tags:</h3>
          <div class="flex flex-wrap gap-2">
            ${tags.map(tag => `<span class="px-3 py-1 bg-secondary text-gray-300 rounded-full text-sm">${tag}</span>`).join('')}
          </div>
        </div>
      `;
    }
    
    previewHTML += `</article>`;
    
    // Display preview
    previewContent.innerHTML = previewHTML;
    previewModal.classList.remove('hidden');
  });
  
  closePreviewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      previewModal.classList.add('hidden');
    });
  });
  
  // Populate current date as default publish date
  const nowDate = new Date();
  const nowString = nowDate.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM
  document.getElementById('publish-date').value = nowString;
  // Form submission
  const blogForm = document.getElementById('new-blog-form');
  const savePublishBtn = document.getElementById('save-publish');
  const saveDraftBtn = document.getElementById('save-draft');
  const discardBtn = document.getElementById('discard');
  
  blogForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Ensure content is saved from the editor
    let content = '';
    if (typeof getEditorContent !== 'undefined') {
      content = getEditorContent('editor-container');
    } else if (tinymce.get('editor-container')) {
      content = tinymce.get('editor-container').getContent();
    }
    document.getElementById('content').value = content;
    
    // Show loading state
    savePublishBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Saving...';
    savePublishBtn.disabled = true;
    
    try {
      // Collect tags from tag manager or from the input field
      let tags;
      if (tagManager) {
        tags = tagManager.getTags();
      } else {
        tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(Boolean);
      }
      
      // Get the selected category
      const selectedCategory = document.querySelector('input[name="category"]:checked');
      const categoryId = selectedCategory ? selectedCategory.value : null;
      
      // Prepare blog data for API
      const blogData = {
        title: document.getElementById('title').value,
        subtitle: document.getElementById('subtitle').value || '',
        description: document.getElementById('description').value,
        content: document.getElementById('content').value,
        categoryId: categoryId, // Use categoryId as per API requirements
        tags: tags,
        readTime: document.getElementById('reading-time').value || '5',
        status: document.querySelector('input[name="status"]:checked').value,
        publishDate: document.getElementById('publish-date').value || new Date().toISOString(),
        metaTitle: document.getElementById('meta-title').value || document.getElementById('title').value,
        metaDescription: document.getElementById('meta-description').value || document.getElementById('description').value
      };
      
      // Handle featured image if present
      const featuredImageInput = document.getElementById('featured-image');
      if (featuredImageInput.files && featuredImageInput.files[0]) {
        blogData.image = featuredImageInput.files[0];
      }
      
      // Send to API
      const createdBlog = await createBlog(blogData);
      
      if (createdBlog){
      // Show success notification
      showNotification('Blog published successfully!', 'success');
      
      
      // Redirect to blogs list after a brief delay
      setTimeout(() => {
      window.location.href = './all_articles.html';
      }, 1500);
    }
    } catch (error) {
      // Show error notification
      showNotification(`Failed to create blog: ${error.message}`, 'error');
        // Reset button state
      savePublishBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Save & Publish Blog';
      savePublishBtn.disabled = false;
    }
  });
    // Save as draft
  saveDraftBtn.addEventListener('click', function() {
    // Set status to draft
    document.querySelector('input[name="status"][value="draft"]').checked = true;
    
    // Submit the form
    const event = new Event('submit', { bubbles: true, cancelable: true });
    blogForm.dispatchEvent(event);
  });
    // Discard changes
  discardBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to discard this blog? All changes will be lost.')) {
      window.location.href = './all_articles.html';
    }
  });
  
  
  // Auto-set meta fields based on main fields
  const titleField = document.getElementById('title');
  const metaTitleField = document.getElementById('meta-title');
  const descriptionField = document.getElementById('description');
  const metaDescriptionField = document.getElementById('meta-description');
  
  titleField.addEventListener('blur', function() {
    if (!metaTitleField.value) {
      metaTitleField.value = titleField.value;
    }
  });
  
  descriptionField.addEventListener('blur', function() {
    if (!metaDescriptionField.value) {
      metaDescriptionField.value = descriptionField.value;
    }
  });

  // Initialize category selection
  initializeCategories();
});

/**
 * Initialize category selection using the CategoryManager
 */
function initializeCategories() {
  // Check if CategoryManager is loaded
  if (!window.categoryManager) {
    console.warn('CategoryManager not loaded. Categories will not be displayed correctly.');
    return;
  }

  const categoryContainer = document.getElementById('category-container');
  if (!categoryContainer) return;

  // Function to render categories once they're ready
  const renderCategories = () => {
    // Clear existing categories
    categoryContainer.innerHTML = '';
    
    // Get previously selected category if editing an existing article
    let selectedCategory = null;
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId) {
      // If editing, try to get the article from localStorage or API
      const articles = JSON.parse(localStorage.getItem('articles') || '[]');
      const article = articles.find(art => art.id === editId);
      
      if (article && article.category) {
        selectedCategory = article.category;
      }
    }
    
    // Get all categories from CategoryManager
    const categories = window.categoryManager.getAllCategories();
    
    // Create category selection options
    categories.forEach(category => {
      const isSelected = category.id === selectedCategory;
      
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
  };

  // Wait for CategoryManager to be ready
  const waitForCategories = () => {
    if (window.categoryManager.isReady()) {
      renderCategories();
    } else {
      // Check again after a short delay
      setTimeout(waitForCategories, 100);
    }
  };

  // Start waiting for categories to be ready
  waitForCategories();
}
