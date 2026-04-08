/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        growth: {
          dark: '#1A3C2A',    // Deep forest green for text/icons
          primary: '#2D5A43', // Main brand green
          light: '#E2F1E7',   // Light mint background for cards
          bg: '#F8FAF9',      // Overall page background
          sidebar: '#F0F4F2', // Sidebar background
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
