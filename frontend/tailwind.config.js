/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        panel: "#ffffff",
        soft: "#f5f5f4",
        line: "#e5e7eb",
        ink: "#111111",
        muted: "#6b7280",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.05)",
      },
      borderRadius: {
        xl2: "18px",
      },
    },
  },
  plugins: [],
};