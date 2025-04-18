/**
 * Sidebar control functionality for the dashboard
 * Fixed for proper sidebar visibility and display
 */

document.addEventListener('DOMContentLoaded', function() {
    // Core elements
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const body = document.body;
    
    // Control buttons
    const openSidebarBtn = document.getElementById('openSidebar');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    
    // Storage key
    const SIDEBAR_STATE_KEY = 'dashboard_sidebar_state';
    const SIDEBAR_COLLAPSED = 'collapsed';
    const SIDEBAR_EXPANDED = 'expanded';
    
    // Utility function to check if on mobile
    const isMobile = () => window.innerWidth < 768;

    // Mobile sidebar controls
    function showSidebarMobile() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.add('sidebar-visible');
            sidebarOverlay.classList.remove('hidden');
            body.classList.add('overflow-hidden');
        }
    }
    
    function hideSidebarMobile() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.remove('sidebar-visible');
            sidebarOverlay.classList.add('hidden');
            body.classList.remove('overflow-hidden');
        }
    }
    
    // Desktop sidebar controls
    function toggleSidebarDesktop() {
        if (body) {
            body.classList.toggle('sidebar-collapsed');
            
            if (toggleSidebarBtn) {
                const icon = toggleSidebarBtn.querySelector('i');
                if (icon) {
                    if (body.classList.contains('sidebar-collapsed')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-expand');
                        localStorage.setItem(SIDEBAR_STATE_KEY, SIDEBAR_COLLAPSED);
                    } else {
                        icon.classList.remove('fa-expand');
                        icon.classList.add('fa-bars');
                        localStorage.setItem(SIDEBAR_STATE_KEY, SIDEBAR_EXPANDED);
                    }
                }
            }
        }
    }

    // Handle screen size changes
    function handleResize() {
        const header = document.querySelector('header');
        
        if (!isMobile()) {
            // On desktop
            if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
            body.classList.remove('overflow-hidden');
            
            if (header) header.classList.add('header-continuous');
            
            // Restore saved sidebar state
            const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
            
            if (savedState === SIDEBAR_COLLAPSED) {
                body.classList.add('sidebar-collapsed');
                if (toggleSidebarBtn && toggleSidebarBtn.querySelector('i')) {
                    toggleSidebarBtn.querySelector('i').classList.remove('fa-bars');
                    toggleSidebarBtn.querySelector('i').classList.add('fa-expand');
                }
            } else {
                body.classList.remove('sidebar-collapsed');
                if (toggleSidebarBtn && toggleSidebarBtn.querySelector('i')) {
                    toggleSidebarBtn.querySelector('i').classList.remove('fa-expand');
                    toggleSidebarBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        } else {
            // On mobile
            if (sidebar) sidebar.classList.remove('sidebar-visible');
            if (header) header.classList.remove('header-continuous');
            body.classList.remove('sidebar-collapsed');
        }
    }
    
    // Attach event listeners
    if (openSidebarBtn) {
        openSidebarBtn.addEventListener('click', showSidebarMobile);
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', hideSidebarMobile);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', hideSidebarMobile);
    }
    
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', toggleSidebarDesktop);
    }
    
    // Initialize on page load
    window.addEventListener('resize', handleResize);
    handleResize();
});
