/**
 * Authentication Manager Utility
 * Handles cookie-based authentication, form validation, and auth state management
 */

import { BASE_URL } from '../config/config.js';
import { showNotification } from './notificationUtils.js';
import { getPaths } from './paths.js';

/**
 * Cookie-based Authentication Manager
 */
export class AuthManager {
  constructor() {
    this.isAuthenticating = false;
    this.paths = getPaths();
  }
  /**
   * Validate user credentials - only check for empty fields
   * @param {string} username 
   * @param {string} password 
   * @returns {Object} validation result with basic errors
   */
  validateCredentials(username, password) {
    const errors = {};
    
    // Username validation - only check if empty
    if (!username || username.trim().length === 0) {
      errors.username = 'Username is required';
    }

    // Password validation - only check if empty
    if (!password || password.length === 0) {
      errors.password = 'Password is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Check if required form fields are filled
   * @returns {boolean} True if all required fields have values
   */
  areRequiredFieldsFilled() {
    const username = document.getElementById('userName')?.value.trim();
    const password = document.getElementById('password')?.value;
    
    return !!(username && password);
  }

  /**
   * Sanitize user input to prevent XSS
   * @param {string} input 
   * @returns {string} sanitized input
   */
  sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .slice(0, 255); // Limit length
  }

  /**
   * Show field-specific validation errors with Tailwind styling
   * @param {Object} errors 
   */
  showValidationErrors(errors) {    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => {
      error.textContent = '';
      const inputElement = error.previousElementSibling?.classList ? 
        error.previousElementSibling : 
        error.parentElement?.querySelector('input');
      
      if (inputElement) {
        inputElement.classList.remove('border-red-400', 'border-green-400', 'ring-red-500', 'ring-green-500');
        inputElement.classList.add('border-white/20');
      }
    });

    // Show new errors
    Object.keys(errors).forEach(field => {
      const errorElement = document.getElementById(`${field}-error`);
      const inputElement = document.getElementById(field === 'username' ? 'userName' : field);
      
      if (errorElement && inputElement) {
        errorElement.textContent = errors[field];
        errorElement.className = 'form-error text-red-400 text-sm block animate-pulse';
        inputElement.classList.remove('border-white/20', 'border-green-400');
        inputElement.classList.add('border-red-400', 'ring-1', 'ring-red-500/50');
      }    });
  }
  /**
   * Mark field as valid with visual feedback for glassmorphism design
   * @param {string} fieldId 
   */
  markFieldAsValid(fieldId) {
    const inputElement = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId === 'userName' ? 'username' : fieldId}-error`);
    
    if (inputElement && errorElement) {
      inputElement.classList.remove('border-red-400', 'border-white/20', 'ring-1', 'ring-red-500/50');
      inputElement.classList.add('border-green-400', 'ring-1', 'ring-green-500/50');
      errorElement.textContent = '';
      
      // Add success checkmark animation
      setTimeout(() => {
        inputElement.classList.remove('border-green-400', 'ring-1', 'ring-green-500/50');
        inputElement.classList.add('border-white/20');
      }, 2000);
    }
  }
  /**
   * Set loading state for login button with enhanced UI feedback
   * @param {boolean} loading 
   * @param {string} buttonId 
   * @param {string} loadingText 
   */
  setLoadingState(loading, buttonId = 'loginButton', loadingText = 'Signing In...') {
    const button = document.getElementById(buttonId);
    if (!button) return;

    const buttonText = button.querySelector('.button-text') || button;
    
    if (loading) {
      this.isAuthenticating = true;
      button.disabled = true;
        // Enhanced loading state for glassmorphism design
      button.classList.add('opacity-60', 'cursor-not-allowed', 'pointer-events-none');
      button.classList.remove('hover:scale-[1.02]', 'active:scale-[0.98]', 'hover:from-button-hover', 'hover:to-accent');
      
      // Store original text if not already stored
      if (!buttonText.dataset.originalText) {
        buttonText.dataset.originalText = buttonText.textContent;
      }
      
      // Add spinning loader with glassmorphism effect
      buttonText.innerHTML = `
        <span class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          ${loadingText}
        </span>
      `;
    } else {
      this.isAuthenticating = false;
      button.disabled = false;
        // Restore normal state
      button.classList.remove('opacity-60', 'cursor-not-allowed', 'pointer-events-none');
      button.classList.add('hover:scale-[1.02]', 'active:scale-[0.98]', 'hover:from-button-hover', 'hover:to-accent');
      
      // Restore original text
      buttonText.innerHTML = buttonText.dataset.originalText || 'Sign In';
    }
  }  /**
   * Check authentication status using cookies
   * @returns {Promise<Object>} auth status and user info
   */
  async checkAuthStatus() {
    try {
      // Don't manually add cookies to headers when they are httpOnly
      // The browser will automatically include httpOnly cookies when credentials: 'include' is set
      const response = await fetch(`${BASE_URL}/auth/status`, {
        method: 'GET',
        credentials: 'include', // Essential for cookie-based auth - automatically includes httpOnly cookies
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return {
          isAuthenticated: true,
          user: data.user || data.data?.user || null
        };
      } else {
        return { isAuthenticated: false, user: null };
      }
    } catch (error) {
      return { isAuthenticated: false, user: null };
    }
  }
  /**
   * Handle user login with cookie-based authentication
   * @param {Object} credentials 
   * @returns {Promise<Object>} login result
   */
  async login(credentials) {
    // Validate and sanitize inputs
    const username = this.sanitizeInput(credentials.username);
    const password = credentials.password; // Don't sanitize password (might remove valid chars)
    
    const validation = this.validateCredentials(username, password);
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    const loginData = {
      username,
      password
    };

    try {
      this.isAuthenticating = true;

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Essential for cookie-based auth
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          message: result.data?.message || result.message || 'Login successful!',
          user: result.data?.user || result.user || null
        };
      } else {
        return {
          success: false,
          message: result.message || 'Login failed',
          errors: result.errors || {}
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
        errors: {}
      };
    } finally {
      this.isAuthenticating = false;
    }
  }

  /**
   * Handle user logout with cookie clearing
   * @returns {Promise<Object>} logout result
   */
  async logout() {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Important for cookie-based auth
        headers: {
          'Accept': 'application/json',
        }
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Successfully logged out'
        };
      } else {
        const result = await response.json().catch(() => ({}));
        return {
          success: false,
          message: result.message || 'Logout failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error during logout'
      };
    }
  }

  /**
   * Redirect to appropriate page based on authentication
   * @param {boolean} isAuthenticated 
   * @param {string} targetPage 
   */
  redirectBasedOnAuth(isAuthenticated, targetPage = 'dashboard.html') {
    const paths = getPaths();
    
    if (isAuthenticated) {
      // Redirect to dashboard or target page
      window.location.href = `${paths.pagesPath}${targetPage}`;
    } else {
      // Redirect to signin
      window.location.href = `${paths.pagesPath}signin.html`;
    }
  }

  /**
   * Initialize authentication checks for protected pages
   * @param {Array<string>} protectedPages - List of protected page names
   */
  async initAuthCheck(protectedPages = ['dashboard.html', 'new-article.html', 'edit-article.html']) {
    const currentPage = window.location.pathname.split('/').pop();
    
    
    if (protectedPages.includes(currentPage)) {
      const authStatus = await this.checkAuthStatus();
      if (!authStatus.isAuthenticated) {
        showNotification('Please sign in to access this page', 'warning');
        setTimeout(() => {
          this.redirectBasedOnAuth(false);
        }, 1500);
      }
    }
      
  }
}

// Create and export a default instance
export const authManager = new AuthManager();

// Export for legacy compatibility
export default authManager;