/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#4a3728",
        gold: "#d4af37",
        "blue-premium": "#1d4ed8",
        "magenta-premium": "#db2777",
        "jute-light": "#f6f1ea",
        bg: "#fdfcf8",
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
