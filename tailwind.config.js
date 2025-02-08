/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all your JS and JSX files are scanned for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          800: "#075985",
        },
      },
    },
  },
  plugins: [],
};
