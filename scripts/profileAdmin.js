// Function to handle click event for editing names
document.getElementById('names').addEventListener('click', function() {
    // Get the element containing the name
    const nameElement = document.querySelector('.show_me h4');

    // Prompt the admin to enter the new name
    const newName = prompt('Enter the new name:');
    
    // Update the name if a new name is provided
    if (newName !== null && newName !== '') {
        nameElement.textContent = newName;
    }
});

// Function to handle click event for uploading a photo
document.getElementById('uploadPhotoInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const image = event.target.result;
            // Update the profile image
            document.getElementById('profileImage').src = image;
        };
        reader.readAsDataURL(file);
    }
});

// Function to handle click event for taking a photo
document.getElementById('Take_a_photo').addEventListener('click', function() {
    // Check if the browser supports accessing the camera
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Sorry, your browser does not support accessing the camera.');
        return;
    }

    // Constraints for accessing the camera
    const constraints = {
        video: true
    };

    // Access the camera
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            // Get the video element
            const videoElement = document.createElement('video');
            videoElement.autoplay = true;
            videoElement.id = 'videoOverlay'; // Add id to apply styles
            videoElement.srcObject = stream;

            // Create a canvas element to capture the photo
            const canvasElement = document.createElement('canvas');
            const context = canvasElement.getContext('2d');

            // Listen for click event to capture the photo
            videoElement.addEventListener('click', function() {
                // Set the canvas size to match the video stream
                canvasElement.width = videoElement.videoWidth;
                canvasElement.height = videoElement.videoHeight;

                // Draw the current frame from the video onto the canvas
                context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

                // Stop the video stream
                stream.getTracks().forEach(track => track.stop());

                // Convert the canvas content to a data URL
                const imageDataURL = canvasElement.toDataURL('image/png');

                // Update the profile image with the captured photo
                document.getElementById('profileImage').src = imageDataURL;

                // Remove video element
                videoElement.remove();
            });

            // Display the video stream
            document.body.appendChild(videoElement);
        })
        .catch(function(error) {
            console.error('Error accessing the camera: ', error);
            alert('Failed to access the camera. Please check your device settings.');
        });
});


// ================================================================================================================
//+++++++++++++++++++++++++++++++++== UPDATE ABOUT +++++++================================================================
//==================================================================================================================
//======================================++++++++++++++++++++++++++++=================================================


// Function to handle click event for editing the about section
document.getElementById('edit_about_id').addEventListener('click', function() {
    // Prompt the admin to choose what to update
    const updateChoice = prompt('What would you like to update? (Header/Body)');

    if (updateChoice !== null && updateChoice !== '') {
        // Convert the update choice to lowercase for case-insensitive comparison
        const choiceLowerCase = updateChoice.toLowerCase().trim();

        // Get the about section elements
        const aboutHeader = document.querySelector('.about_description h3');
        const aboutBody = document.querySelector('.about_description p');

        // Update the about section based on the admin's choice
        switch (choiceLowerCase) {
            case 'header':
                const newHeader = prompt('Enter the new header:');
                if (newHeader !== null && newHeader !== '') {
                    aboutHeader.textContent = newHeader;
                } else {
                    alert('Invalid header. Please enter a valid header.');
                }
                break;
            case 'body':
                const newBody = prompt('Enter the new body:');
                if (newBody !== null && newBody !== '') {
                    aboutBody.textContent = newBody;
                } else {
                    alert('Invalid body. Please enter a valid body.');
                }
                break;
            default:
                alert('Invalid choice. Please enter "Header" or "Body".');
        }
    }
    else {
        alert('Invalid choice.');
    }
});


// ================================================================================================================
//+++++++++++++++++++++++++++++++++== EMPLOYMENT STATUS +++++++================================================================
//==================================================================================================================
//======================================++++++++++++++++++++++++++++=================================================

// Function to handle changes in the employment status
document.getElementById('selectedvalue').addEventListener('change', function() {
    const selectedValue = this.value;
    console.log('Employment status changed to: ', selectedValue);
});

// Function to handle changes in the openness to work on part-time jobs
document.getElementById('open_to_work_part_time').addEventListener('change', function() {
    const selectedValue = this.value;
    console.log('Open to work on part-time jobs changed to: ', selectedValue);
});

// Function to handle changes in the openness to work on remote jobs
document.getElementById('open_to_work_remote').addEventListener('change', function() {
    const selectedValue = this.value;
    console.log('Open to work on remote jobs changed to: ', selectedValue);
});

// Function to handle changes in the openness to work on full-time jobs
document.getElementById('open_to_work_full_time').addEventListener('change', function() {
    const selectedValue = this.value;
    console.log('Open to work on full-time jobs changed to: ', selectedValue);
});


// ================================================================================================================
//+++++++++++++++++++++++++++++++++== UPDATE PROFESSIONAL +++++++================================================================
//==================================================================================================================
//======================================++++++++++++++++++++++++++++=================================================


// Function to handle click event for adding item to the list
document.querySelectorAll('.edit_button').forEach(button => {
    button.addEventListener('click', function() {
        const list = this.parentNode.querySelector('ul');
        const newItemHeader = prompt('Enter the header for the new item:');
        const newItemDesc = prompt('Enter the description for the new item:');
        
        if (newItemHeader !== null && newItemHeader !== '') {
            // Create a new list item
            const newItem = document.createElement('li');
            newItem.innerHTML = `<p>${newItemHeader}<button class="remove">--</button></p>`;
            
            // Add the new item to the list
            list.appendChild(newItem);

            // Update local storage
            updateLocalStorage(list.id, null, {header: newItemHeader, description: newItemDesc});
        }
    });
});

// Function to update local storage
function updateLocalStorage(listId, itemIndex, newItem) {
    let data = JSON.parse(localStorage.getItem(listId)) || [];
    
    if (itemIndex !== null && itemIndex !== undefined) {
        // Remove item from the data array
        data.splice(itemIndex, 1);
    } else if (newItem !== null && newItem !== undefined) {
        // Add new item to the data array
        data.push(newItem);
    }
    
    // Update local storage with the modified data array
    localStorage.setItem(listId, JSON.stringify(data));
}

// Function to handle click event for removing item from the list
document.querySelectorAll('.remove').forEach(button => {
    button.addEventListener('click', function() {
        // Confirm before removing the item
        const confirmRemove = confirm('Are you sure you want to remove this item?');
        
        if (confirmRemove) {
            const listItem = this.parentNode.parentNode;
            const list = listItem.parentNode;
            const itemIndex = Array.from(list.children).indexOf(listItem);
            
            // Remove item from the list
            list.removeChild(listItem);

            // Update local storage
            updateLocalStorage(list.id, itemIndex, null);
        }
    });
});
