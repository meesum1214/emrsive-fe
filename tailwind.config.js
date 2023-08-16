/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./layout/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3844FC",
        secondary: "#FF7826",
        tertiary: "#FFC627",
      },
    },
  },
  plugins: [],
}

