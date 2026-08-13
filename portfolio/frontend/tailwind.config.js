/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",       // Slate Ink — base background
        steel: "#131C2E",     // Deep Steel — panels / cards
        steel2: "#1B2740",    // slightly lighter panel for hover states
        frost: "#E7ECF3",     // primary text
        mist: "#8291AA",      // muted text
        amber: "#F5A623",     // Signal Amber — primary accent
        teal: "#2DD4BF",      // Query Teal — secondary accent
        pgreen: "#4ADE80",    // Pipeline Green — metrics / success
        line: "#243252",      // hairline borders on dark
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(231,236,243,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(231,236,243,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        pulseLine: {
          "0%": { strokeDashoffset: 40 },
          "100%": { strokeDashoffset: 0 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
