/**
 * Authentication Guard Utility
 * Provides automatic authentication checks for protected pages
 */

import { authManager } from './authManager.js';

/**
 * Initialize authentication guard for the current page
 * Call this on pages that require authentication
 * @param {Object} options - Configuration options
 * @param {Array<string>} options.protectedPages - List of protected page names
 * @param {string} options.redirectUrl - Custom redirect URL for unauthenticated users
 */
export async function initAuthGuard(options = {}) {
  const {
    protectedPages = ['dashboard.html', 'new-article.html', 'edit-article.html'],
    redirectUrl = null
  } = options;

  await authManager.initAuthCheck(protectedPages);
}

/**
 * Check if current user is authenticated
 * @returns {Promise<boolean>} Authentication status
 */
export async function isAuthenticated() {
  const authStatus = await authManager.checkAuthStatus();
  return authStatus.isAuthenticated;
}

/**
 * Get current user information if authenticated
 * @returns {Promise<Object|null>} User information or null
 */
export async function getCurrentUser() {
  const authStatus = await authManager.checkAuthStatus();
  return authStatus.user;
}

/**
 * Require authentication for current page
 * Redirects to signin if not authenticated
 * @param {string} customRedirectUrl - Custom redirect URL
 */
export async function requireAuth(customRedirectUrl = null) {
  const authStatus = await authManager.checkAuthStatus();
  
  if (!authStatus.isAuthenticated) {
    if (customRedirectUrl) {
      window.location.href = customRedirectUrl;
    } else {
      authManager.redirectBasedOnAuth(false);
    }
  }
  
  return authStatus;
}

/**
 * Logout user and redirect to signin page
 */
export async function logout() {
  const result = await authManager.logout();
  
  if (result.success) {
    authManager.redirectBasedOnAuth(false);
  }
  
  return result;
}

/**
 * Initialize logout handlers for elements with logout class or data attributes
 * Call this on pages that have logout buttons
 */
export function initLogoutHandlers() {
  // Handle logout buttons with .logout class
  document.querySelectorAll('.logout').forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      await logout();
    });
  });

  // Handle logout buttons with data-action="logout"
  document.querySelectorAll('[data-action="logout"]').forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      await logout();
    });
  });
}

