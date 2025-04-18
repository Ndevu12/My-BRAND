/**
 * Dashboard Layout Manager
 * Handles the reusable dashboard layout functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation item
    function setActiveNavItem() {
        const currentPage = document.body.getAttribute('data-page');
        if (!currentPage) return;
        
        // Find and highlight the active navigation link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('bg-gray-800', 'text-yellow-400');
            } else {
                link.classList.remove('bg-gray-800', 'text-yellow-400');
            }
        });
    }
    
    // Initialize page-specific elements
    function initPageTitle() {
        // Update page title
        const metaPageTitle = document.querySelector('meta[name="page-title"]');
        if (metaPageTitle) {
            const pageTitle = metaPageTitle.getAttribute('content');
            document.title = `NdevuSpace | ${pageTitle}`;
            
            // Update heading if it exists
            const pageHeading = document.querySelector('h1');
            if (pageHeading) {
                pageHeading.textContent = pageTitle;
            }
        }
    }
    
    // Initialize the dashboard layout
    function initDashboard() {
        setActiveNavItem();
        initPageTitle();
    }
    
    // Run initialization
    initDashboard();
});
