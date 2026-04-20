/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        panel: "#111827",
        soft: "#1f2937",
      },
    },
  },
  plugins: [],
}