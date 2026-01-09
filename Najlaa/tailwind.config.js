/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': '#E0F2FE',
        'soft-pink': '#FCE7F3',
      },
      fontFamily: {
        'cute': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
