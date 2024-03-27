// Function to validate and store admin account
function signUp() {
    var fullName = document.getElementById('fullName').value;
    var displayName = document.getElementById('displayName').value;
    var password = document.getElementById('password').value;

    // Validate inputs
    if (!fullName || !displayName || !password) {
        alert("Please fill in all fields");
        return;
    }

    // Check if admin account already exists
    if (localStorage.getItem('adminAccount')) {
        alert("Admin account already exists!");
    } else {
        // Store admin account in localStorage
        var adminAccount = {
            fullName: fullName,
            displayName: displayName,
            password: password
        };
        localStorage.setItem('adminAccount', JSON.stringify(adminAccount));
        alert("Admin account created successfully!");
    }
}

// Function to sign in with admin credentials
function signIn() {
    var displayName = document.getElementById('displayName').value;
    var password = document.getElementById('password').value;

    // Validate inputs
    if (!displayName || !password) {
        alert("Please fill in all fields");
        return;
    }

    // Check if admin account exists
    var adminAccount = localStorage.getItem('adminAccount');
    if (adminAccount) {
        adminAccount = JSON.parse(adminAccount);
        if (adminAccount.displayName === displayName && adminAccount.password === password) {
            alert("Sign in successful!");
        } else {
            alert("Invalid credentials. Please try again.");
        }
    } else {
        alert("Admin account not found. Please sign up.");
    }
}

// Function to handle sending reset code
function sendResetCode() {
    var phoneNumber = document.getElementById('forgotPhoneNumber').value;

    // Validate input
    if (!phoneNumber) {
        alert("Please enter a phone number");
        return;
    }

    // Implement your code to send reset code here
    alert("Reset code sent to " + phoneNumber);
}
