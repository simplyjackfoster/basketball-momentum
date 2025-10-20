import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,tsx}"];
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        foreground: "#F4F4F5",
        card: {
          DEFAULT: "#111114",
          foreground: "#F4F4F5"
        },
        primary: {
          DEFAULT: "#F97316",
          foreground: "#1C1917"
        },
        secondary: {
          DEFAULT: "#6366F1",
          foreground: "#E0E7FF"
        },
        muted: {
          DEFAULT: "#27272A",
          foreground: "#A1A1AA"
        },
        border: "#27272A",
        input: "#27272A",
        ring: "#F97316"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Chivo", "Inter", "sans-serif"]
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", "&:hover, &:focus");
    })
  ]
};

export default config;
