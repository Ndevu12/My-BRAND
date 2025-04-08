# My-BRAND Portfolio Project

A personal portfolio and blog website built with HTML, Tailwind CSS, and JavaScript.

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- Node.js (v14 or newer)
- npm (comes with Node.js)

### Setup Steps

1. Clone the repository or download the project files

2. Navigate to the project directory:
   ```
   cd My-BRAND
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Install the Tailwind CSS typography plugin:
   ```
   npm install --save-dev @tailwindcss/typography
   ```
   
   Alternatively, you can run the provided installation script:
   ```
   node scripts/install-dependencies.js
   ```

5. Build the CSS:
   ```
   npm run build
   ```

6. For development with auto-refresh:
   ```
   npm run dev
   ```

## Project Structure

- `index.html` - Main homepage
- `views/` - HTML pages for different sections
- `components/` - Reusable JavaScript components
- `scripts/` - JavaScript files for functionality
- `styles/` - CSS including Tailwind configuration
- `images/` - Image assets

## Using the Reusable Components

### Header Component
The header is automatically inserted at the beginning of each page through the header.js script.

### Footer Component
The footer is automatically inserted at the end of each page through the footer.js script.

### Pagination Component
To use the pagination component:

```javascript
insertPagination('#container-selector', {
  currentPage: 1,
  totalPages: 8,
  onPageChange: function(page) {
    // Your page change handling code here
  }
});
```

## Development Notes

- Tailwind CSS is used for styling
- JavaScript modules are organized by functionality
- The site is responsive and works on mobile, tablet, and desktop devices

## Contact

Do you have questions or want to connect with me? Reach out on my social media platforms or through the [contact form](#fragment) on my portfolio.

- LinkedIn: [Ndevu-LinkedIn](www.linkedin.com/in/jean-paul-elisa)
- Twitter: [@Ndevu-Twitter](https://twitter.com)
- Email: < niyokwizerwajeanpaulelisa@gmail.com>

Feel free to explore my code and creations. Let's build something amazing together!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

 <!-- git push origin fixingDeploymentErros
 
 git credential-manager erase -->
