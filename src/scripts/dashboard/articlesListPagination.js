/**
 * Articles List Pagination and Category Filtering
 * Handles the pagination and filtering of articles in the dashboard
 */

import { getDashboardArticles } from '../../data/dashboardArticles.js';
import { getCategoryBadgeHTML } from '../../utils/categoryUtils.js';

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const articlesTable = document.getElementById('articles-table');
    const articlesTableBody = document.querySelector('#articles-table-body');
    const paginationContainer = document.getElementById('pagination-container');
    const filterButton = document.getElementById('filter-button');
    const filterPanel = document.getElementById('filter-panel');
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');
    const sortOptions = document.getElementById('sort-options');
    const applyFilters = document.getElementById('apply-filters');
    const clearFilters = document.getElementById('clear-filters');
    const searchInput = document.querySelector('input[placeholder="Search..."]');
    
    // State
    let currentPage = 1;
    const itemsPerPage = 3;
    let selectedCategory = '';
    let selectedStatus = '';
    let searchTerm = '';
    let sortOption = 'newest';
    
    // Initialize
    init();
    
    function init() {
        // Initialize filter panel toggle
        initFilterPanel();
        
        // Populate category filter with CategoryManager data
        populateCategoryFilter();
        
        // Load articles with initial state
        loadArticles();
        
        // Initialize filters
        initFilters();
    }
    
    function initFilterPanel() {
        if (filterButton && filterPanel) {
            filterButton.addEventListener('click', function() {
                filterPanel.classList.toggle('hidden');
                
                // Update button icon
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
        
        // Get categories from the updated CategoryManager (array-based)
        const categories = window.categoryManager.getAllCategories();
        
        // First, add an "All Categories" option
        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = 'All Categories';
        categoryFilter.appendChild(allOption);
        
        // Add each category as an option
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });
    }
    
    function initFilters() {
        // Category filter
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                selectedCategory = this.value;
            });
        }
        
        // Status filter
        if (statusFilter) {
            statusFilter.addEventListener('change', function() {
                selectedStatus = this.value;
            });
        }
        
        // Sort options
        if (sortOptions) {
            sortOptions.addEventListener('change', function() {
                sortOption = this.value;
            });
        }
        
        // Apply filters button
        if (applyFilters) {
            applyFilters.addEventListener('click', function() {
                currentPage = 1;
                loadArticles();
                
                // Hide filter panel after applying filters
                if (filterPanel) {
                    filterPanel.classList.add('hidden');
                    
                    // Update button icon
                    const icon = filterButton.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-filter mr-2';
                    }
                }
            });
        }
        
        // Clear filters button
        if (clearFilters) {
            clearFilters.addEventListener('click', function() {
                // Reset filters
                selectedCategory = '';
                selectedStatus = '';
                sortOption = 'newest';
                searchTerm = '';
                currentPage = 1;
                
                // Reset form inputs
                if (categoryFilter) categoryFilter.value = '';
                if (statusFilter) statusFilter.value = '';
                if (sortOptions) sortOptions.value = 'newest';
                if (searchInput) searchInput.value = '';
                
                // Reload articles
                loadArticles();
            });
        }
        
        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function() {
                searchTerm = this.value.toLowerCase();
                currentPage = 1;
                loadArticles();
            }, 300));
        }
    }
    
    function loadArticles() {
        if (!articlesTableBody) return;
        
        // Show loading state
        articlesTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-400">
                    <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    Loading articles...
                </td>
            </tr>
        `;
        
        // Get articles data with current filters and pagination
        const { articles, totalItems, totalPages } = getDashboardArticles({
            page: currentPage,
            pageSize: itemsPerPage,
            category: selectedCategory,
            status: selectedStatus,
            search: searchTerm,
            sort: sortOption
        });
        
        // Render articles
        renderArticles(articles);
        
        // Setup pagination
        setupPagination(currentPage, totalPages, totalItems);
    }
    
    function renderArticles(articles) {
        if (!articlesTableBody) return;
        
        // Clear table
        articlesTableBody.innerHTML = '';
        
        // Show empty state if no articles
        if (articles.length === 0) {
            articlesTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-10 text-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p class="text-lg font-bold mb-1">No articles found</p>
                        <p>Try adjusting your filters or create a new article</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        // Render articles
        articles.forEach(article => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-800/30 transition-colors';
            
            // Get category info using our utility function
            let categoryBadge = '';
            if (article.category) {
                categoryBadge = getCategoryBadgeHTML(article.category);
            } else {
                categoryBadge = `
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-600/20 text-gray-300">
                        Uncategorized
                    </span>
                `;
            }
            
            // Status badge
            let statusBadge = '';
            if (article.status === 'published') {
                statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Published</span>`;
            } else if (article.status === 'draft') {
                statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>`;
            } else {
                statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">${article.status}</span>`;
            }
            
            const publishDate = article.publishDate 
                ? new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) 
                : 'Not published';
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <img class="h-10 w-10 rounded-md object-cover bg-gray-800 mr-4" src="${article.imageUrl || 'https://via.placeholder.com/100'}" alt="${article.title}">
                        <div>
                            <div class="text-sm font-medium">${article.title}</div>
                            <div class="text-xs text-gray-400">${article.subtitle || ''}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${categoryBadge}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-300">${publishDate}</div>
                    ${article.views ? `<div class="text-xs text-gray-400">${article.views.toLocaleString()} views</div>` : ''}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${statusBadge}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="./edit-article.html?id=${article.id}" class="text-blue-400 hover:text-blue-300 mr-3" title="Edit Article"><i class="fas fa-edit"></i></a>
                    <button class="text-yellow-400 hover:text-yellow-300 mr-3 view-btn" data-id="${article.id}" title="View Article"><i class="fas fa-eye"></i></button>
                    <button class="text-red-400 hover:text-red-300 delete-btn" data-id="${article.id}" title="Delete Article"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            
            articlesTableBody.appendChild(row);
        });
        
        // Add event listeners to action buttons
        addActionListeners();
    }
    
    function addActionListeners() {
        // View buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const articleId = this.dataset.id;
                window.open(`../pages/blog-detail.html?id=${articleId}`, '_blank');
            });
        });
        
        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const articleId = this.dataset.id;
                if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
                    deleteArticle(articleId);
                }
            });
        });
    }
    
    function deleteArticle(id) {
        // Show notification
        showNotification('Article deleted successfully', 'success');
        
        // Refresh articles list
        loadArticles();
    }
    
    function setupPagination(currentPage, totalPages, totalItems) {
        if (!paginationContainer) return;
        
        // If we're using the TablePagination from dashboardPagination.js
        if (typeof createTablePagination === 'function') {
            createTablePagination(paginationContainer, {
                currentPage: currentPage,
                totalPages: totalPages,
                totalItems: totalItems,
                pageSize: itemsPerPage,
                withText: true
            }, function(paginationData) {
                currentPage = paginationData.page;
                loadArticles();
            });
        } else {
            // Simple fallback pagination
            simplePagination(currentPage, totalPages);
        }
    }
    
    function simplePagination(currentPage, totalPages) {
        paginationContainer.innerHTML = '';
        
        const paginationWrapper = document.createElement('div');
        paginationWrapper.className = 'flex justify-center items-center space-x-2';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.className = `p-2 rounded-md ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700'}`;
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadArticles();
            }
        });
        paginationWrapper.appendChild(prevBtn);
        
        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            if (totalPages > 7) {
                // Skip some pages if too many
                if (i !== 1 && i !== totalPages && (i < currentPage - 1 || i > currentPage + 1)) {
                    if (i === 2 || i === totalPages - 1) {
                        const ellipsis = document.createElement('span');
                        ellipsis.textContent = '...';
                        ellipsis.className = 'px-3 py-1 text-gray-400';
                        paginationWrapper.appendChild(ellipsis);
                    }
                    continue;
                }
            }
            
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = `px-3 py-1 rounded-md ${i === currentPage ? 'bg-yellow-500 text-gray-900' : 'text-gray-300 hover:bg-gray-700'}`;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                loadArticles();
            });
            paginationWrapper.appendChild(pageBtn);
        }
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.className = `p-2 rounded-md ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700'}`;
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                loadArticles();
            }
        });
        paginationWrapper.appendChild(nextBtn);
        
        paginationContainer.appendChild(paginationWrapper);
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 max-w-xs bg-secondary border ${type === 'success' ? 'border-green-500' : 'border-red-500'} p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <div class="${type === 'success' ? 'text-green-400' : 'text-red-400'} mr-3">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-xl"></i>
                </div>
                <div>
                    <p class="text-white">${message}</p>
                </div>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            
            setTimeout(() => {
                notification.remove();
            }, 300); // Match transition duration
        }, 5000);
    }
    
    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
});
