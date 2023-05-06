/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffcb36', // yellow
        'dark-bg': '#1b2437',
        'dark-gray': '#25304c',
        'light-bg': '#f1f5f9',
        'dark-text': "#cbd5e1",
        'light-text': '#283344'
        
        
      },
      boxShadow: {
        'btn': '0 0 20px #ffcb36',
      }
    },
  },
  plugins: [],
}