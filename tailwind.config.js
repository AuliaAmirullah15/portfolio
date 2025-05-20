// tailwind.config.js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gloock: ['"Gloock"', "serif"],
      },
      colors: {
        titanium: {
          DEFAULT: "#eee2d4",
          600: "#ac906f",
          700: "#866948",
        },
        ocean: {
          100: "#ccd3d9",
          200: "#a1afba",
          DEFAULT: "#6a8595",
          600: "2b4c5d",
          700: "#273f4b",
          900: "#1c282e",
        },
      },
    },
  },
  plugins: [],
};
