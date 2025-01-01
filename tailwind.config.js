/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./views/*.html",
    "./components/*.js",
    "./scripts/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#101426',
        'secondary': '#1a1e32',
        'accent': '#FFD43B',
        'dark-blue': '#1f2d74',
        'light-text': '#d8d3d5',
        'header-bg': 'rgb(17, 17, 33)',
        'footer-bg': '#0d0f16',
        'button-hover': 'rgb(224, 193, 16)',
        'card-border': '#9f84c2'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}