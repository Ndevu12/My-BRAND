/**
 * Form Validation Utility
 * Provides reusable form validation functions
 */

/**
 * Validate email format using a comprehensive regex
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Comprehensive email regex that matches RFC 5322 standard
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} - Validation result with isValid and message
 */
export function validateRequired(value, fieldName) {
  const trimmedValue = value ? value.trim() : '';
  
  if (!trimmedValue) {
    return {
      isValid: false,
      message: `${fieldName} is required`
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
}

/**
 * Sanitize input to prevent XSS attacks
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate message length
 * @param {string} message - Message to validate
 * @param {number} minLength - Minimum length (default: 10)
 * @param {number} maxLength - Maximum length (default: 1000)
 * @returns {Object} - Validation result
 */
export function validateMessageLength(message, minLength = 10, maxLength = 1000) {
  const trimmedMessage = message ? message.trim() : '';
  
  if (trimmedMessage.length < minLength) {
    return {
      isValid: false,
      message: `Message must be at least ${minLength} characters long`
    };
  }
  
  if (trimmedMessage.length > maxLength) {
    return {
      isValid: false,
      message: `Message must not exceed ${maxLength} characters`
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
}

/**
 * Validate form data for contact form
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result with isValid, errors array
 */
export function validateContactForm(formData) {
  const errors = [];
  
  // Validate name
  const nameValidation = validateRequired(formData.name, 'Name');
  if (!nameValidation.isValid) {
    errors.push(nameValidation.message);
  }
  
  // Validate email
  const emailValidation = validateRequired(formData.email, 'Email');
  if (!emailValidation.isValid) {
    errors.push(emailValidation.message);
  } else if (!validateEmail(formData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  // Validate message
  const messageValidation = validateRequired(formData.message, 'Message');
  if (!messageValidation.isValid) {
    errors.push(messageValidation.message);
  } else {
    const lengthValidation = validateMessageLength(formData.message);
    if (!lengthValidation.isValid) {
      errors.push(lengthValidation.message);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
