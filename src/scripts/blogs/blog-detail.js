/**
 * Blog Detail Page Script
 * Loads and displays the blog article details
 */

import { BASE_URL } from '../../config/config.js';
import { getDummyBlogById, getRelatedBlogs } from '../../data/dummyBlogs.js';
import { getCategoryBadgeHTML } from '../../utils/categoryUtils.js';

document.addEventListener('DOMContentLoaded', function() {
  // Get blog ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');
  
  // If no ID is provided, show error and link to blogs page
  if (!blogId) {
    document.querySelector('.blog-content').innerHTML = `
      <div class="text-center py-10">
        <div class="text-yellow-500 text-4xl mb-4"><i class="fas fa-exclamation-triangle"></i></div>
        <h2 class="text-2xl font-bold mb-2">Blog Post Not Found</h2>
        <p class="text-gray-400 mb-4">The blog post you're looking for doesn't exist or has been removed.</p>
        <a href="./blogs.html" class="bg-yellow-500 text-black px-4 py-2 rounded-lg inline-block hover:bg-yellow-400 transition-colors">
          Browse All Articles
        </a>
      </div>
    `;
    return;
  }

  // Get blog data from our dummy data source
  const blogData = getDummyBlogById(blogId);
  
  if (!blogData) {
    document.querySelector('.blog-content').innerHTML = `
      <div class="text-center py-10">
        <div class="text-yellow-500 text-4xl mb-4"><i class="fas fa-exclamation-triangle"></i></div>
        <h2 class="text-2xl font-bold mb-2">Blog Post Not Found</h2>
        <p class="text-gray-400 mb-4">The blog post you're looking for doesn't exist or has been removed.</p>
        <a href="./blogs.html" class="bg-yellow-500 text-black px-4 py-2 rounded-lg inline-block hover:bg-yellow-400 transition-colors">
          Browse All Articles
        </a>
      </div>
    `;
    return;
  }

  // Update page title
  document.title = `${blogData.title} | NdevuSpace`;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = blogData.description;
  }

  // Update the blog header
  updateBlogHeader(blogData);
  
  // Update the blog content
  updateBlogContent(blogData);
  
  // Update the blog category in breadcrumbs using CategoryManager
  updateCategoryDisplay(blogData.category);
  
  // Update tags
  updateBlogTags(blogData.tags);
  
  // Load related articles based on category
  loadRelatedArticles(blogData.category, blogId);
  
  // Generate table of contents
  generateTableOfContents();
  
  // Remove loading indicator
  document.getElementById('loading-indicator')?.remove();
  
  // Initialize interactive elements
  initTableOfContents();
  setupCopyLinkButton();
  setupTocToggle(); // Initialize TOC toggle functionality
});

/**
 * Render blog content to the page
 */
function updateBlogContent(blog) {
  // Set main blog elements
  const titleElement = document.querySelector('h1');
  const subtitleElement = document.getElementById('blog-subtitle');
  const dateElement = document.querySelector('.blog-date');
  const authorElement = document.querySelector('.blog-author');
  const featuredImageElement = document.querySelector('.featured-image');
  const contentElement = document.querySelector('.blog-content');
  const readTimeElement = document.querySelector('.read-time');
  
  if (titleElement) titleElement.textContent = blog.title;
  
  // Handle subtitle display
  if (subtitleElement && blog.subtitle) {
    subtitleElement.textContent = blog.subtitle;
    subtitleElement.classList.remove('hidden');
  } else if (subtitleElement) {
    subtitleElement.classList.add('hidden');
  }
  
  if (dateElement) {
    const date = new Date(blog.createdAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Keep the SVG icon intact
    const svgIcon = dateElement.querySelector('svg');
    if (svgIcon) {
      dateElement.innerHTML = '';
      dateElement.appendChild(svgIcon);
      dateElement.appendChild(document.createTextNode(' ' + date));
    } else {
      dateElement.textContent = date;
    }
  }
  
  if (authorElement) authorElement.textContent = blog.author || 'Ndevu';
  if (featuredImageElement) featuredImageElement.src = blog.imageUrl;
  if (contentElement) contentElement.innerHTML = blog.content;
  
  // Update read time if available
  if (readTimeElement && blog.readTime) {
    const svgIcon = readTimeElement.querySelector('svg');
    if (svgIcon) {
      readTimeElement.innerHTML = '';
      readTimeElement.appendChild(svgIcon);
      readTimeElement.appendChild(document.createTextNode(' ' + blog.readTime));
    } else {
      readTimeElement.textContent = blog.readTime;
    }
  }
}

/**
 * Update category display in breadcrumbs using CategoryManager
 */
function updateCategoryDisplay(categoryId) {
  const categoryDisplay = document.querySelector('.category-display');
  if (!categoryDisplay) return;

  // Check if CategoryManager is available globally
  if (window.categoryManager) {
    const category = window.categoryManager.getCategory(categoryId);
    if (category) {
      // Update breadcrumb with category name and styling
      categoryDisplay.innerHTML = `
        <span class="${category.textClass}">
          <i class="fas ${category.icon} mr-1"></i>
          ${category.name}
        </span>
      `;
      
      // Also update category link in breadcrumb navigation
      const categoryLink = categoryDisplay.closest('a');
      if (categoryLink) {
        categoryLink.href = `./blogs.html?category=${categoryId}`;
      }
    } else {
      categoryDisplay.textContent = categoryId || 'Uncategorized';
    }
  } else {
    // Fallback if category manager not available
    const categories = {
      programming: "Programming",
      webdev: "Web Development",
      design: "UX/UI Design",
      technology: "Technology",
      entrepreneurship: "Entrepreneurship"
    };
    categoryDisplay.textContent = categories[categoryId] || categoryId || 'Uncategorized';
  }
}

/**
 * Load related articles based on the current article's category
 */
function loadRelatedArticles(categoryId, currentBlogId) {
  const relatedArticlesContainer = document.querySelector('.related-articles');
  if (!relatedArticlesContainer) return;

  try {
    // Get related articles from our dummy data
    const relatedArticles = getRelatedBlogs(categoryId, currentBlogId, 3);
    
    // Display related articles
    if (relatedArticles.length > 0) {
      relatedArticlesContainer.innerHTML = relatedArticles.map(article => {
        // Get formatted date
        const date = new Date(article.createdAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        });
        
        // Get category badge HTML using our utility function
        const categoryBadge = article.category ? getCategoryBadgeHTML(article.category, true) : '';
        
        return `
          <div class="flex gap-3 group">
            <img src="${article.imageUrl || 'https://via.placeholder.com/800x450?text=NdevuSpace'}" 
                alt="${article.title}" 
                class="w-16 h-16 rounded object-cover">
            <div>
              <div class="mb-1">${categoryBadge}</div>
              <a href="./blog-detail.html?id=${article.id}" class="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium">
                ${article.title}
              </a>
              <p class="text-xs text-gray-400 mt-1">${date}</p>
            </div>
          </div>
        `;
      }).join('');
    } else {
      relatedArticlesContainer.innerHTML = `
        <p class="text-sm text-gray-400">No related articles found.</p>
      `;
    }
  } catch (error) {
    console.error('Error loading related articles:', error);
    relatedArticlesContainer.innerHTML = `
      <p class="text-sm text-gray-400">Unable to load related articles.</p>
    `;
  }
}

/**
 * Update blog tags display
 */
function updateBlogTags(tags) {
  const tagsContainer = document.querySelector('.blog-tags');
  if (!tagsContainer || !tags || !Array.isArray(tags)) return;
  
  tagsContainer.innerHTML = tags.map(tag => `
    <a href="./blogs.html?tag=${encodeURIComponent(tag)}" class="px-3 py-1 bg-secondary text-gray-300 hover:bg-yellow-500 hover:text-black rounded-full text-sm transition-colors">
      ${tag}
    </a>
  `).join('');
}

/**
 * Update the blog header
 */
function updateBlogHeader(blog) {
  const headerElement = document.querySelector('header.mb-8');
  if (!headerElement) return;
  
  // If using a breadcrumb with category, update it
  const categoryBreadcrumb = document.querySelector('.category-breadcrumb');
  if (categoryBreadcrumb && window.categoryManager) {
    const category = window.categoryManager.getCategory(blog.category);
    if (category) {
      categoryBreadcrumb.href = `./blogs.html?category=${blog.category}`;
      categoryBreadcrumb.innerHTML = category.name;
    }
  }
  
  // Update subtitle in header if not already handled in updateBlogContent
  const subtitleElement = document.getElementById('blog-subtitle');
  if (subtitleElement && blog.subtitle && subtitleElement.classList.contains('hidden')) {
    subtitleElement.textContent = blog.subtitle;
    subtitleElement.classList.remove('hidden');
  }
  
  // Update read time if not done elsewhere
  if (blog.readTime) {
    const readTimeElement = document.querySelector('.read-time');
    if (readTimeElement) {
      const svgIcon = readTimeElement.querySelector('svg');
      if (svgIcon) {
        readTimeElement.innerHTML = '';
        readTimeElement.appendChild(svgIcon);
        readTimeElement.appendChild(document.createTextNode(' ' + blog.readTime));
      } else {
        readTimeElement.textContent = blog.readTime;
      }
    }
  }
}

/**
 * Display error message
 */
function displayErrorMessage(message) {
  const container = document.querySelector('main') || document.body;
  const errorDiv = document.createElement('div');
  
  errorDiv.className = 'bg-red-600 text-white p-4 rounded-lg my-8 text-center';
  errorDiv.textContent = message;
  
  container.prepend(errorDiv);
}

/**
 * Generate table of contents from article headings
 */
function generateTableOfContents() {
  const tocNavContainer = document.querySelector('.toc');
  if (!tocNavContainer) return;
  
  const articleContent = document.querySelector('.blog-content');
  if (!articleContent) return;
  
  const headings = articleContent.querySelectorAll('h2, h3');
  
  if (headings.length === 0) {
    // Hide TOC if no headings
    const tocSection = tocNavContainer.closest('.toc-container');
    if (tocSection) tocSection.style.display = 'none';
    return;
  }
  
  // Clear existing TOC content
  tocNavContainer.innerHTML = '';
  
  // Generate TOC entries
  headings.forEach(heading => {
    // Ensure each heading has an ID
    if (!heading.id) {
      heading.id = heading.textContent.toLowerCase().replace(/[^\w]+/g, '-');
    }
    
    const isMainHeading = heading.tagName.toLowerCase() === 'h2';
    const isSubHeading = heading.tagName.toLowerCase() === 'h3';
    
    // Create TOC item
    const tocItem = document.createElement('a');
    tocItem.href = `#${heading.id}`;
    
    if (isMainHeading) {
      tocItem.className = 'block pl-4 text-gray-300 hover:text-yellow-400 transition-colors border-l-2 border-gray-700 hover:border-yellow-400 py-1';
      tocItem.textContent = heading.textContent;
      tocNavContainer.appendChild(tocItem);
    } else if (isSubHeading) {
      tocItem.className = 'block pl-6 text-gray-300 hover:text-yellow-400 transition-colors border-l-2 border-gray-700 hover:border-yellow-400 py-1 text-sm';
      tocItem.textContent = heading.textContent;
      tocNavContainer.appendChild(tocItem);
    }
  });
}

/**
 * Initialize table of contents functionality
 */
function initTableOfContents() {
  // Handle TOC link click and active state
  const tocLinks = document.querySelectorAll('.toc a');
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(target);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // On mobile, collapse TOC after clicking a link
        if (window.innerWidth < 1024) { // lg breakpoint in Tailwind
          const tocContent = document.querySelector('.toc-content');
          if (tocContent && !tocContent.classList.contains('hidden')) {
            toggleToc();
          }
        }
      }
    });
  });
  
  // Highlight active section in TOC on scroll
  const observerOptions = {
    rootMargin: '-100px 0px -70% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          // Remove active class from all links
          link.classList.remove('text-yellow-400', 'border-yellow-400');
          link.classList.add('text-gray-300', 'border-gray-700');
          
          // Add active class to the current section's link
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.remove('text-gray-300', 'border-gray-700');
            link.classList.add('text-yellow-400', 'border-yellow-400');
          }
        });
      }
    });
  }, observerOptions);
  
  // Observe all headings in the article
  const articleContent = document.querySelector('.blog-content');
  if (articleContent) {
    const headings = articleContent.querySelectorAll('h2, h3');
    headings.forEach(heading => {
      observer.observe(heading);
    });
  }
  
  // Initialize TOC toggle functionality
  setupTocToggle();
}

/**
 * Setup toggle functionality for Table of Contents
 */
function setupTocToggle() {
  const tocToggle = document.getElementById('toc-toggle');
  if (!tocToggle) return;
  
  // Add click event listener to the toggle button
  tocToggle.addEventListener('click', toggleToc);
  
  // Set initial state - always collapsed on page load
  const tocContent = document.querySelector('.toc-content');
  const expandIcon = document.querySelector('.toc-expand-icon');
  const collapseIcon = document.querySelector('.toc-collapse-icon');
  
  if (tocContent && expandIcon && collapseIcon) {
    // Make sure TOC is collapsed by default
    tocContent.classList.add('hidden');
    expandIcon.classList.remove('hidden');
    collapseIcon.classList.add('hidden');
  }
}

/**
 * Toggle the TOC visibility
 */
function toggleToc() {
  const tocContent = document.querySelector('.toc-content');
  const expandIcon = document.querySelector('.toc-expand-icon');
  const collapseIcon = document.querySelector('.toc-collapse-icon');
  
  if (tocContent && expandIcon && collapseIcon) {
    // Toggle visibility
    tocContent.classList.toggle('hidden');
    
    // Toggle icons
    expandIcon.classList.toggle('hidden');
    collapseIcon.classList.toggle('hidden');
  }
}

/**
 * Set up copy link button functionality
 */
function setupCopyLinkButton() {
  const copyLinkButton = document.querySelector('button[title="Copy link to clipboard"]');
  if (copyLinkButton) {
    copyLinkButton.addEventListener('click', function() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        // Visual feedback for copy success
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        `;
        setTimeout(() => {
          this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          `;
        }, 2000);
      });
    });
  }
}
