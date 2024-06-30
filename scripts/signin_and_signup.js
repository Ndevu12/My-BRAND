/////////////////////////////////////
////////// SIGN UP ////////
////////////////////////////////////

// Function to handle the signup process
const signUp = async () => {
    var email = document.querySelector('.email').value;
    var phoneNumber = document.querySelector('.getnumber').value;
    var fullName = document.querySelector('.fullname').value;
    var displayName = document.querySelector('.niky').value;
    var password = document.querySelector('.strongpass').value;
    var confirmPassword = document.querySelector('.confirmstrongpass').value;

    //   Validate password confirmation
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Validate inputs
    if (!email || !phoneNumber || !fullName || !displayName || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return;
    }

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(displayName)) {
        alert("Username can only contain letters and numbers");
        return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address");
        return;
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
        alert("Password must be at least 8 characters long and contain both letters and numbers");
        return;
    }

    var userData = {
        email: email,
        phoneNumber: phoneNumber,
        fullName: fullName,
        username: displayName,
        password: password
    };

    // create account in database
    try {
        const response = await fetch('https://my-brand-backend-apis.onrender.com/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const resError = await response.json();
            console.error(resError);
            alert(`Error. connection is not good\n: ${resError.message}`);
            return;
        }
        if (response.ok) {
            alert('Signup successful!');
            window.location.href = "../views/signin.html";
        }

    } catch (err) {
        console.log(err);
        alert("Something went wrong. Please try again later");
        return;
    }
    // Store admin data locally
    localStorage.setItem('adminAccount', JSON.stringify(userData));
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return emailRegex.test(email);
}

// Function to validate password strength
function isStrongPassword(password) {
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

// Assign onclick event to the signup button
document.getElementById('signUp').addEventListener('click', signUp);

/////////////////////////////////////////////
//////       LOG IN             /////
// /////////////////////////////////////////

// Function to handle the sign-in process
const signIn = async () => {
    var displayName = document.querySelector('.signInDisplayName').value;
    var password = document.querySelector('.signInPassword').value;

    if (!displayName || !password) { 
        alert("Please fill in all fields");
        return;
    }

try { 
    const response = await fetch('https://my-brand-backend-apis.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: displayName,
            password: password
        })
    });

    if (!response.ok) {
        const resError = await response.json();
        alert("Network connection was not ok. Try again\n", resError.message);
    }
    if (response.ok) {
        alert('Signin successful!');
        window.location.href = "../views/dashboard.html";
    }
} catch (err) {
    console.log(err);
    alert("Something went wrong. Please try again later");
    return;
}
}

// Assign onclick event to the signin button
document.getElementById('signIn').addEventListener('click', signIn);
