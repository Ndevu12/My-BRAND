const subscribeButton = document.querySelector('.edit_button');
const getEmailInput = document.querySelector('.get-email');

subscribeButton.addEventListener('click', function () {
    const emailInput = getEmailInput.value;

    // Validate email format using a regular expression
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (!emailRegex.test(emailInput)) {
        // Display an error message or handle invalid email format
        alert('Invalid email format. Please enter a valid email address.');
        return;
    }

    // Check if the email is not empty
    if (emailInput.trim() !== "") {
        // Retrieve existing subscribers from local storage or initialize an empty array
        const existingSubscribers = JSON.parse(localStorage.getItem('subscribers')) || [];

        // Add the new subscriber to the array
        existingSubscribers.push(emailInput);

        // Store the updated array back to local storage
        localStorage.setItem('subscribers', JSON.stringify(existingSubscribers));

        alert('Subscription successful!');

        // Clear the email input field
        getEmailInput.value = "Email";
    }
});
