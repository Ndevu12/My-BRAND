/**
 * Dashboard Layout Loader
 * Handles loading dashboard layout components
 */

document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    const headerContainer = document.getElementById('header-container');
    
    // Load the sidebar
    if (sidebarContainer) {
        sidebarContainer.innerHTML = `
            <aside id="sidebar" class="bg-secondary w-64 fixed inset-y-0 left-0 z-30 shadow-xl transition-transform duration-300 ease-in-out overflow-y-auto">
                <!-- Logo -->
                <div class="flex items-center justify-between p-4 border-b border-gray-700">
                    <a href="../../index.html" class="flex items-center space-x-3">
                        <img src="../images/logo1.png" class="h-10 w-10" alt="NdevuSpace Logo">
                        <span class="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">NdevuSpace</span>
                    </a>
                    <!-- Close button (visible on mobile) -->
                    <button id="closeSidebar" class="md:hidden text-gray-400 hover:text-white" title="Close Sidebar">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <!-- Admin profile summary -->
                <div class="p-4 border-b border-gray-700">
                    <div class="flex items-center space-x-3">
                        <div class="h-12 w-12 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center">
                            <span class="font-bold text-xl">N</span>
                        </div>
                        <div>
                            <h3 class="font-medium">Admin User</h3>
                            <p class="text-xs text-gray-400">Super Admin</p>
                        </div>
                    </div>
                </div>
                
                <!-- Navigation links -->
                <nav class="mt-4 px-4">
                    <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Main</h4>
                    <ul class="space-y-1">
                        <li>
                            <a href="./dashboard.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 nav-link" data-page="dashboard">
                                <i class="fas fa-tachometer-alt w-5"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="./all_articles.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 nav-link" data-page="all-articles">
                                <i class="fas fa-newspaper w-5"></i>
                                <span>All Articles</span>
                            </a>
                        </li>
                        <li>
                            <a href="./new-article.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 nav-link" data-page="new-article">
                                <i class="fas fa-plus-circle w-5"></i>
                                <span>New Article</span>
                            </a>
                        </li>
                        
                        <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mt-6 mb-2">Reports</h4>
                        <li>
                            <a href="./analytics.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 nav-link" data-page="analytics">
                                <i class="fas fa-chart-line w-5"></i>
                                <span>Analytics</span>
                            </a>
                        </li>
                        <li>
                            <a href="./comments.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 nav-link" data-page="comments">
                                <i class="fas fa-comments w-5"></i>
                                <span>Comments</span>
                                <span class="bg-red-500 text-white text-xs rounded-full px-2 ml-auto">24</span>
                            </a>
                        </li>
                        
                        <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mt-6 mb-2">Administration</h4>
                        <li>
                            <a href="./settings.html" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 nav-link" data-page="settings">
                                <i class="fas fa-cog w-5"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                
                <!-- Logout button at bottom -->
                <div class="absolute bottom-0 w-full p-4 border-t border-gray-700">
                    <button id="logoutBtn" class="w-full flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-4 rounded-lg transition-colors duration-200">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        `;
    }
    
    // Load the header
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="bg-secondary border-b border-gray-700 shadow-lg sticky top-0 z-20 w-full">
                <div class="flex items-center justify-between px-6 py-3">
                    <!-- Toggle sidebar buttons -->
                    <div class="flex items-center">
                        <button id="openSidebar" class="block md:hidden text-gray-400 hover:text-white p-2" title="Open Sidebar">
                            <i class="fas fa-bars text-xl"></i>
                        </button>
                        <button id="toggleSidebar" class="hidden md:flex items-center justify-center text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700/50" title="Toggle Sidebar">
                            <i class="fas fa-bars text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="flex-1 ml-4 md:ml-0">
                        <div class="flex items-center">
                            <h1 class="text-xl font-bold"></h1>
                            <span class="ml-2 px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">Live</span>
                        </div>
                        <p class="text-sm text-gray-400">Welcome back, Admin</p>
                    </div>
                    
                    <!-- Search bar -->
                    <div class="hidden md:flex items-center bg-primary/50 rounded-lg px-3 py-2 w-1/3 border border-gray-700">
                        <i class="fas fa-search text-gray-400 mr-3"></i>
                        <input type="text" placeholder="Search..." class="bg-transparent w-full focus:outline-none text-gray-300">
                    </div>
                    
                    <!-- User actions -->
                    <div class="flex items-center space-x-4 ml-4">
                        <a href="messages.html" class="relative p-2 rounded-full hover:bg-gray-700 transition-colors">
                            <i class="fas fa-envelope"></i>
                            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </a>
                        <a href="notifications.html" class="relative p-2 rounded-full hover:bg-gray-700 transition-colors">
                            <i class="fas fa-bell"></i>
                            <span class="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-full"></span>
                        </a>
                        <div class="h-8 w-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center">
                            <span class="font-bold">N</span>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    // Set page title and active navigation
    const currentPage = document.body.getAttribute('data-page');
    const pageTitle = document.title.replace('NdevuSpace | ', '');
    
    // Update header title
    const pageHeading = document.querySelector('h1');
    if (pageHeading) {
        pageHeading.textContent = pageTitle || currentPage || 'Dashboard';
    }

    // Highlight active nav link
    if (currentPage) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('bg-gray-800', 'text-yellow-400');
            }
        });
    }
});
