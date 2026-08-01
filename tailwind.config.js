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
        icons: {
          email: "#e4e4e4",
          github: "#1A1A1A",
          "frontend-mentor": "#FFFFFF",
          linkedin: "#2D68FF",
          youtube: "#EE3939",
          facebook: "#2442AC",
          devto: "#333333",
          codewars: "#8A1A50",
          "free-code-camp": "#302267",
          gitlab: "#EB4925",
          hashnode: "#0330D1",
          "stack-overflow": "#EC7100",
        },
        error: "#FF3939",
      },
      keyframes: {
        // The track holds three copies of the list, so one third is exactly
        // one copy: the row lands on an identical frame and repeats seamlessly
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333333%)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
      },
      boxShadow: {
        // Used by the inputs and the dropdown on hover/focus, kept subtle
        "3xl": "0px 2px 10px rgba(0, 0, 0, 0.12)",
        "4xl": "0px 3px 8px rgba(0, 0, 0, 0.24)",
      },
    },
  },
  plugins: [],
};
