import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbf6ea",
        pearl: "#fffaf1",
        linen: "#eadfc8",
        sage: "#8fa88a",
        moss: "#3f5943",
        forest: "#1f3328",
        clay: "#a77d60",
        gold: "#d8b86a",
        cacao: "#35251c"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        premium: "0 28px 90px rgba(63, 89, 67, 0.18)",
        glow: "0 0 60px rgba(216, 184, 106, 0.24)"
      },
      backgroundImage: {
        "gold-sage": "linear-gradient(135deg, #d8b86a 0%, #e9d89d 35%, #8fa88a 100%)",
        "soft-radial": "radial-gradient(circle at 25% 20%, rgba(216,184,106,0.35), transparent 32%), radial-gradient(circle at 80% 10%, rgba(143,168,138,0.28), transparent 30%), radial-gradient(circle at 70% 78%, rgba(167,125,96,0.22), transparent 34%)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.38", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" }
        }
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
