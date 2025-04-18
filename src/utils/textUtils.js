/**
 * Text Utility Functions
 * Contains utilities for text manipulation and formatting
 */

// Define constant for maximum description length to ensure consistent card height
const MAX_DESCRIPTION_LENGTH = 120;

/**
 * Truncates text to a specified length and adds an ellipsis if needed
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation (defaults to MAX_DESCRIPTION_LENGTH)
 * @returns {string} - Truncated text with ellipsis if needed
 */
function truncateText(text, maxLength = MAX_DESCRIPTION_LENGTH) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

/**
 * Measures the text length and returns a CSS class for appropriate sizing
 * @param {string} text - The text to evaluate
 * @returns {string} - CSS class for text sizing
 */
function getTextSizeClass(text) {
  if (!text) return 'text-sm';
  
  if (text.length > 150) {
    return 'text-xs leading-snug';
  } else {
    return 'text-sm leading-relaxed';
  }
}

/**
 * Creates a consistent card description that fits within the desired squared dimensions
 * @param {string} description - The original description text
 * @param {number} maxLength - Maximum length before truncation
 * @returns {Object} - Object containing truncated text and indicator if text was truncated
 */
function createSquaredCardDescription(description, maxLength = MAX_DESCRIPTION_LENGTH) {
  const isTruncated = description.length > maxLength;
  const truncatedText = isTruncated ? truncateText(description, maxLength) : description;
  const textSizeClass = getTextSizeClass(description);
  
  return {
    truncatedText,
    isTruncated,
    textSizeClass,
    originalText: description
  };
}

// Export utilities and constants for use in other files
export { 
  truncateText, 
  getTextSizeClass, 
  createSquaredCardDescription,
  MAX_DESCRIPTION_LENGTH 
};