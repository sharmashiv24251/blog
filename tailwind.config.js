/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3F72AF", // Default background color
        secondary: "#D2E3C8", // Course list background
        tertiary: "#E2BBE9", // Batches background
        "heading-primary": "#FFFFFF", // Default heading color
        "heading-secondary": "#4F6F52", // Course list heading color
        "heading-tertiary": "#444B79", // Batches heading color
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"], // Set DM Sans as the default sans font
        inter: ["Inter", "sans-serif"], // Add Inter font to the
      },
    },
  },
  plugins: [],
};
