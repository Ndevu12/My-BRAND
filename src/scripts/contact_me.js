/**
 * Contact Form Handler
 * Handles contact form submission with API integration
 */

import { sendContactMessage } from './actions/messages/messageActions.js';
import { showNotification } from '../utils/notificationUtils.js';
import { validateEmail, validateRequired, sanitizeInput, validateContactForm } from '../utils/formValidation.js';

document.addEventListener('DOMContentLoaded', function () {
    // Initialize contact form
    initializeContactForm();
});

/**
 * Initialize the contact form functionality
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.warn('Contact form not found on this page');
        return;
    }

    // Get form elements
    const elements = getFormElements(contactForm);
    
    if (!elements.isValid) {
        console.error('Required form elements are missing');
        return;
    }

    // Add form submit event listener
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input validation listeners
    addValidationListeners(elements);
}

/**
 * Get and validate form elements
 * @param {HTMLFormElement} form - The contact form
 * @returns {Object} - Form elements and validation status
 */
function getFormElements(form) {
    const nameInput = form.querySelector('input[name="name"]') || 
                      form.querySelector('#contact-name') || 
                      form.querySelector('.name');
    
    const emailInput = form.querySelector('input[name="email"]') || 
                       form.querySelector('#contact-email') ||
                       form.querySelector('.get-email');
    
    const subjectInput = form.querySelector('input[name="subject"]') || 
                         form.querySelector('#contact-subject') ||
                         form.querySelector('.subject');
    
    const messageInput = form.querySelector('textarea[name="message"]') || 
                         form.querySelector('#contact-message') ||
                         form.querySelector('.message');
    
    const submitButton = form.querySelector('button[type="submit"]') || 
                         form.querySelector('#contact-submit-btn') ||
                         form.querySelector('#subId') ||
                         form.querySelector('.submit-btn');

    const isValid = nameInput && emailInput && messageInput && submitButton;
    
    return {
        nameInput,
        emailInput,
        subjectInput,
        messageInput,
        submitButton,
        isValid
    };
}

/**
 * Handle form submission
 * @param {Event} event - Submit event
 */
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload
    
    const form = event.target;
    const elements = getFormElements(form);
    
    if (!elements.isValid) {
        showNotification('Form elements not found', 'error');
        return;
    }

    // Get form data
    const formData = getFormData(elements);
    
    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
        showNotification(validation.message, 'error');
        return;
    }

    // Show loading state
    showLoadingState(elements.submitButton);

    try {
        // Send message via API
        const response = await sendContactMessage(formData);
        
        // Show success notification
        showNotification('Message sent successfully! Thank you for reaching out.', 'success');
        
        // Clear form only after successful submission
        clearForm(elements);
        
    } catch (error) {
        console.error('Error sending message:', error);
        showNotification(
            error.message || 'Failed to send message. Please try again later.', 
            'error'
        );
    } finally {
        // Restore button state
        hideLoadingState(elements.submitButton);
    }
}

/**
 * Get form data from elements
 * @param {Object} elements - Form elements
 * @returns {Object} - Form data
 */
function getFormData(elements) {
    return {
        name: sanitizeInput(elements.nameInput.value),
        email: sanitizeInput(elements.emailInput.value),
        subject: sanitizeInput(elements.subjectInput ? elements.subjectInput.value : ''),
        message: sanitizeInput(elements.messageInput.value)
    };
}

/**
 * Validate form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result
 */
function validateFormData(formData) {
    // Use the validation utility
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
        return {
            isValid: false,
            message: validation.errors[0] // Show first error
        };
    }
    
    return { isValid: true };
}

/**
 * Show loading state on submit button
 * @param {HTMLElement} button - Submit button
 */
function showLoadingState(button) {
    button.disabled = true;
    const buttonText = button.querySelector('.button-text') || button;
    button.dataset.originalText = buttonText.textContent;
    buttonText.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
}

/**
 * Hide loading state on submit button
 * @param {HTMLElement} button - Submit button
 */
function hideLoadingState(button) {
    button.disabled = false;
    const buttonText = button.querySelector('.button-text') || button;
    buttonText.textContent = button.dataset.originalText || 'Send Message';
}

/**
 * Clear form after successful submission
 * @param {Object} elements - Form elements
 */
function clearForm(elements) {
    elements.nameInput.value = '';
    elements.emailInput.value = '';
    if (elements.subjectInput) elements.subjectInput.value = '';
    elements.messageInput.value = '';
}

/**
 * Add validation listeners to form elements
 * @param {Object} elements - Form elements
 */
function addValidationListeners(elements) {
    // Real-time email validation
    if (elements.emailInput) {
        elements.emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                showNotification('Please enter a valid email address', 'warning');
            }
        });
    }

    // Real-time required field validation
    [elements.nameInput, elements.messageInput].forEach(input => {
        if (input) {
            input.addEventListener('blur', function() {
                const fieldName = this.getAttribute('name') || this.placeholder || 'Field';
                const validation = validateRequired(this.value, fieldName);
                if (!validation.isValid) {
                    showNotification(validation.message, 'warning');
                }
            });
        }
    });
}
