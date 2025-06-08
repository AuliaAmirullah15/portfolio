// tailwind.config.js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gloock: ['"Gloock"', "serif"],
        geist: ['"Geist Mono"', "monospace"],
        orbitron: ['"Orbitron"', "mono"],
        smooch: ['"Smooch Sans"', "sans-serif"],
        funnel: ['"Funnel Sans"', "sans-serif"],
        golos: ['"Golos Text"', "sans-serif"],
        instrument: ['"Instrument Serif"', "sans-serif"],
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
        cosmic: {
          DEFAULT: "#55a2ff",
          600: "#7f5af0",
        },
      },
    },
  },
  plugins: [],
};
