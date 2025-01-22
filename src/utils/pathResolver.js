/**
 * Path resolver utility to help with consistent path handling across
 * different parts of the application
 */

/**
 * Determine if the current page is on the home/index page
 * @returns {boolean} True if on home page
 */
export function isHomePage() {
  const path = window.location.pathname;
  return path === '/' || 
         path.endsWith('index.html') || 
         path.endsWith('My-BRAND/') || 
         path === '/My-BRAND';
}

/**
 * Get the base path for assets depending on current location
 * @returns {string} The correct base path prefix
 */
export function getBasePath() {
  const path = window.location.pathname;
  
  // Check if we're on homepage or in a subfolder
  if (isHomePage()) {
    return './src/';
  } else if (path.includes('/src/pages/') || path.includes('/views/')) {
    return '../';
  } else {
    return './';
  }
}

/**
 * Get the path to the images folder
 * @returns {string} The correct path to images
 */
export function getImagePath() {
  return isHomePage() ? './src/images/' : '../images/';
}

/**
 * Get the path to the pages folder
 * @returns {string} The correct path to HTML pages
 */
export function getPagesPath() {
  return `${getBasePath()}pages/`;
}

/**
 * Create a path relative to the current location
 * @param {string} targetPath - The target path to resolve
 * @returns {string} The correctly resolved path
 */
export function resolvePath(targetPath) {
  if (targetPath.startsWith('/')) {
    // Absolute path from site root
    return targetPath;
  } else if (targetPath.startsWith('#')) {
    // Anchor link
    return targetPath;
  } else {
    // Relative path
    return `${getBasePath()}${targetPath}`;
  }
}
