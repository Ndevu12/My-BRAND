/**
 * Notification Utility
 * Provides a consistent way to display notifications across the application
 */

/**
 * Show a notification message
 * @param {string} message - The message to show
 * @param {string} type - The notification type ('success', 'error', 'info', 'warning')
 */
export function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-20 right-4 max-w-xs bg-secondary border 
    ${type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : type === 'warning' ? 'border-yellow-500' : 'border-blue-500'} 
    p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full`;
  
  const iconClass = type === 'success' ? 'fa-check-circle text-green-400' : 
                    type === 'error' ? 'fa-exclamation-circle text-red-400' : 
                    type === 'warning' ? 'fa-exclamation-triangle text-yellow-400' : 
                    'fa-info-circle text-blue-400';
  
  notification.innerHTML = `
    <div class="flex items-center">
      <div class="mr-3">
        <i class="fas ${iconClass} text-xl"></i>
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
