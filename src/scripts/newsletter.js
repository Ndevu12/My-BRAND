/**
 * Newsletter subscription functionality
 */

import { addSubscriber } from '../utils/subscriberService.js';

document.addEventListener('DOMContentLoaded', function() {
  // Find all newsletter subscription forms
  const subscriptionForms = document.querySelectorAll('.newsletter-form, .subscribe-form, .subscription-form');
  
  subscriptionForms.forEach(form => {
    form.addEventListener('submit', handleSubscription);
  });
  
  // Also find standalone subscription buttons
  const subscribeButtons = document.querySelectorAll('.subscribe-button, .newsletter-button');
  subscribeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Find the closest form
      const form = button.closest('form') || button.closest('.newsletter-form') || 
                   button.closest('.subscribe-form') || button.closest('.subscription-form');
      
      if (form) {
        handleSubscription.call(form, e);
      }
    });
  });
});

/**
 * Handle subscription form submission
 * @param {Event} e - Form submit event
 */
async function handleSubscription(e) {
  e.preventDefault();
  
  // Find email input within the form
  const emailInput = this.querySelector('input[type="email"]') || 
                    this.querySelector('input[placeholder*="email" i]') ||
                    this.querySelector('input[name*="email" i]');
                    
  // Find name input if available
  const nameInput = this.querySelector('input[name*="name" i]') ||
                   this.querySelector('input[placeholder*="name" i]');
  
  // Find submit button
  const submitButton = this.querySelector('button[type="submit"]') || 
                      this.querySelector('input[type="submit"]') ||
                      this.querySelector('.subscribe-button') ||
                      this.querySelector('button');
  
  if (!emailInput) {
    console.error('No email input found in subscription form');
    return;
  }
  
  const email = emailInput.value.trim();
  const name = nameInput ? nameInput.value.trim() : '';
  
  // Basic email validation
  if (!isValidEmail(email)) {
    showMessage(this, 'Please enter a valid email address', 'error');
    return;
  }
  
  // Show loading state
  if (submitButton) {
    const originalText = submitButton.innerText;
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <span class="inline-block animate-spin mr-2">⟳</span>
      Subscribing...
    `;
  }
  
  try {
    // Subscribe via API
    await addSubscriber({ email, name });
    
    // Clear inputs
    emailInput.value = '';
    if (nameInput) nameInput.value = '';
    
    // Show success message
    showMessage(this, 'Thank you for subscribing!', 'success');
    
  } catch (error) {
    console.error('Error subscribing:', error);
    showMessage(this, 'Failed to subscribe. Please try again later.', 'error');
  } finally {
    // Restore button state
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText || 'Subscribe';
    }
  }
}

/**
 * Show status message in the form
 * @param {HTMLElement} form - The form element
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showMessage(form, message, type = 'success') {
  // Remove any existing messages
  const existingMessage = form.querySelector('.subscription-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `subscription-message ${type === 'success' ? 'text-green-400' : 'text-red-400'} text-sm mt-2`;
  messageElement.innerHTML = message;
  
  // Add to form
  form.appendChild(messageElement);
  
  // Remove after 5 seconds
  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
