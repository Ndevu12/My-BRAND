/**
 * Navigation utilities for the projects feature
 */

/**
 * Navigates to the contact section on the home page
 * @param projectTitle - Optional project title to include in the contact context
 */
export const navigateToContactForm = (projectTitle?: string) => {
  const currentUrl = new URL(window.location.href);
  const isOnHomePage = currentUrl.pathname === '/';
  
  if (isOnHomePage) {
    // If already on home page, just scroll to contact section
    const contactSection = document.getElementById('contactme');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  } else {
    // If on another page, navigate to home page with contact hash
    let targetUrl = '/#contactme';
    
    // Add project context if provided
    if (projectTitle) {
      const params = new URLSearchParams();
      params.set('project', projectTitle);
      targetUrl += `?${params.toString()}`;
    }
    
    window.location.href = targetUrl;
  }
};

/**
 * Opens external link in new tab with proper security
 */
export const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
