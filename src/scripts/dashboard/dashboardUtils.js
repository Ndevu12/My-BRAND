/**
 * Dashboard utility functions
 * Contains general purpose functions for the dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Display current date in a user-friendly format
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Other utility functions can be added here
    
    // For example, you could add quick actions to the "New Article" button
    const newArticleBtn = document.querySelector('button:contains("New Article")');
    if (newArticleBtn) {
        newArticleBtn.addEventListener('click', function() {
            window.location.href = './new-article.html';
        });
    }
});

// Helper function to find elements by text content
// Used for the "New Article" button selector above
Element.prototype.contains = function(text) {
    return this.textContent.includes(text);
};
