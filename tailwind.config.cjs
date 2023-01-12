/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"]
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px"
      }
    },
  },
  plugins: [],
}