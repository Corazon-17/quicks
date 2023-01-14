/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        latoBold: ["Lato Bold", "sans-serif"]
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
      },
      colors: {
        primary: {
          blue: "#2F80ED",
          zinc: "#4F4F4F",
          gray: "#828282",
          white: "#E0E0E0"
        },
        indicator: {
          orange: "#F8B76B",
          blue: "#8785FF",
          red: "#EB5757",
          yellow: "#F2C94C"
        },
      },
      screens: {
        fhd: "1920px"
      }
    },
  },
  plugins: [],
};
