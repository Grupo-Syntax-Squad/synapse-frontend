/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fb8a31',
          dark: '#e47017',
          darker: '#ff7308',
          darkest: '#cc5800',
          light: '#ff9d52',
          lighter: '#df8943',
          lightest: '#f8ae76',
        }
      }
    },
  },
  plugins: [],
}