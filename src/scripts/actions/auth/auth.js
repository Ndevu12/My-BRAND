/**
 * Authentication Actions - Business Logic for Login/Logout
 * This module contains the pure auth business logic that can be called from UI components
 */

import { authManager } from '../../../utils/authManager.js';
import { showNotification } from '../../../utils/notificationUtils.js';
import { getPaths } from '../../../utils/paths.js';

/**
 * Perform user login action
 * @param {Object} credentials - Login credentials
 * @returns {Promise<Object>} Login result
 */
export async function performLogin(credentials) {
  try {
    // The authManager handles all validation, sanitization, loading states, and API calls
    const result = await authManager.login(credentials);

    if (result.success) {
      // Trigger success animation if available
      if (window.triggerSuccessAnimation) {
        window.triggerSuccessAnimation();
      }
      
      showNotification(result.message, 'success');
      
      // Wait a moment to ensure cookies are properly set before redirect
      setTimeout(async () => {
        // Verify authentication status before redirect
        const authStatus = await authManager.checkAuthStatus();
        
       const paths = getPaths();
       window.location.href = `${paths.pagesPath}dashboard.html`;
      }, 1000); // Reduced from 1500 to 1000ms
    } else {
      // Handle login failure - authManager already handles field errors
      if (result.errors && Object.keys(result.errors).length > 0) {
        authManager.showValidationErrors(result.errors);
      } else {
        showNotification(result.message, 'error');
      }
    }

    return result;
  } catch (error) {
    showNotification('Network error. Please try again.', 'error');
    return { success: false, message: 'Network error occurred' };
  }
}

/**
 * Perform user logout action
 * @returns {Promise<Object>} Logout result
 */
export async function performLogout() {
  try {
    // The authManager handles all logout logic and API calls
    const result = await authManager.logout();
    
    if (result.success) {
      showNotification(result.message, 'success');
      
      // Redirect to signin page
      const paths = getPaths();
      setTimeout(() => {
        window.location.href = `${paths.pagesPath}signin.html`;
      }, 1000);
    } else {
      showNotification(result.message, 'error');
    }
    
    return result;
  } catch (error) {
    showNotification('Logout failed', 'error');
    return { success: false, message: 'Logout failed' };
  }
}

/**
 * Check if user is currently authenticating
 * @returns {boolean} Authentication status
 */
export function isAuthenticating() {
  return authManager.isAuthenticating;
}
