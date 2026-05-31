/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBg: "#03001e",
        darkCard: "rgba(10, 5, 25, 0.4)",
        darkBorder: "rgba(255, 255, 255, 0.08)",
        lightBg: "#f8fafc",
        lightCard: "rgba(255, 255, 255, 0.75)",
        lightBorder: "rgba(15, 23, 42, 0.08)",
        neonPurple: "#a855f7",
        neonPink: "#ec4899",
        neonCyan: "#06b6d4",
        neonBlue: "#3b82f6",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        space: ["'Space Grotesk'", "sans-serif"],
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-medium": "float-medium 6s ease-in-out infinite",
        "float-fast": "float-fast 4s ease-in-out infinite",
        "spin-slow": "spin-slow 25s linear infinite",
        "spin-reverse": "spin-reverse 20s linear infinite",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(-3deg)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
