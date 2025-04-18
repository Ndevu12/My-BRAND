/**
 * Blog Loader Utility
 * Determines whether to use API data or dummy data for blogs
 */

// Flag to control data source - change this to switch between API and dummy data
const USE_DUMMY_DATA = true;

/**
 * Load the appropriate blog script based on configuration
 */
export function loadBlogScript() {
  const scriptElement = document.createElement('script');
  scriptElement.type = 'module';
  
  if (USE_DUMMY_DATA) {
    scriptElement.src = '../scripts/blogs/publicBlogs.js';
  } else {
    scriptElement.src = '../scripts/blogs/blogs.js';
  }
  
  document.body.appendChild(scriptElement);
}

/**
 * Get the data source being used
 * @returns {string} The name of the data source
 */
export function getDataSource() {
  return USE_DUMMY_DATA ? 'dummyBlogs' : 'API';
}
