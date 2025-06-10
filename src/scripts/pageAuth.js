/**
 * Page Authentication Initializer
 * Simple script to add authentication to any page
 * Usage: Add <script type="module" src="path/to/pageAuth.js"></script> to any protected page
 */

import { initAuthGuard, initLogoutHandlers } from '../utils/authGuard.js';

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Get current page name for protection
  const currentPage = window.location.pathname.split('/').pop();
  
  // List of pages that require authentication
  const protectedPages = [
    'dashboard.html',
    'new-article.html', 
    'edit-article.html',
    'all_articles.html'
  ];

  // Initialize auth guard if this is a protected page
  if (protectedPages.includes(currentPage)) {
    await initAuthGuard({
      protectedPages: protectedPages
    });
  }

  // Initialize logout handlers for any logout buttons on the page
  initLogoutHandlers();
});
