import { getRecentBlogs } from '../actions/blogs/recentBlogs.js';

document.addEventListener('DOMContentLoaded', async () => {
    const recentBlogsContainer = document.getElementById('recent-blogs-container');

    if (recentBlogsContainer) {
        const blogs = await getRecentBlogs();

        if (blogs.length === 0) {
            recentBlogsContainer.innerHTML = '<p>No available blogs at the moment!</p>';
        } else {
            blogs.slice(0, 4).forEach(blog => {
                const blogArticle = document.createElement('article');
                blogArticle.innerHTML = `
                    <div class="post" data-post-id="${blog._id}">
                    <div class="blog-photo">
                      <img src="${blog.imageUrl}" alt="${blog.title}">
                    </div>
                      <h4 class="article-title">${blog.title}</h4>
                      <p class="blog_content">${blog.description.substring(0, 100)}...</p>
                    </div>
                `;
                blogArticle.addEventListener('click', () => {
                    window.location.href = `/src/pages/blog-detail.html?id=${blog._id}`;
                });
                recentBlogsContainer.appendChild(blogArticle);
            });
        }
    }
});