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
    },
  },
  plugins: [],
};
