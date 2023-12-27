/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#010851",
        "secondary": "#4D7E3E",
        "tartiary": "#707070",
        "pink": "#EE9AE5",
        "tertiary": "#31c48d",
      }
    },
  },
  plugins: [],
}

