/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "banner-1": "url('./assets/images/photo-banner-1.jpg')",
        "banner-2": "url('./assets/images/photo-banner-2.jpg')",
        "banner-3": "url('./assets/images/photo-banner-3.jpg')",
        "banner-4": "url('./assets/images/photo-banner-4.jpg')",
        "banner-5": "url('./assets/images/photo-banner-5.jpg')",
        "banner-6": "url('./assets/images/photo-banner-6.jpg')",
        "coll-banner1": "url('./assets/images/collection-banner-1.jpg')",
        "coll-banner3": "url('./assets/images/collection-banner-3.jpg')",
        "coll-banner4": "url('./assets/images/collection-banner-4.jpg')",
      },
      gridTemplateColumns: {
        card: "repeat(auto-fill, minmax(170px, 1fr))",
        cardBig: "repeat(auto-fill, minmax(220px, 1fr))",
      },
      colors: {},
    },
  },
  plugins: [],
};
