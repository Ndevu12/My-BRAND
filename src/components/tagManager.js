/**
 * Tag Manager Component
 * A reusable component for managing tags in forms
 */

/**
 * Creates and initializes a tag management system
 * 
 * @param {Object} config - Configuration options
 * @param {string|HTMLElement} config.inputSelector - The input field selector or element
 * @param {string|HTMLElement} config.containerSelector - The container selector or element where tags will be displayed
 * @param {string} [config.tagClass] - CSS class for the tag elements
 * @param {string} [config.delimiter] - Delimiter character for separating tags (default: comma)
 * @param {Array<string>} [config.initialTags] - Initial tags to display
 * @returns {Object} Methods for interacting with the tag manager
 */
function createTagManager(config) {
  const inputElement = typeof config.inputSelector === 'string' 
    ? document.querySelector(config.inputSelector) 
    : config.inputSelector;
  
  const containerElement = typeof config.containerSelector === 'string'
    ? document.querySelector(config.containerSelector)
    : config.containerSelector;
    
  const tagClass = config.tagClass || 'bg-primary/70 text-gray-300 px-2 py-1 text-sm rounded-full flex items-center';
  const delimiter = config.delimiter || ',';
  
  if (!inputElement || !containerElement) {
    console.error('Tag manager: Input or container elements not found');
    return null;
  }
  
  // Initialize with any existing tags from container
  const existingTags = Array.from(containerElement.querySelectorAll('span')).map(
    tag => tag.textContent.replace(/×|✖|✕|×|\u00D7|\u2715|\u2716|\u274C/g, '').trim()
  );
  
  // Clear any existing button listeners to prevent duplicates
  containerElement.querySelectorAll('button').forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });
  
  // Add click handlers to existing tag buttons
  containerElement.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function() {
      btn.parentElement.remove();
      updateInputWithTags();
    });
  });
  
  // Add any initial tags provided in config
  if (config.initialTags && Array.isArray(config.initialTags)) {
    // First clear any existing tags if we're explicitly setting initial tags
    containerElement.innerHTML = '';
    
    config.initialTags.forEach(tag => {
      if (tag && tag.trim()) {
        addTag(tag.trim());
      }
    });
  }
  
  // Create a tag element with remove button
  function addTag(tagText) {
    // Don't add empty or duplicate tags
    if (!tagText || getTagsArray().includes(tagText)) {
      return;
    }
    
    const tag = document.createElement('span');
    tag.className = tagClass;
    tag.innerHTML = `
      ${tagText}
      <button type="button" class="ml-1 text-gray-400 hover:text-red-400">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add remove functionality
    tag.querySelector('button').addEventListener('click', function() {
      tag.remove();
      updateInputWithTags();
    });
    
    containerElement.appendChild(tag);
    updateInputWithTags();
  }
  
  // Update input value with all current tags
  function updateInputWithTags() {
    inputElement.value = getTagsArray().join(delimiter + ' ');
  }
  
  // Get array of current tags
  function getTagsArray() {
    return Array.from(containerElement.querySelectorAll('span')).map(
      tag => tag.textContent.replace(/×|✖|✕|×|\u00D7|\u2715|\u2716|\u274C/g, '').trim()
    );
  }
  
  // Handle input events for adding tags
  inputElement.addEventListener('keydown', function(e) {
    // Add tag on Enter or delimiter key press
    if (e.key === 'Enter' || e.key === delimiter) {
      e.preventDefault();
      
      const inputValue = inputElement.value.trim();
      if (inputValue) {
        // Handle multiple tags pasted or typed with delimiters
        const newTags = inputValue.split(delimiter).map(t => t.trim()).filter(t => t);
        newTags.forEach(addTag);
        inputElement.value = '';
      }
    }
  });
  
  // Handle blur event to add any remaining text as tag
  inputElement.addEventListener('blur', function() {
    const inputValue = inputElement.value.trim();
    if (inputValue) {
      // Handle multiple tags pasted or typed with delimiters
      const newTags = inputValue.split(delimiter).map(t => t.trim()).filter(t => t);
      newTags.forEach(addTag);
      inputElement.value = '';
    }
  });
  
  // Public methods
  return {
    /**
     * Add a new tag
     * @param {string} tag - Tag text
     */
    addTag,
    
    /**
     * Get all tags as an array
     * @returns {Array<string>} Array of tag strings
     */
    getTags: getTagsArray,
    
    /**
     * Set tags, replacing all existing tags
     * @param {Array<string>} tags - Array of tag strings
     */
    setTags: function(tags) {
      containerElement.innerHTML = '';
      if (Array.isArray(tags)) {
        tags.forEach(addTag);
      }
    },
    
    /**
     * Clear all tags
     */
    clearTags: function() {
      containerElement.innerHTML = '';
      inputElement.value = '';
    }
  };
}

// Export for use as a module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createTagManager
  };
}
