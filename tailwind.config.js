/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        card: "repeat(auto-fill, minmax(170px, 1fr))",
        cardBig: "repeat(auto-fill, minmax(240px, 1fr))",
      },
      colors: {},
    },
  },
  plugins: [],
};
