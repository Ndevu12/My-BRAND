import { BASE_URL } from '../../config/config.js';
import { fetchBlogCategories } from '../actions/blogs/blogCategory.js';
import { getRecentBlogs } from '../actions/blogs/recentBlogs.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector('.signup');
  const sectionsContainer = document.getElementById('sections-container');
  const addSectionButton = document.getElementById('add-section');
  const categoryContainer = document.getElementById('category-container');
  const blogPostsContainer = document.getElementById('blog-posts-container');

  // Fetch and populate blog categories
  if (categoryContainer) {
    const categories = await fetchBlogCategories();
    if (Array.isArray(categories)) {
      categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'category';
        checkbox.value = category._id;
        checkbox.id = `category-${category._id}`;

        const label = document.createElement('label');
        label.htmlFor = `category-${category._id}`;
        label.textContent = category.name;

        categoryDiv.appendChild(checkbox);
        categoryDiv.appendChild(label);
        categoryContainer.appendChild(categoryDiv);
      });
    } else {
      console.error('Failed to fetch categories or categories is not an array');
    }
  }

  // Add section functionality
  if (addSectionButton && sectionsContainer) {
    addSectionButton.addEventListener('click', () => {
      const sectionCount = sectionsContainer.children.length;
      const sectionDiv = document.createElement('div');
      sectionDiv.classList.add('section');
      sectionDiv.innerHTML = `
        <h4>Section ${sectionCount + 1}</h4>
        <input type="text" name="section-title" placeholder="Section Title" required>
        <textarea name="section-content" placeholder="Section Content" required></textarea>
        <input type="number" name="section-order" placeholder="Section Order" required>
      `;
      sectionsContainer.appendChild(sectionDiv);
    });
  }

  // Form submission functionality
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const subtitle = document.getElementById('subtitle').value;
      const content = document.getElementById('content').value;
      const description = document.getElementById('description').value;
      const imageCaption = document.getElementById('image-caption').value;
      const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(checkbox => checkbox.value);
      if (selectedCategories.length > 3) {
        alert('You can select a maximum of 3 categories.');
        return;
      }
      const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
      const imageInput = document.getElementById('article-image');
      const images = imageInput.files;

      const sections = Array.from(sectionsContainer.children).map(sectionDiv => ({
        title: sectionDiv.querySelector('input[name="section-title"]').value,
        content: sectionDiv.querySelector('textarea[name="section-content"]').value,
        order: parseInt(sectionDiv.querySelector('input[name="section-order"]').value, 10),
      }));

      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('content', content);
      formData.append('description', description);
      formData.append('imageCaption', imageCaption);
      formData.append('category', JSON.stringify(selectedCategories));
      formData.append('tags', JSON.stringify(tags));
      formData.append('sections', JSON.stringify(sections));
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      try {
        if (!BASE_URL) {
          throw new Error('BASE_URL is not provided');
        }

        const token = localStorage.getItem('token');
        if (!token) {
          alert('Access denied! Login to create a blog.')
          window.location.href ='/src/pages/signin.html'
          return;
        }
        const response = await fetch(`${BASE_URL}/blog/create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
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
  }

  // Fetch and display blogs
  if (blogPostsContainer) {
    const blogs = await getRecentBlogs();

    if (Array.isArray(blogs)) {
      blogs.forEach(blog => {
        const blogPost = document.createElement('article');
        blogPost.classList.add('blog-post');
        blogPost.innerHTML = `
          <img src="${blog.imageUrl}" alt="${blog.title}">
          <h2><a href="#">${blog.title}</a></h2>
          <p>${blog.description}</p>
          <button class="read-more" data-id="${blog._id}">Read More</button>
        `;
        blogPostsContainer.appendChild(blogPost);
      });

      // Add event listener to "Read More" buttons with correct path handling
      document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', (event) => {
          const blogId = event.target.getAttribute('data-id');
          // Use a relative path based on current location
          const path = window.location.pathname.includes('/src/pages/') || 
                       window.location.pathname.includes('/views/') ? 
                       './blog-detail.html' : 
                       './src/pages/blog-detail.html';
          
          window.location.href = `${path}?id=${blogId}`;
        });
      });
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error');
      errorDiv.textContent = 'No blogs available at the moment.';
      blogPostsContainer.appendChild(errorDiv);

      console.error('Failed to fetch blogs or blogs is not an array');
    }
  }
});
