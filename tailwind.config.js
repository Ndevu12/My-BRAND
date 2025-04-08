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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: theme('colors.gray.300'),
            h2: {
              color: theme('colors.white'),
              fontWeight: '700',
              fontSize: '1.5em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3',
            },
            h3: {
              color: theme('colors.white'),
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.6',
            },
            a: {
              color: theme('colors.yellow.400'),
              textDecoration: 'underline',
              fontWeight: '500',
            },
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            strong: {
              color: theme('colors.white'),
              fontWeight: '600',
            },
            img: {
              marginTop: '2em',
              marginBottom: '2em',
            },
            ul: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              listStyleType: 'disc',
              paddingLeft: '1.625em',
            },
            ol: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              listStyleType: 'decimal',
              paddingLeft: '1.625em',
            },
            li: {
              marginBottom: '0.5em',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: theme('colors.yellow.400'),
              borderLeftWidth: '4px',
              marginLeft: '0',
              paddingLeft: '1rem',
              color: theme('colors.gray.300'),
            },
            code: {
              color: theme('colors.white'),
              backgroundColor: theme('colors.gray.800'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.white'),
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.875rem',
            },
            hr: {
              borderColor: theme('colors.gray.700'),
              marginTop: '2rem',
              marginBottom: '2rem',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.yellow.400'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}