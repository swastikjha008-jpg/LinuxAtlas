import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050708",
        abyss: "#0a0f14",
        navy: "#0d151c",
        panel: "rgba(13, 21, 28, 0.55)",
        cyan: {
          DEFAULT: "#5EEAD4",
          bright: "#7DF9E1",
          dim: "#2DD4BF",
        },
        electric: "#4CC9F0",
        ember: "#FF8A4C",
        emberdim: "#C9622E",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-fade": "linear-gradient(to bottom, transparent, rgba(5,7,8,0.9))",
      },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
        rise: { "0%": { opacity: "0", transform: "translateY(14px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        glowpulse: { "0%,100%": { opacity: "0.5" }, "50%": { opacity: "1" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scan: "scan 6s linear infinite",
        rise: "rise 0.7s cubic-bezier(0.16,1,0.3,1) both",
        glowpulse: "glowpulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
