/**
 * Blog Card Component
 * Reusable component for displaying blog articles in a card format
 */

/**
 * Create a blog card element
 * @param {Object} blog - Blog data object
 * @param {string} blog.id - Blog ID
 * @param {string} blog.title - Blog title
 * @param {string} blog.description - Blog description/excerpt
 * @param {string} blog.imageUrl - URL to blog image
 * @param {Array} blog.tags - Array of tag objects or strings
 * @param {string} blog.author - Author name
 * @param {string} blog.authorImage - URL to author image
 * @param {string|Date} blog.date - Publish date
 * @param {boolean} blog.isNew - Whether to show "NEW" badge
 * @param {string} blog.category - Category ID
 * @returns {HTMLElement} The card element
 */
function createBlogCard(blog) {
  // Create article element
  const article = document.createElement('article');
  article.className = 'bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group';
  
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
        `<span class="text-xs ${tag.bgClass || 'bg-gray-600/30'} ${tag.textClass || 'text-gray-400'} px-2 py-1 rounded-full">${tag.name}</span>`
      ).join('');
    } 
    // Handle array of strings
    else {
      categoryBadges = blog.tags.slice(0, 2).map(tag => 
        `<span class="text-xs bg-gray-600/30 text-gray-400 px-2 py-1 rounded-full">${tag}</span>`
      ).join('');
    }
  } 
  // Handle category through CategoryManager
  else if (blog.category && window.categoryManager) {
    const category = window.categoryManager.getCategory(blog.category);
    if (category) {
      categoryBadges = `<span class="text-xs ${category.bgClass} ${category.textClass} px-2 py-1 rounded-full">
        <i class="fas ${category.icon} mr-1"></i>${category.name}
      </span>`;
    }
  }
  
  // Build HTML structure
  article.innerHTML = `
    <div class="relative">
      <img src="${blog.imageUrl || 'https://via.placeholder.com/800x450?text=NdevuSpace'}" 
          alt="${blog.title}" 
          class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110">
      ${blog.isNew ? 
        `<div class="absolute top-0 right-0 bg-yellow-500 text-black font-bold text-xs px-3 py-1 m-2 rounded">NEW</div>` : ''}
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
    </div>
    <div class="p-5">
      <div class="flex flex-wrap gap-2 mb-3">
        ${categoryBadges}
      </div>
      <h3 class="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
        ${blog.title}
      </h3>
      <p class="text-gray-300 mb-4 line-clamp-3">
        ${blog.description || 'No description available.'}
      </p>
      <div class="flex justify-between items-center border-t border-gray-700/50 pt-4 mt-auto">
        <div class="flex items-center">
          <img src="${blog.authorImage || '../images/mypic.png'}" alt="${blog.author || 'Author'}" class="w-8 h-8 rounded-full border border-yellow-500">
          <p class="text-xs text-gray-400 ml-2">${formattedDate}</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="text-gray-400 hover:text-yellow-400 transition-colors" title="Save article">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <a href="./blog-detail.html?id=${blog.id}" class="text-yellow-400 hover:text-yellow-300 text-sm font-medium">Read</a>
        </div>
      </div>
    </div>
  `;
  
  // Add click event for the entire card if needed
  article.addEventListener('click', (e) => {
    // Don't trigger if clicking on buttons or links within the card
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    window.location.href = `./blog-detail.html?id=${blog.id}`;
  });
  
  return article;
}

// Export for module use
export { createBlogCard };

// Optional: Attach to window for non-module use
if (typeof window !== 'undefined') {
  window.createBlogCard = createBlogCard;
}
