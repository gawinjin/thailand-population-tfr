/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        muted: "#65758b",
        paper: "#f7f5ef",
        panel: "#ffffff",
        birth: "#2f6f73",
        death: "#8a5a44",
        decline: "#b44745",
        estimate: "#6f6b9f"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
