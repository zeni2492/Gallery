module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'Primary': '#3E97FF',
        'Primary-Light': '#EEF6FF',
        'Primary-active': '#2884EF',
        'Danger': '#F1416C',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}