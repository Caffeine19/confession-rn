/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cookie: {
          50: "#fff8eb",
          100: "#ffebc6",
          200: "#fecf75",
          300: "#feba4b",
          400: "#fda122",
          500: "#f77d09",
          600: "#db5804",
          700: "#b63a07",
          800: "#932d0d",
          900: "#79260e",
          950: "#461002",
        },
        guilty: {
          50: "#fff3ed",
          100: "#ffe4d4",
          200: "#ffc5a8",
          300: "#ff9c71",
          400: "#ff7245",
          500: "#fe4111",
          600: "#ef2707",
          700: "#c61708",
          800: "#9d150f",
          900: "#7e1510",
          950: "#440606",
        },
        yokatta: {
          50: "#f1f6fd",
          100: "#deeafb",
          200: "#c5dcf8",
          300: "#9dc6f3",
          400: "#6fa8eb",
          500: "#4d87e4",
          600: "#386bd8",
          700: "#2f57c6",
          800: "#2c48a1",
          900: "#283f80",
          950: "#1d284e",
        },
      },
    },
  },
  plugins: [],
};
