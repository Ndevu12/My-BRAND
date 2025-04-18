/**
 * Rich Text Editor Component
 * A reusable component for TinyMCE integration across the app
 */

/**
 * Initialize a rich text editor on a given element
 * 
 * @param {string|HTMLElement} selector - The element selector or DOM element
 * @param {Object} options - Configuration options
 * @returns {Object} The TinyMCE editor instance
 */
function initRichTextEditor(selector, options = {}) {
  const defaultOptions = {
    height: 500,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
      'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | image link | code | help',
    content_style: 'body { font-family:Roboto,Arial,sans-serif; font-size:16px; color:#d1d5db; }',
    skin: 'oxide-dark',
    content_css: 'dark',
    placeholder: options.placeholder || 'Start writing your content here...',
    images_upload_handler: options.uploadHandler || defaultImageUploadHandler
  };

  // Merge user options with defaults
  const editorOptions = {...defaultOptions, ...options};
  
  return tinymce.init({
    selector: selector,
    ...editorOptions
  });
}

/**
 * Default handler for image uploads
 * 
 * @param {Object} blobInfo - Image blob information
 * @param {Function} progress - Progress callback
 * @returns {Promise<string>} URL of the uploaded image
 */
function defaultImageUploadHandler(blobInfo, progress) {
  return new Promise((resolve, reject) => {
    // In a real implementation, this would upload to your server or cloud storage
    // This is a placeholder that converts the image to a data URL for demo purposes
    
    const reader = new FileReader();
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.onerror = function() {
      reject('Image upload failed');
    };
    reader.readAsDataURL(blobInfo.blob());
  });
}

/**
 * Get content from editor
 * 
 * @param {string} editorId - The ID of the editor instance
 * @returns {string} The editor content
 */
function getEditorContent(editorId) {
  if (tinymce.get(editorId)) {
    return tinymce.get(editorId).getContent();
  }
  return '';
}

/**
 * Set content in editor
 * 
 * @param {string} editorId - The ID of the editor instance
 * @param {string} content - The content to set
 */
function setEditorContent(editorId, content) {
  if (tinymce.get(editorId)) {
    tinymce.get(editorId).setContent(content);
  }
}

/**
 * Destroy an editor instance
 * 
 * @param {string} editorId - The ID of the editor instance to destroy
 */
function destroyEditor(editorId) {
  if (tinymce.get(editorId)) {
    tinymce.get(editorId).destroy();
  }
}

// Export for use as a module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initRichTextEditor,
    getEditorContent,
    setEditorContent,
    destroyEditor
  };
}
