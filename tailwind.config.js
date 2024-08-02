/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        '0.8': '0.8 0.8 0%', // Custom flex value: flex-grow: 0.8, flex-shrink: 0.8, flex-basis: 0%
      },
    },
  },
  plugins: [],
}