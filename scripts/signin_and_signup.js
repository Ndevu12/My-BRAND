// Function to handle the signup process
function signUp() {
    var email = document.querySelector('.email').value;
    var phoneNumber = document.querySelector('.getnumber').value;
    var fullName = document.querySelector('.fullname').value;
    var displayName = document.querySelector('.niky').value;
    var password = document.querySelector('.strongpass').value;
    var confirmPassword = document.querySelector('.confirmstrongpass').value;

    // Check if admin account already exists
    if (localStorage.getItem('adminAccount')) {
        alert("Admin account already exists. You can explore the website now.");
        return;
    }

    // Validate inputs
    if (!email || !phoneNumber || !fullName || !displayName || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address");
        return;
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
        alert("Password must be at least 6 characters long and contain both letters and numbers");
        return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Store admin data locally
    var userData = {
        email: email,
        phoneNumber: phoneNumber,
        fullName: fullName,
        displayName: displayName,
        password: password
    };

    localStorage.setItem('adminAccount', JSON.stringify(userData));

    // After signup, redirect to the dashboard or update UI
    // For now, just show an alert
    alert("Signup successful!");
    window.location.href = "signin.html";
}

// Function to validate email format
function isValidEmail(email) {
    // Simple email format validation
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return emailRegex.test(email);
}

// Function to validate password strength
function isStrongPassword(password) {
    // Password must be at least 6 characters long and contain both letters and numbers
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
}

// Assign onclick event to the signup button
document.getElementById('signUp').addEventListener('click', signUp);

// ////////////////////////////////////////
// /////////////////////////////////////////

// Function to handle the sign-in process
function signIn() {
    var displayName = document.querySelector('.signInDisplayName').value;
    var password = document.querySelector('.signInPassword').value;

    // Retrieve admin data from local storage
    var adminData = localStorage.getItem('adminAccount');

    if (!adminData) {
        alert("No admin account found. Please sign up first.");
        return;
    }

    adminData = JSON.parse(adminData);

    // Validate signin credentials
    if (adminData.displayName === displayName && adminData.password === password) {
        console.log("Signin successful!");
        console.log("Display Name:", displayName);

        displayName.value = "";
        password.value = "";

        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Assign onclick event to the signin button
document.getElementById('signIn').addEventListener('click', signIn);
