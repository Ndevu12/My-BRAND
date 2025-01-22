/**
 * Paths Utility
 * Helper functions to resolve paths throughout the application
 */

/**
 * Get the base path for navigation based on current location
 * @returns {Object} Object containing various path properties
 */
export function getPaths() {
  // Get the current location
  const currentLocation = window.location;
  const path = currentLocation.pathname;
  
  // Determine if we're on the home page or in a subfolder
  const isHomePage = path === '/' || 
                     path.endsWith('index.html') || 
                     path.endsWith('My-BRAND/') || 
                     path === '/My-BRAND';
  
  // Check if we're in a specific subdirectory
  const isInSrcPages = path.includes('/src/pages/');
  const isInViews = path.includes('/views/');
  
  // Compute relative paths based on current location
  let homePath = '';
  let pagesPath = '';
  let imgPath = '';
  
  if (isHomePage) {
    // On home page
    homePath = './index.html';
    pagesPath = './src/pages/';
    imgPath = './src/images/';
  } else if (isInSrcPages) {
    // In src/pages directory
    homePath = '../../index.html';
    pagesPath = './';
    imgPath = '../images/';
  } else if (isInViews) {
    // In views directory
    homePath = '../index.html';
    pagesPath = '../src/pages/';
    imgPath = '../src/images/';
  } else {
    // Default fallback
    homePath = './index.html';
    pagesPath = './src/pages/';
    imgPath = './src/images/';
  }
  
  return {
    homePath,
    pagesPath,
    imgPath,
    isHomePage,
    isInSrcPages,
    isInViews
  };
}

/**
 * Resolves a path relative to the current location
 * @param {string} path - The path to resolve
 * @returns {string} Resolved path
 */
export function resolvePath(path) {
  const { homePath, pagesPath, imgPath } = getPaths();
  
  // Handle special cases
  if (path === 'home' || path === 'index') {
    return homePath;
  }
  
  if (path.startsWith('#')) {
    // For anchor links, prepend the home path if we're not on the home page
    const { isHomePage } = getPaths();
    return isHomePage ? path : `${homePath}${path}`;
  }
  
  // For page links, use the pages path
  if (path.endsWith('.html')) {
    return `${pagesPath}${path}`;
  }
  
  // For image links, use the images path
  if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.svg') || path.endsWith('.gif')) {
    return `${imgPath}${path}`;
  }
  
  // Default fallback
  return path;
}
