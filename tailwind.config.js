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
        primary: "#633CFF",
        neutral: {
          "very-soft-blue": "#EFEBFF",
          black: "#333333",
          gray: "#737373",
          "light-gray": "#D9D9D9",
          "white-smoke": "#FAFAFA",
        },
        error: "#FF3939",
      },
    },
  },
  plugins: [],
};
