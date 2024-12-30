// Select file input and status message container
const fileInput = document.getElementById('article-image');
const statusMessage = document.getElementById('upload-status');

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    statusMessage.textContent = "Image(s) uploaded successfully!";
    statusMessage.classList.remove('error');
    statusMessage.classList.add('success');
  } else {
    statusMessage.textContent = "No image selected. Please upload an image.";
    statusMessage.classList.remove('success');
    statusMessage.classList.add('error');
  }
});
