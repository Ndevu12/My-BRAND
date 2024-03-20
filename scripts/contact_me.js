document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('subId');
    const messageInput = document.querySelector('.message');
    const emailInput = document.querySelector('.get-email');

    submitButton.addEventListener('click', function () {
        const message = messageInput.value;
        const email = emailInput.value;

        // Validate email format using a regular expression
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        if (!emailRegex.test(email)) {
            // Display an error message or handle invalid email format
            alert('Invalid email format. Please enter a valid email address.');
            return;
        }

        // Check if the message and email are not empty
        if (message.trim() !== "" && email.trim() !== "") {
            // Retrieve existing data from local storage or initialize an empty array
            const existingData = JSON.parse(localStorage.getItem('contactData')) || [];

            // Add the new data to the array
            existingData.push({ message, email });

            // Store the updated array back to local storage
            localStorage.setItem('contactData', JSON.stringify(existingData));

            alert('Submission successful!');

            // Clear the input fields
            messageInput.value = "Write the message here";
            emailInput.value = "Email Address";
        }
    });
});
