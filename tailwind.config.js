  /** @type {import('tailwindcss').Config} */
  import defaultTheme from "tailwindcss/defaultTheme";

  module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mobile': { 'raw': '(max-device-width: 550px)' },
      ...defaultTheme.screens,
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}