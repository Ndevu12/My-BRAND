import { BASE_URL } from '../config.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.signup');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.querySelector('.blog-header input').value;
    const content = document.querySelector('#content').value;
    const description = document.querySelector('#description').value;
    const category = document.querySelector('#category').value;
    const tags = document.querySelector('#tags').value;
    const imageInput = document.querySelector('#article-image');
    const images = imageInput.files;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('tags', tags);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      if (!BASE_URL) {
        throw new Error('BASE_URL is not provided');
      }
      const response = await fetch(`${BASE_URL}/blog/create`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      const statusMessage = document.querySelector('#upload-status');
      if (response.ok) {
        alert('Blog created successfully!');
        statusMessage.textContent = 'Blog created successfully!';
        statusMessage.classList.add('success');
        form.reset();
      } else {
        alert(`Error: ${result.message}`);
        statusMessage.textContent = `Error: ${result.message}`;
        statusMessage.classList.add('error');
        console.error(`Error: ${result.message}`);
      }
    } catch (error) {
      const statusMessage = document.querySelector('#upload-status');
      statusMessage.textContent = `Error: ${error.message}`;
      statusMessage.classList.add('error');
      console.error(`Error: ${error.message}`);
    }
  });
});

/**
 * Blogs Page Functionality
 * Handles category tabs and pagination
 */

document.addEventListener('DOMContentLoaded', function() {
  initCategoryTabs();
  initPagination();
});

/**
 * Initialize category tab functionality
 */
function initCategoryTabs() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      // Remove active class from all tabs
      categoryTabs.forEach(t => {
        const span = t.querySelector('span');
        span.classList.remove('bg-yellow-500', 'text-black');
        span.classList.add('bg-secondary', 'border', 'border-gray-700');
      });
      
      // Add active class to clicked tab
      const span = this.querySelector('span');
      span.classList.remove('bg-secondary', 'border', 'border-gray-700');
      span.classList.add('bg-yellow-500', 'text-black');
      
      // Here you would typically filter the blog posts based on the selected category
      // For now, we'll just log which category was selected
      console.log(`Selected category: ${span.textContent.trim()}`);
    });
  });
}

/**
 * Initialize pagination functionality
 */
function initPagination() {
  if (typeof insertPagination === 'function') {
    insertPagination('#pagination-container', {
      currentPage: 1,
      totalPages: 8,
      onPageChange: function(page) {
        console.log(`Navigating to page ${page}`);
        // Here you would typically fetch the content for the selected page
        // and update the blog grid with new articles
        
        // For demo purposes, let's just update the pagination to show the new page
        insertPagination('#pagination-container', {
          currentPage: page,
          totalPages: 8,
          onPageChange: this.onPageChange
        });
      }
    });
  } else {
    console.error('Pagination component not loaded');
  }
}
