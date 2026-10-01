import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090D",
        surface: "#12141D",
        "surface-light": "#1B1E2E",
        "solana-purple": "#9945FF",
        "solana-cyan": "#00F5D4",
        "solana-green": "#14F195",
        "text-muted": "#94A3B8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "solana-gradient": "linear-gradient(135deg, #9945FF 0%, #00F5D4 50%, #14F195 100%)",
        "radial-glow": "radial-gradient(circle at 50% 50%, rgba(153, 69, 255, 0.15) 0%, rgba(0, 245, 212, 0.05) 50%, transparent 80%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(30px)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
