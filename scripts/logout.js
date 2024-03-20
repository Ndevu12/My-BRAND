// Function to handle admin logout
function logout() {
    // Clear the admin account data from local storage
    localStorage.removeItem('adminAccount');
    
    alert('You have been logged out');
    // Redirect to the signin page
    window.location.href = "signin.html";
}

// Assign onclick event to the logout button
document.querySelector('.logout').addEventListener('click', logout);
