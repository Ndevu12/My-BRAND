/**
 * Protected Route Utility
 * Handles authentication checks for protected routes
 */

import { requireAuth, isAuthenticated } from '../../utils/authGuard.js';
import { showNotification } from '../../utils/notificationUtils.js';

/**
 * Function to protect admin routes
 * Redirects to login page if user is not authenticated
 */
export async function protectAdminRoute() {
  console.log('Protect Admin Route');
  
  try {
    await requireAuth();
  } catch (error) {
    console.error('Authentication check failed:', error);
    showNotification('Authentication failed. Please sign in again.', 'error');
    setTimeout(() => {
      window.location.href = '/src/pages/signin.html';
    }, 2000);
  }
}

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} True if user is authenticated
 */
export async function checkAuthentication() {
  return await isAuthenticated();
}
