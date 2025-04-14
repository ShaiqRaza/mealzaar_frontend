/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red1: '#ff0000',
        red2: '#cc0000',
        white1: '#ffffff',
      },
    },
  },
  plugins: [],
}