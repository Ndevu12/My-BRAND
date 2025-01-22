/**
 * Protected Route Utility
 * Handles authentication checks for protected routes
 */

/**
 * Function to protect admin routes
 * Redirects to login page if user is not authenticated
 */
export function protectAdminRoute() {
  console.log('Protect Admin Route');
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You are not authorized to view this page. Please login.');
    window.location.href = '/src/pages/NotAllowed.html';
    return;
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}
