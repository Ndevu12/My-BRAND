/**
 * Featured Blog Card Component
 * Reusable component for displaying featured blog article in a larger card format
 */

/**
 * Create a featured blog card element
 * @param {Object} blog - Blog data object
 * @param {string} blog.id - Blog ID
 * @param {string} blog.title - Blog title
 * @param {string} blog.description - Blog description/excerpt
 * @param {string} blog.imageUrl - URL to blog image
 * @param {Array} blog.tags - Array of tag objects or strings
 * @param {string} blog.author - Author name
 * @param {string} blog.authorImage - URL to author image
 * @param {string|Date} blog.date - Publish date
 * @param {string} blog.readTime - Read time text (e.g., "8 min read")
 * @returns {HTMLElement} The featured card element
 */
function createFeaturedBlogCard(blog) {
  // Create article element
  const article = document.createElement('article');
  article.className = 'group bg-secondary rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1';
  
  // Format date
  const formattedDate = blog.date instanceof Date 
    ? blog.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  
  // Process tags/categories
  let categoryBadges = '';
  
  if (blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0) {
    // Handle array of tag objects
    if (typeof blog.tags[0] === 'object') {
      categoryBadges = blog.tags.slice(0, 2).map(tag => 
        `<span class="text-xs ${tag.bgClass || 'bg-gray-600/80'} backdrop-blur-sm px-2 py-1 rounded-full ${tag.textClass || 'text-white'}">${tag.name}</span>`
      ).join('');
    } 
    // Handle array of strings
    else {
      const colors = [
        { bg: 'bg-blue-600/80', text: 'text-white' },
        { bg: 'bg-purple-600/80', text: 'text-white' },
        { bg: 'bg-green-600/80', text: 'text-white' },
        { bg: 'bg-red-600/80', text: 'text-white' }
      ];
      
      categoryBadges = blog.tags.slice(0, 2).map((tag, index) => 
        `<span class="text-xs ${colors[index % colors.length].bg} backdrop-blur-sm px-2 py-1 rounded-full ${colors[index % colors.length].text}">${tag}</span>`
      ).join('');
    }
  }
  
  // Build HTML structure using the horizontal featured layout
  article.innerHTML = `
    <div class="md:flex">
      <div class="md:w-1/2 relative overflow-hidden h-64 md:h-auto">
        <img src="${blog.imageUrl || 'https://via.placeholder.com/800x450?text=NdevuSpace'}" 
            alt="${blog.title}" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div class="absolute bottom-4 left-4 flex gap-2">
          ${categoryBadges}
        </div>
      </div>
      <div class="p-6 md:w-1/2 flex flex-col justify-between">
        <div>
          <h2 class="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
            ${blog.title}
          </h2>
          <p class="text-gray-300 mb-4 line-clamp-3 md:line-clamp-4">
            ${blog.description || 'No description available.'}
          </p>
        </div>
        <div class="mt-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <img src="${blog.authorImage || '../images/mypic.png'}" 
                  alt="${blog.author || 'Author'}" 
                  class="w-10 h-10 rounded-full border-2 border-yellow-500">
              <div class="ml-2">
                <p class="text-sm font-medium">${blog.author || 'Ndevu'}</p>
                <p class="text-xs text-gray-400">${formattedDate} · ${blog.readTime || '5 min read'}</p>
              </div>
            </div>
            <a href="./blog-detail.html?id=${blog.id}" class="text-yellow-400 hover:text-yellow-300 flex items-center gap-1 font-medium text-sm group-hover:gap-2 transition-all">
              Read Article
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return article;
}

// Export for module use
export { createFeaturedBlogCard };

// Optional: Attach to window for non-module use
if (typeof window !== 'undefined') {
  window.createFeaturedBlogCard = createFeaturedBlogCard;
}
