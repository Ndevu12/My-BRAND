/**
 * Messages Manager - Simplified
 * Handles essential messages functionality: viewing, filtering, and basic actions
 */

import { getAllMessages, getMessageById, deleteMessage, markMessageAsRead } from '../actions/messages/messageActions.js';
import { showNotification } from '../../utils/notificationUtils.js';

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const messagesTableBody = document.getElementById('messages-table-body');
    const paginationContainer = document.getElementById('pagination-container');
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const messagesTable = document.getElementById('messages-table');
    
    // Filter elements
    const statusFilter = document.getElementById('status-filter');
    const sortByFilter = document.getElementById('sort-by');
    const searchInput = document.getElementById('search-messages');
      // Action buttons
    const refreshBtn = document.getElementById('refresh-messages');
    
    // Modal elements
    const messageModal = document.getElementById('message-detail-modal');
    const closeModalBtn = document.getElementById('close-message-modal');
    const messageContent = document.getElementById('message-modal-content');    // State Management
    let currentFilters = {
        page: 1,
        limit: 10,
        status: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
        search: ''
    };
    
    let allMessages = [];
    let paginationData = null;
    let isLoading = false;
    let paginationInstance = null;
        // Initialize
    init();    function init() {
        initEventListeners();
        loadMessages();
    }
      function initEventListeners() {
        // Filter controls
        if (statusFilter) {
            statusFilter.addEventListener('change', function() {
                currentFilters.status = this.value;
                currentFilters.page = 1;
                loadMessages();
            });
        }
        
        if (sortByFilter) {
            sortByFilter.addEventListener('change', function() {
                const [sortBy, sortOrder] = this.value.split('_');
                currentFilters.sortBy = sortBy;
                currentFilters.sortOrder = sortOrder || 'desc';
                currentFilters.page = 1;
                loadMessages();
            });
        }
        
        // Search with debounce
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function() {
                currentFilters.search = this.value.toLowerCase();
                currentFilters.page = 1;
                loadMessages();
            }, 300));
        }
          // Action buttons
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                loadMessages();
            });
        }
        
        // Modal controls
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                closeMessageModal();
            });
        }
        
        if (messageModal) {
            messageModal.addEventListener('click', function(e) {
                if (e.target === messageModal) {
                    closeMessageModal();
                }
            });
        }
    }
      async function loadMessages() {
        if (isLoading) return;
        
        isLoading = true;
        showLoadingState();
        
        try {
            const response = await getAllMessages(currentFilters);
            
            // Handle both paginated response and legacy array response
            if (Array.isArray(response)) {
                // Legacy response - array of messages
                allMessages = response || [];
                paginationData = {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: allMessages.length,
                    pageSize: allMessages.length
                };
            } else {
                // New paginated response
                allMessages = response.data || response.messages || [];
                paginationData = response.pagination || {
                    currentPage: currentFilters.page,
                    totalPages: 1,
                    totalItems: allMessages.length,
                    pageSize: currentFilters.limit
                };
            }
            
            hideLoadingState();
            displayMessages();
            setupPagination();
            updateStats();
            
        } catch (error) {
            console.error('Error loading messages:', error);
            hideLoadingState();
            showErrorState(error.message || 'Failed to load messages');
            showNotification('Failed to load messages', 'error');
        } finally {
            isLoading = false;
        }
    }
      function displayMessages() {
        if (!messagesTableBody) return;
        
        messagesTableBody.innerHTML = '';
        
        if (allMessages.length === 0) {
            showEmptyState();
            if (messagesTable) messagesTable.classList.add('hidden');
            return;
        }
        
        if (messagesTable) messagesTable.classList.remove('hidden');
        hideEmptyState();
        
        allMessages.forEach(message => {
            const row = createMessageRow(message);
            messagesTableBody.appendChild(row);
        });
        
        // Add event listeners
        addMessageActionListeners();
    }      function createMessageRow(message) {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-800/30 transition-colors';
        row.dataset.messageId = message._id || message.id;
        
        const isRead = message.isRead;
        const formattedDate = new Date(message.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <i class="fas fa-user text-yellow-400"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium ${isRead ? 'text-gray-300' : 'text-white font-bold'}">${message.name || 'Anonymous'}</div>
                        <div class="text-sm text-gray-400">${message.email || 'No email'}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm ${isRead ? 'text-gray-300' : 'text-white font-medium'}">${message.subject || 'No Subject'}</div>
                <div class="text-sm text-gray-400 truncate max-w-xs">${message.message?.substring(0, 100) || ''}${message.message?.length > 100 ? '...' : ''}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-300">${formattedDate}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }">
                    ${isRead ? 'Read' : 'Unread'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-blue-400 hover:text-blue-300 mr-3 view-message-btn" data-id="${message._id || message.id}" title="View Message">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="text-yellow-400 hover:text-yellow-300 mr-3 toggle-status-btn" data-id="${message._id || message.id}" title="${isRead ? 'Mark as Unread' : 'Mark as Read'}">
                    <i class="fas ${isRead ? 'fa-envelope' : 'fa-envelope-open'}"></i>
                </button>
                <button class="text-red-400 hover:text-red-300 delete-message-btn" data-id="${message._id || message.id}" title="Delete Message">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        
        return row;
    }
      function addMessageActionListeners() {
        // View message buttons
        document.querySelectorAll('.view-message-btn').forEach(btn => {
            btn.addEventListener('click', async function() {
                const messageId = this.dataset.id;
                await viewMessage(messageId);
            });
        });
        
        // Toggle status buttons
        document.querySelectorAll('.toggle-status-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const messageId = this.dataset.id;
                toggleMessageStatus(messageId);
            });
        });
        
        // Delete message buttons
        document.querySelectorAll('.delete-message-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const messageId = this.dataset.id;
                const messageName = this.closest('tr').querySelector('.text-sm.font-medium').textContent;
                
                if (confirm(`Are you sure you want to delete the message from "${messageName}"? This action cannot be undone.`)) {
                    deleteMessageById(messageId);
                }
            });
        });
    }
    
    async function viewMessage(messageId) {
        try {
            const message = await getMessageById(messageId);
            
            if (messageContent) {
                messageContent.innerHTML = `
                    <div class="space-y-4">
                        <div class="flex items-center justify-between border-b border-gray-700 pb-4">
                            <div>
                                <h3 class="text-lg font-bold">${message.subject || 'No Subject'}</h3>
                                <p class="text-sm text-gray-400">From: ${message.name || 'Anonymous'} &lt;${message.email || 'No email'}&gt;</p>
                            </div>                            <div class="text-right">
                                <div class="text-sm text-gray-400">${new Date(message.createdAt).toLocaleString()}</div>
                                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    message.isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }">
                                    ${message.isRead ? 'Read' : 'Unread'}
                                </span>
                            </div>
                        </div>
                        
                        <div class="bg-gray-800/50 rounded-lg p-4">
                            <h4 class="text-sm font-medium text-gray-300 mb-2">Message Content:</h4>
                            <div class="text-gray-100 whitespace-pre-wrap">${message.message || 'No message content'}</div>
                        </div>
                        
                        <div class="flex gap-3 pt-4">
                            <button id="modal-reply-btn" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white transition-colors flex items-center">
                                <i class="fas fa-reply mr-2"></i>
                                Reply via Email
                            </button>                            <button id="modal-toggle-status-btn" class="bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded text-white transition-colors flex items-center" data-id="${messageId}">
                                <i class="fas ${message.isRead ? 'fa-envelope' : 'fa-envelope-open'} mr-2"></i>
                                Mark as ${message.isRead ? 'Unread' : 'Read'}
                            </button>
                            <button id="modal-delete-btn" class="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white transition-colors flex items-center" data-id="${messageId}">
                                <i class="fas fa-trash-alt mr-2"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                `;
                
                // Add modal button listeners
                const replyBtn = document.getElementById('modal-reply-btn');
                const toggleStatusBtn = document.getElementById('modal-toggle-status-btn');
                const deleteBtn = document.getElementById('modal-delete-btn');
                
                if (replyBtn) {
                    replyBtn.addEventListener('click', function() {
                        window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}&body=Hello ${message.name},\n\nThank you for your message.\n\nBest regards,\nNdevu`;
                    });
                }
                
                if (toggleStatusBtn) {
                    toggleStatusBtn.addEventListener('click', function() {
                        toggleMessageStatus(messageId);
                        closeMessageModal();
                    });
                }
                
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', function() {
                        if (confirm(`Are you sure you want to delete this message? This action cannot be undone.`)) {
                            deleteMessageById(messageId);
                            closeMessageModal();
                        }
                    });
                }
            }              if (messageModal) {
                messageModal.classList.remove('hidden');
                
                // Mark as read if it wasn't already
                if (!message.isRead) {
                    await toggleMessageStatus(messageId);
                }
            }
            
        } catch (error) {
            console.error('Error fetching message:', error);
            showNotification('Failed to load message details', 'error');
        }
    }
    
    function closeMessageModal() {
        if (messageModal) {
            messageModal.classList.add('hidden');
        }
    }    async function toggleMessageStatus(messageId) {
        try {
            // Find the message to determine current status
            const message = allMessages.find(m => (m._id || m.id) === messageId);
            if (!message) {
                showNotification('Message not found', 'error');
                return;
            }

            const newIsRead = !message.isRead;
            
            // If marking as read, call the API
            if (newIsRead) {
                await markMessageAsRead(messageId);
            }
            
            // Reload messages from server to get updated data
            await loadMessages();
            
            showNotification(`Message marked as ${newIsRead ? 'read' : 'unread'}`, 'success');
            
        } catch (error) {
            console.error('Error updating message status:', error);
            showNotification(`Failed to mark message as ${message?.isRead ? 'unread' : 'read'}`, 'error');
        }
    }
    
    async function deleteMessageById(messageId) {
        try {
            await deleteMessage(messageId);
            
            // Reload messages from server to get updated data
            await loadMessages();
            
            showNotification('Message deleted successfully', 'success');
            
        } catch (error) {
            console.error('Error deleting message:', error);
            showNotification(`Failed to delete message: ${error.message}`, 'error');
        }
    }    function setupPagination() {
        if (!paginationContainer || !paginationData) return;

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
                currentPage: paginationData.currentPage,
                totalPages: paginationData.totalPages,
                totalItems: paginationData.totalItems,
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
                
                const newPage = paginationData.page || paginationData.currentPage;
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
                    
                    // Load messages with new pagination settings
                    loadMessages();
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
            setupBasicPagination();
        }
    }
    
    function setupBasicPagination() {
        if (!paginationData || paginationData.totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        const { currentPage, totalPages, totalItems, pageSize } = paginationData;

        const paginationWrapper = document.createElement('div');
        paginationWrapper.className = 'flex items-center justify-between';

        // Info text
        const infoText = document.createElement('div');
        infoText.className = 'text-sm text-gray-400';
        const startItem = (currentPage - 1) * pageSize + 1;
        const endItem = Math.min(currentPage * pageSize, totalItems);
        infoText.textContent = `Showing ${startItem} to ${endItem} of ${totalItems} messages`;

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
                loadMessages();
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
                loadMessages();
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
                loadMessages();
            }
        });
        controls.appendChild(nextBtn);

        paginationWrapper.appendChild(infoText);
        paginationWrapper.appendChild(controls);
        paginationContainer.innerHTML = '';
        paginationContainer.appendChild(paginationWrapper);
    }    function updateStats() {
        const totalMessages = allMessages.length;
        const unreadMessages = allMessages.filter(m => !m.isRead).length;
        const today = new Date();
        const todayMessages = allMessages.filter(m => {
            const messageDate = new Date(m.createdAt);
            return messageDate.toDateString() === today.toDateString();
        }).length;
        
        // Update page summary
        const messagesSummary = document.getElementById('messagesSummary');
        if (messagesSummary) {
            messagesSummary.textContent = `${totalMessages} total messages • ${unreadMessages} unread • ${todayMessages} today`;
        }
    }
    
    function showLoadingState() {
        if (loadingState) loadingState.classList.remove('hidden');
        if (messagesTable) messagesTable.classList.add('hidden');
        if (emptyState) emptyState.classList.add('hidden');
    }
    
    function hideLoadingState() {
        if (loadingState) loadingState.classList.add('hidden');
    }
    
    function showEmptyState() {
        if (emptyState) emptyState.classList.remove('hidden');
        if (messagesTable) messagesTable.classList.add('hidden');
    }
    
    function hideEmptyState() {
        if (emptyState) emptyState.classList.add('hidden');
    }
    
    function showErrorState(message) {
        if (messagesTableBody) {
            messagesTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-6 py-10 text-center text-red-400">
                        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
                        <p class="text-lg font-medium">Error Loading Messages</p>
                        <p class="text-sm text-gray-400">${message}</p>
                        <button onclick="location.reload()" class="mt-4 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white transition-colors">
                            Reload Page
                        </button>
                    </td>
                </tr>
            `;
        }
        
        if (messagesTable) messagesTable.classList.remove('hidden');
        if (emptyState) emptyState.classList.add('hidden');
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
