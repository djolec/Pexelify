/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        card: "repeat(auto-fill, minmax(170px, 1fr))",
        cardBig: "repeat(auto-fill, minmax(280px, 1fr))",
      },
      keyframes: {
        jump1: {
          "0%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.2)" },
          "50%": { transform: "scale(1.4)" },
          "75%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        jump2: {
          "0%": { transform: "scale(1.2)" },
          "25%": { transform: "scale(1.4)" },
          "50%": { transform: "scale(1.2)" },
          "75%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.2)" },
        },
        jump3: {
          "0%": { transform: "scale(1.4)" },
          "25%": { transform: "scale(1.2)" },
          "50%": { transform: "scale(1)" },
          "75%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1.4)" },
        },
      },
      animation: {
        jump1: "jump1 0.8s infinite linear",
        jump2: "jump2 0.8s infinite linear",
        jump3: "jump3 0.8s infinite linear",
      },
    },
  },
  plugins: [],
};
