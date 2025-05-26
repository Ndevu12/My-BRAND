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
    

    const buttons = document.querySelectorAll('button');
    const newArticleBtn = Array.from(buttons).find(btn => 
        btn.textContent.includes('New Article')
    );
    
    if (newArticleBtn) {
        newArticleBtn.addEventListener('click', function() {
            window.location.href = './new-article.html';
        });
    }
});

// Helper function to find elements by text content
function findElementByText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).find(el => el.textContent.includes(text));
}
