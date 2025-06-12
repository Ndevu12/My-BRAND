/**
 * Category Manager Component
 * Centralized management of blog categories to prevent duplication and inconsistency
 */

import { getAllCategories } from '../scripts/actions/categories/categoryActions.js';

class CategoryManager {
    constructor() {
        // Initialize with empty categories - will be loaded from API
        this.categories = [];
        this._categoryMap = {};
        this._initialized = false;
        this._loading = false;
        
        // Define fallback categories
        this._fallbackCategories = [
            {
                id: 'programming',
                name: 'Programming',
                description: 'Articles about programming and software development',
                icon: 'fa-code',
                color: 'blue',
                bgClass: 'bg-blue-600/30',
                textClass: 'text-blue-400',
                hoverClass: 'hover:bg-blue-500/30'
            },
            {
                id: 'webdev',
                name: 'Web Development',
                description: 'Articles about web development',
                icon: 'fa-globe',
                color: 'green',
                bgClass: 'bg-green-600/30',
                textClass: 'text-green-400',
                hoverClass: 'hover:bg-green-500/30'
            },
            {
                id: 'design',
                name: 'UX/UI Design',
                description: 'Articles about design and user experience',
                icon: 'fa-palette',
                color: 'pink',
                bgClass: 'bg-pink-600/30',
                textClass: 'text-pink-400',
                hoverClass: 'hover:bg-pink-500/30'
            },
            {
                id: 'technology',
                name: 'Technology',
                description: 'Articles about technology trends',
                icon: 'fa-microchip',
                color: 'purple',
                bgClass: 'bg-purple-600/30',
                textClass: 'text-purple-400',
                hoverClass: 'hover:bg-purple-500/30'
            }
        ];
        
        // Initialize categories on construction
        this._initializeCategories();
    }

    /**
     * Initialize categories from API
     * @private
     */
    async _initializeCategories() {
        if (this._initialized || this._loading) return;
        
        this._loading = true;
        
        try {
            const apiCategories = await getAllCategories();

            if (Array.isArray(apiCategories) && apiCategories.length > 0) {
                // Transform API categories to match current format
                this.categories = apiCategories.map(category => this._enrichCategory(category));
            } else {
                // Use fallback categories
                this.categories = [...this._fallbackCategories];
            }
            
            this._updateCategoryMap();
            this._initialized = true;
        } catch (error) {
            console.warn('Failed to load categories from API', );
            // Use fallback categories when API fails
            this.categories = [...this._fallbackCategories];
            this._updateCategoryMap();
            this._initialized = true;
        } finally {
            this._loading = false;
        }
    }

    /**
     * Enrich API category with styling
     * @private
     */
    _enrichCategory(apiCategory) {
        const id = apiCategory._id || apiCategory.id;
        const name = apiCategory.name;
        const description = apiCategory.description || `Articles about ${name.toLowerCase()}`;
        
        // Generate styling based on name
        const style = this._generateCategoryStyle(name);
        
        return {
            id,
            name,
            description,
            ...style
        };
    }

    /**
     * Generate category styling dynamically
     * @private
     */
    _generateCategoryStyle(categoryName) {
        const normalizedName = categoryName.toLowerCase().trim();
        
        // Predefined styles for common categories
        const styleMap = {
            'programming': { icon: 'fa-code', color: 'blue' },
            'web development': { icon: 'fa-globe', color: 'green' },
            'webdev': { icon: 'fa-globe', color: 'green' },
            'design': { icon: 'fa-palette', color: 'pink' },
            'ux/ui design': { icon: 'fa-palette', color: 'pink' },
            'technology': { icon: 'fa-microchip', color: 'purple' },
            'career': { icon: 'fa-briefcase', color: 'orange' },
            'entrepreneurship': { icon: 'fa-rocket', color: 'yellow' },
            'business': { icon: 'fa-building', color: 'indigo' }
        };
        
        // Try exact match or partial match
        let style = styleMap[normalizedName];
        if (!style) {
            for (const [key, value] of Object.entries(styleMap)) {
                if (normalizedName.includes(key) || key.includes(normalizedName)) {
                    style = value;
                    break;
                }
            }
        }
        
        // Generate dynamic styling if no match found
        if (!style) {
            const colors = ['blue', 'green', 'purple', 'orange', 'pink', 'indigo', 'cyan', 'emerald', 'amber'];
            const icons = ['fa-tag', 'fa-bookmark', 'fa-star', 'fa-heart', 'fa-gem', 'fa-folder', 'fa-file'];
            
            // Use hash for consistent styling
            const hash = categoryName.split('').reduce((a, b) => {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
            }, 0);
            
            style = {
                icon: icons[Math.abs(hash) % icons.length],
                color: colors[Math.abs(hash) % colors.length]
            };
        }
        
        return {
            icon: style.icon,
            color: style.color,
            bgClass: `bg-${style.color}-600/30`,
            textClass: `text-${style.color}-400`,
            hoverClass: `hover:bg-${style.color}-500/30`
        };
    }

    /**
     * Update the category map for quick lookups
     * @private
     */
    _updateCategoryMap() {
        this._categoryMap = {};
        this.categories.forEach(category => {
            this._categoryMap[category.id] = category;
        });
    }

    /**
     * Get all categories
     * @returns {Array} All categories as an array
     */
    getAllCategories() {
        return this.categories;
    }

    /**
     * Get a category by ID
     * @param {string} id - Category ID
     * @returns {Object|null} Category object or null if not found
     */
    getCategory(id) {
        return this._categoryMap[id] || null;
    }

    /**
     * Get the display name for a category
     * @param {string} id - Category ID
     * @returns {string} Display name or the original ID if not found
     */
    getDisplayName(id) {
        return this._categoryMap[id] ? this._categoryMap[id].name : id;
    }    /**
     * Check if a category exists
     * @param {string} id - Category ID
     * @returns {boolean} Whether the category exists
     */
    categoryExists(id) {
        return !!this._categoryMap[id];
    }

    /**
     * Check if CategoryManager is ready/initialized
     * @returns {boolean} Whether the CategoryManager has finished loading
     */
    isReady() {
        return this._initialized;
    }

    /**
     * Check if CategoryManager is currently loading
     * @returns {boolean} Whether the CategoryManager is currently loading
     */
    isLoading() {
        return this._loading;
    }

    /**
     * Render category selection options
     * @param {string} containerId - Container element ID to render into
     * @param {string|null} selectedId - Currently selected category ID (optional)
     */
    renderCategoryOptions(containerId, selectedId = null) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        this.categories.forEach(category => {
            const isSelected = selectedId === category.id;
            
            const categoryEl = document.createElement('label');
            categoryEl.className = `flex items-center space-x-2 bg-primary/50 p-3 rounded-lg border border-gray-700 cursor-pointer hover:border-yellow-400/50 transition-colors ${isSelected ? 'border-yellow-400' : ''}`;
            
            categoryEl.innerHTML = `
                <input type="radio" name="category" value="${category.id}" 
                    class="text-yellow-500 focus:ring-yellow-500" ${isSelected ? 'checked' : ''}>
                <span class="flex items-center">
                    <i class="fas ${category.icon} mr-2 ${category.textClass}"></i>
                    ${category.name}
                </span>
            `;
            
            container.appendChild(categoryEl);
        });
    }

    /**
     * Render category filter tabs
     * @param {string} containerId - Container element ID to render into
     * @param {string|null} activeId - Currently active category ID (optional)
     * @param {Function} onClickCallback - Callback function when a tab is clicked
     */
    renderCategoryTabs(containerId, activeId = null, onClickCallback = null) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Add "All Topics" tab first
        const allTab = document.createElement('a');
        allTab.href = "#";
        allTab.className = `category-tab ${!activeId ? 'active' : ''}`;
        allTab.dataset.category = "";
        allTab.innerHTML = `
            <span class="block px-4 py-2 rounded-full ${!activeId ? 'bg-yellow-500 text-black' : 'bg-secondary border border-gray-700 hover:border-yellow-400 text-white'} font-medium transition-all duration-300">All Topics</span>
        `;
        
        if (onClickCallback) {
            allTab.addEventListener('click', (e) => {
                e.preventDefault();
                onClickCallback("");
            });
        }
        
        container.appendChild(allTab);
        
        // Add the rest of the category tabs
        this.categories.forEach(category => {
            const isActive = activeId === category.id;
            
            const tab = document.createElement('a');
            tab.href = "#";
            tab.className = `category-tab ${isActive ? 'active' : ''}`;
            tab.dataset.category = category.id;
            tab.innerHTML = `
                <span class="block px-4 py-2 rounded-full ${isActive ? 'bg-yellow-500 text-black' : 'bg-secondary border border-gray-700 hover:border-yellow-400 text-white'} font-medium transition-all duration-300">${category.name}</span>
            `;
            
            if (onClickCallback) {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    onClickCallback(category.id);
                });
            }
            
            container.appendChild(tab);
        });
    }

    /**
     * Create a category badge element
     * @param {string} categoryId - Category ID
     * @returns {HTMLElement} Category badge element
     */
    createCategoryBadge(categoryId) {
        const category = this.getCategory(categoryId);
        if (!category) return null;
        
        const badge = document.createElement('span');
        badge.className = `text-xs ${category.bgClass} ${category.textClass} px-2 py-1 rounded-full`;
        badge.innerHTML = `
            <i class="fas ${category.icon} mr-1"></i>
            ${category.name}
        `;
        
        return badge;
    }

    /**
     * Find a category by name (case-insensitive, partial match)
     * @param {string} name - Category name to search for
     * @returns {Object|null} Category object or null if not found
     */
    findCategoryByName(name) {
        if (!name) return null;
        
        const searchName = name.toLowerCase();
        return this.categories.find(cat => 
            cat.name.toLowerCase().includes(searchName) || 
            cat.id.toLowerCase().includes(searchName)
        ) || null;
    }
}

// Initialize and expose the category manager globally
window.categoryManager = new CategoryManager();

// Export for module use
export default window.categoryManager;
