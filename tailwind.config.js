/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          index: "#633CFF",
          hover: "#BEADFF",
        },
        neutral: {
          "light-purple": "#EFEBFF",
          "dark-grey": "#333333",
          grey: "#737373",
          borders: "#D9D9D9",
          "light-grey": "#FAFAFA",
        },
        error: "#FF3939",
      },
      boxShadow: {
        "3xl": "0px 5px 15px rgba(0, 0, 0, 0.35)",
        "4xl": "0px 3px 8px rgba(0, 0, 0, 0.24)",
      },
      dropShadow: {
        "3xl": "1px 1px 10px #633CFF",
      },
    },
  },
  plugins: [],
};
