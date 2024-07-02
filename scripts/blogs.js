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
