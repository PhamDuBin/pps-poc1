/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic color names for better maintainability
        'label': '#80bad7',      // Blue label backgrounds
        'input': '#ebcec0',      // Beige input backgrounds
        'bg-alt': '#d8dadc',     // Alternative background
        'bg-gray': '#EEEEEE',    // Gray background
        'button-primary': '#4770a5', // Primary button color
        'border-default': '#000000', // Default border color
      },
    },
  },
  plugins: [],
};
