/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      heading: ['"Yatra One", system-ui'],
      marbtn: ['"Gotu", sans-serif'],
      chalk: ['"Fredericka the Great", serif'],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["autumn"],
  },
};
