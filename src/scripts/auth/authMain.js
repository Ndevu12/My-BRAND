/**
 * Authentication Main - DOM Manipulation and UI Logic
 * Handles all form interactions, visual effects, and UI enhancements
 * Calls auth actions for business logic
 */

import { showNotification } from '../../utils/notificationUtils.js';
import { performLogin, performLogout, isAuthenticating } from '../actions/auth/auth.js';
import { authManager } from '../../utils/authManager.js';

/**
 * Initialize authentication UI and form handlers
 * This is the main entry point that should be called from HTML
 */
export function initializeAuth() {
  // Initialize all UI components
  initializeAuthUI();
  
  // Setup form submission handler
  setupFormSubmission();
  
  // Setup logout handlers for legacy compatibility
  setupLegacyLogoutHandlers();
}

/**
 * Initialize all DOM manipulation and UI features
 */
function initializeAuthUI() {
  setupPasswordToggle();
  setupRealTimeValidation();
  setupForgotPasswordLink();
  addFormEnhancements();
  addKeyboardSupport();
}

/**
 * Setup form submission to call auth actions
 */
function setupFormSubmission() {
  const loginForm = document.getElementById('loginForm');
  const loginText = document.getElementById('loginText');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Prevent double submission
      if (isAuthenticating()) {
        loginText.textContent = 'Authenticating...';
        return;
      }
      
      // Get form values
      const { username, password, rememberMe } = getFormValues();

      // Use authManager's built-in validation
      const validation = authManager.validateCredentials(username, password);
      if (!validation.isValid) {
        authManager.showValidationErrors(validation.errors);
        return;
      }

      // Call auth action to perform login
      await performLogin({ username, password, rememberMe });
    });
  }
}

/**
 * Setup password toggle functionality
 */
function setupPasswordToggle() {
  const passwordToggle = document.querySelector('.password-toggle');
  
  if (passwordToggle) {
    passwordToggle.addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const passwordIcon = document.getElementById('password-toggle-icon');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.classList.remove('fa-eye');
        passwordIcon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        passwordIcon.classList.remove('fa-eye-slash');
        passwordIcon.classList.add('fa-eye');
      }
    });
  }
}

/**
 * Setup real-time field validation
 */
function setupRealTimeValidation() {
  const usernameInput = document.getElementById('userName');
  const passwordInput = document.getElementById('password');
  if (usernameInput) {
    usernameInput.addEventListener('blur', function() {
      const username = this.value.trim();
      if (username && username.length >= 3) {
        authManager.markFieldAsValid('userName');
      }
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('blur', function() {
      const password = this.value;
      if (password && password.length >= 6) {
        authManager.markFieldAsValid('password');
      }
    });
  }
}

/**
 * Setup forgot password link
 */
function setupForgotPasswordLink() {
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      showNotification('Password reset functionality will be available soon.', 'info');
    });
  }
}

/**
 * Setup legacy logout handlers for backwards compatibility
 */
function setupLegacyLogoutHandlers() {
  // Legacy logout function for backwards compatibility
  window.logout = async function() {
    await performLogout();
  };

  // Legacy logout button handler
  const logoutButton = document.querySelector('.logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', async function(e) {
      e.preventDefault();
      await performLogout();
    });
  }
}

/**
 * Add enhanced form interactions for glassmorphism design
 */
function addFormEnhancements() {
  // Add floating label effect and input focus animations
  const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
  
  inputs.forEach(input => {
    // Focus effects
    input.addEventListener('focus', function() {
      this.classList.add('ring-2', 'ring-accent', 'scale-[1.02]');
      this.classList.remove('ring-1', 'ring-red-500/50', 'ring-green-500/50');
      
      // Add glow effect to the parent container
      const container = this.closest('.space-y-2');
      if (container) {
        container.classList.add('transform', 'scale-[1.01]');
      }
    });
    
    input.addEventListener('blur', function() {
      this.classList.remove('ring-2', 'ring-accent', 'scale-[1.02]');
      
      // Remove glow effect
      const container = this.closest('.space-y-2');
      if (container) {
        container.classList.remove('transform', 'scale-[1.01]');
      }
    });
    
    // Real-time typing effects
    input.addEventListener('input', function() {
      // Clear previous errors when user starts typing
      const fieldName = this.id === 'userName' ? 'username' : this.id;
      const errorElement = document.getElementById(`${fieldName}-error`);      
      if (errorElement && errorElement.textContent) {
        errorElement.textContent = '';
        this.classList.remove('border-red-400', 'ring-1', 'ring-red-500/50');
        this.classList.add('border-card-border/30');
      }
    });
  });

  // Add form submission animation
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', function() {
      // Add a subtle shake animation on submit
      form.classList.add('animate-pulse');
      setTimeout(() => {
        form.classList.remove('animate-pulse');
      }, 300);
    });
  }

  // Add smooth transitions to all interactive elements
  const interactiveElements = document.querySelectorAll('input, button, a');
  interactiveElements.forEach(element => {
    element.classList.add('transition-all', 'duration-200');
  });

  // Add particle effect on successful login (optional enhancement)
  window.triggerSuccessAnimation = function() {
    const container = document.querySelector('.bg-white\\/10');
    if (container) {
      container.classList.add('animate-bounce');
      setTimeout(() => {
        container.classList.remove('animate-bounce');
      }, 600);
    }
  };
}

/**
 * Add keyboard shortcuts and accessibility features
 */
function addKeyboardSupport() {
  // Enter key submission from any input field
  const inputs = document.querySelectorAll('#userName, #password');
  inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !isAuthenticating()) {
        const form = document.getElementById('loginForm');
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
      }
    });
  });
  // Escape key to clear form
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const form = document.getElementById('loginForm');
      if (form && !isAuthenticating()) {
        form.reset();
        // Use authManager to clear errors
        authManager.showValidationErrors({});
      }
    }
  });

  // Auto-focus username field on page load
  setTimeout(() => {
    const usernameInput = document.getElementById('userName');
    if (usernameInput) {
      usernameInput.focus();
    }
  }, 300);
}

/**
 * Get form field values
 * @returns {Object} Form field values
 */
function getFormValues() {
  const username = document.querySelector('#userName')?.value.trim() || '';
  const password = document.querySelector('#password')?.value || '';
  const rememberMe = document.getElementById('rememberMe')?.checked || false;
  
  return { username, password, rememberMe };
}

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeAuth();
});
