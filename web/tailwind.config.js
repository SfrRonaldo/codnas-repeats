module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat'],
        lato: ['Lato'],
        garamond: ['Garamond'],
      },
      colors: {
        primary: {
          light: '#d0646c',
          dark: '#e0646c',
        },
      },
      animation: {
        bounce200: 'bounce is infinite 200ms',
        bounce400: 'bounce is infinite 400ms',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
