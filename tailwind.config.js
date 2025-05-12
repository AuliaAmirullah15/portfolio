// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        titanium: {
          DEFAULT: "#eee2d4",
          600: "#ac906f",
        },
      },
    },
  },
  plugins: [],
};
