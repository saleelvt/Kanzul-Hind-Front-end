/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "xs":"275px"
      }
    },
    extend: {
      colors: {
        customGreen: '#5c9478',
      },
    },
  },
  plugins: [],
};
