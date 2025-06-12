/**
 * Admin Blog Management
 * Handles the blog list with pagination, filtering, and CRUD operations for the dashboard
 * Uses the existing modular pagination components for consistency and reusability
 */

import { getAdminBlogs, deleteBlog } from '../actions/blogs/blogActions.js';
import { getCategoryBadgeHTML } from '../../utils/categoryUtils.js';
import { showNotification } from '../../utils/notificationUtils.js';

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const blogsTableBody = document.querySelector('#blogs-table-body');
    const paginationContainer = document.getElementById('pagination-container');
    const filterButton = document.getElementById('filter-button');
    const filterPanel = document.getElementById('filter-panel');
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');
    const sortOptions = document.getElementById('sort-options');
    const applyFilters = document.getElementById('apply-filters');
    const clearFilters = document.getElementById('clear-filters');
    const searchInput = document.querySelector('input[placeholder="Search..."]');    // State Management
    let currentFilters = {
        page: 1,
        limit: 10,
        status: '',
        category: '',
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    };    
    // Pagination instance for reusability
    let paginationInstance = null;

    // Loading flag to prevent multiple simultaneous requests
    let isLoading = false;

    // Initialize
    init();

    function init() {
        initFilterPanel();
        populateCategoryFilter();
        initEventListeners();
        loadBlogs();
    }

    function initFilterPanel() {
        if (filterButton && filterPanel) {
            filterButton.addEventListener('click', function() {
                filterPanel.classList.toggle('hidden');
                
                const icon = this.querySelector('i');
                if (icon) {
                    if (filterPanel.classList.contains('hidden')) {
                        icon.className = 'fas fa-filter mr-2';
                    } else {
                        icon.className = 'fas fa-times mr-2';
                    }
                }
            });
        }
    }

    function populateCategoryFilter() {
        if (!categoryFilter || !window.categoryManager) return;
        
        const categories = window.categoryManager.getAllCategories();
        
        // Clear existing options except the first one (All Categories)
        while (categoryFilter.children.length > 1) {
            categoryFilter.removeChild(categoryFilter.lastChild);
        }
        
        // Add category options
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });
    }

    function initEventListeners() {
        // Filter controls
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                currentFilters.category = this.value;
            });
        }

        if (statusFilter) {
            statusFilter.addEventListener('change', function() {
                currentFilters.status = this.value;
            });
        }

        if (sortOptions) {
            sortOptions.addEventListener('change', function() {
                const [sortBy, sortOrder] = this.value.split('_');
                currentFilters.sortBy = sortBy;
                currentFilters.sortOrder = sortOrder || 'desc';
            });
        }

        // Apply filters button
        if (applyFilters) {
            applyFilters.addEventListener('click', function() {
                currentFilters.page = 1; // Reset to first page
                loadBlogs();
                
                // Hide filter panel
                if (filterPanel) {
                    filterPanel.classList.add('hidden');
                    const icon = filterButton.querySelector('i');
                    if (icon) icon.className = 'fas fa-filter mr-2';
                }
            });
        }

        // Clear filters button
        if (clearFilters) {
            clearFilters.addEventListener('click', function() {
                // Reset filters
                currentFilters = {
                    page: 1,
                    limit: 10,
                    status: '',
                    category: '',
                    search: '',
                    sortBy: 'createdAt',
                    sortOrder: 'desc'
                };

                // Reset form inputs
                if (categoryFilter) categoryFilter.value = '';
                if (statusFilter) statusFilter.value = '';
                if (sortOptions) sortOptions.value = 'createdAt_desc';
                if (searchInput) searchInput.value = '';

                loadBlogs();
            });
        }

        // Search input with debounce
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function() {
                currentFilters.search = this.value.toLowerCase();
                currentFilters.page = 1; // Reset to first page
                loadBlogs();
            }, 300));
        }
    }

    async function loadBlogs() {
        if (!blogsTableBody) return;
        
        // Prevent multiple simultaneous requests
        if (isLoading) {
            console.log('loadBlogs called but already loading, skipping...');
            return;
        }
        
        console.log('loadBlogs called with filters:', currentFilters);
        isLoading = true;

        try {
            // Show loading state
            showLoadingState();

            // Fetch blogs from server
            const response = await getAdminBlogs(currentFilters);
            
            // Handle different response structures gracefully
            let blogs, pagination;
            if (response && typeof response === 'object') {
                // Check if response has the expected structure
                if (response.blogs && response.pagination) {
                    blogs = response.blogs;
                    pagination = response.pagination;
                } else if (Array.isArray(response)) {
                    // Fallback: if response is just an array of blogs
                    blogs = response;
                    pagination = {
                        currentPage: currentFilters.page,
                        totalPages: 1,
                        totalBlogs: response.length,
                        blogsPerPage: currentFilters.limit
                    };
                } else {
                    // Response structure is unexpected
                    throw new Error('Invalid response structure from server');
                }
            } else {
                throw new Error('No data received from server');
            }

            // Ensure blogs is an array
            blogs = Array.isArray(blogs) ? blogs : [];

            // Render blogs
            renderBlogs(blogs);            // Setup pagination with a slight delay to prevent callback during initialization
            setTimeout(() => {
                setupPagination(pagination);
            }, 10);

        } catch (error) {
            console.error('Error loading blogs:', error);
            showErrorState(error.message);
            
            // Clear pagination on error
            if (paginationContainer) {
                paginationContainer.innerHTML = '';
            }
        } finally {
            // Reset loading flag
            isLoading = false;
        }
    }

    function showLoadingState() {
        blogsTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-400">
                    <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    Loading blogs...
                </td>
            </tr>
        `;
    }

    function showErrorState(message) {
        blogsTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-400">
                    <div class="text-red-400 mb-4">
                        <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                        <p class="font-bold">Error Loading Blogs</p>
                        <p class="text-sm">${message}</p>
                    </div>
                </td>
            </tr>
        `;
    }

    function renderBlogs(blogs) {
        if (!blogsTableBody) return;

        blogsTableBody.innerHTML = '';

        // Show empty state if no blogs
        if (!blogs || blogs.length === 0) {
            blogsTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-10 text-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p class="text-lg font-bold mb-1">No blogs found</p>
                        <p>Try adjusting your filters or create a new blog</p>
                    </td>
                </tr>
            `;
            return;
        }

        // Render each blog
        blogs?.forEach(blog => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-800/30 transition-colors';

            // Get category badge using the existing utility
            let categoryBadge = '';
            if (blog.category && blog.category.name) {
                categoryBadge =blog.category.name;
            } else if (blog.categoryId) {
                categoryBadge = getCategoryBadgeHTML(blog.categoryId);
            } else {
                categoryBadge = `
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-600/20 text-gray-300">
                        Uncategorized
                    </span>
                `;
            }

            // Status badge
            let statusBadge = '';
            if (blog.status === 'published') {
                statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Published</span>`;
            } else if (blog.status === 'draft') {
                statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>`;
            } else if (blog.status === 'archived') {
                statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Archived</span>`;
            } else {
                statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">${blog.status || 'Unknown'}</span>`;
            }            // Format date - use publishedAt for published blogs, createdAt otherwise
            const dateToShow = blog.status === 'published' && blog.publishedAt ? blog.publishedAt : blog.createdAt;
            const formattedDate = dateToShow 
                ? new Date(dateToShow).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) 
                : 'Not set';

            // Use inline SVG placeholder to avoid network errors
            const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUNBM0FGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CbG9nPC90ZXh0Pgo8L3N2Zz4K';

            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <img class="h-10 w-10 rounded-md object-cover bg-gray-800 mr-4" src="${blog.image || blog.imageUrl || fallbackImage}" alt="${blog.title || 'Blog image'}" onerror="this.src='${fallbackImage}'">
                        <div>
                            <div class="text-sm font-medium">${blog.title || 'Untitled'}</div>
                            <div class="text-xs text-gray-400">${blog.excerpt?.substring(0, 60) + '...' || blog.description?.substring(0, 60) + '...' || ''}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${categoryBadge}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-300">${formattedDate}</div>
                    ${blog.viewsCount ? `<div class="text-xs text-gray-400">${blog.viewsCount.toLocaleString()} views</div>` : ''}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${statusBadge}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="./edit-article.html?id=${blog._id}" class="text-blue-400 hover:text-blue-300 mr-3" title="Edit Blog"><i class="fas fa-edit"></i></a>
                    <button class="text-yellow-400 hover:text-yellow-300 mr-3 view-btn" data-id="${blog._id}" title="View Blog"><i class="fas fa-eye"></i></button>
                    <button class="text-red-400 hover:text-red-300 delete-btn" data-id="${blog._id}" title="Delete Blog"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;

            blogsTableBody.appendChild(row);
        });

        // Add event listeners to action buttons
        addActionListeners();
    }    function setupPagination(pagination) {
        if (!paginationContainer || !pagination) return;

        // Clear any existing pagination first
        if (paginationInstance) {
            paginationContainer.innerHTML = '';
            paginationInstance = null;
        }

        // Use the existing table pagination component for consistency
        if (typeof createTablePagination === 'function') {
            // Flag to prevent initial callback during setup
            let isInitialSetup = true;
            
            paginationInstance = createTablePagination(paginationContainer, {
                currentPage: pagination.currentPage,
                totalPages: pagination.totalPages,
                totalItems: pagination.totalBlogs,
                pageSize: currentFilters.limit,
                pageSizeOptions: [5, 10, 25, 50],
                withText: true
            }, function(paginationData) {
                // Skip the callback during initial setup
                if (isInitialSetup) {
                    console.log('Skipping initial pagination setup callback');
                    return;
                }
                
                // Prevent callback during loading
                if (isLoading) {
                    console.log('Pagination callback blocked - currently loading');
                    return;
                }
                
                const newPage = paginationData.page || pagination.currentPage;
                const newPageSize = paginationData.pageSize || currentFilters.limit;
                
                // Only proceed if there's a meaningful change
                const pageChanged = newPage !== currentFilters.page;
                const pageSizeChanged = newPageSize !== currentFilters.limit;
                
                if (pageChanged || pageSizeChanged) {
                    console.log('Valid pagination change:', { 
                        from: { page: currentFilters.page, size: currentFilters.limit },
                        to: { page: newPage, size: newPageSize }
                    });
                    
                    // Update filters
                    currentFilters.page = newPage;
                    currentFilters.limit = newPageSize;
                    
                    // Load blogs with new pagination settings
                    loadBlogs();
                } else {
                    console.log('Pagination callback ignored - no meaningful change');
                }
            });
            
            // Mark setup as complete after brief delay
            setTimeout(() => {
                isInitialSetup = false;
                console.log('Pagination setup complete, callbacks now enabled');
            }, 50);
        } else {
            console.warn('createTablePagination function not available, falling back to basic pagination');
            // Fallback to simple pagination if the function is not available
            setupBasicPagination(pagination);
        }
    }

    function setupBasicPagination(pagination) {
        paginationContainer.innerHTML = '';
        
        if (pagination.totalPages <= 1) return;

        const { currentPage, totalPages, totalBlogs, blogsPerPage } = pagination;

        const paginationWrapper = document.createElement('div');
        paginationWrapper.className = 'flex items-center justify-between';

        // Info text
        const infoText = document.createElement('div');
        infoText.className = 'text-sm text-gray-400';
        const startItem = (currentPage - 1) * blogsPerPage + 1;
        const endItem = Math.min(currentPage * blogsPerPage, totalBlogs);
        infoText.textContent = `Showing ${startItem} to ${endItem} of ${totalBlogs} blogs`;

        // Pagination controls
        const controls = document.createElement('div');
        controls.className = 'flex items-center space-x-2';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.className = `p-2 rounded-md ${currentPage <= 1 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700'}`;
        prevBtn.disabled = currentPage <= 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentFilters.page = currentPage - 1;
                loadBlogs();
            }
        });
        controls.appendChild(prevBtn);

        // Page numbers (simplified)
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = `px-3 py-1 rounded-md ${i === currentPage ? 'bg-yellow-500 text-gray-900' : 'text-gray-300 hover:bg-gray-700'}`;
            pageBtn.addEventListener('click', () => {
                currentFilters.page = i;
                loadBlogs();
            });
            controls.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.className = `p-2 rounded-md ${currentPage >= totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700'}`;
        nextBtn.disabled = currentPage >= totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentFilters.page = currentPage + 1;
                loadBlogs();
            }
        });
        controls.appendChild(nextBtn);

        paginationWrapper.appendChild(infoText);
        paginationWrapper.appendChild(controls);
        paginationContainer.appendChild(paginationWrapper);
    }    function addActionListeners() {
        // View buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const blogId = this.dataset.id;
                // Open blog in new tab or navigate to blog detail page
                window.open(`../pages/blog-detail.html?id=${blogId}`, '_blank');
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const blogId = this.dataset.id;
                const blogTitle = this.closest('tr').querySelector('.text-sm.font-medium').textContent;
                
                if (confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
                    deleteBlogById(blogId);
                }
            });
        });
    }

    async function deleteBlogById(blogId) {
        try {
            await deleteBlog(blogId);
            showNotification('Blog deleted successfully', 'success');
            loadBlogs(); // Reload the current page
        } catch (error) {
            console.error('Error deleting blog:', error);
            showNotification(`Failed to delete blog: ${error.message}`, 'error');
        }
    }

    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const context = this;
            const later = function() {
                clearTimeout(timeout);
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});
