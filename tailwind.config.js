/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nsans-light': ['Nsans Light'],
        'nsans-medium': ['Nsans Medium'],
        'nsans-bold': ['Nsans Bold'],
      }
    },
  },
  plugins: [scrollbarHide],
}
