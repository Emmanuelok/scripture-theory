import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The ink palette is driven by CSS variables defined in globals.css.
        // In dark mode the scale is flipped so existing classes (bg-ink-50,
        // text-ink-900, border-ink-200, etc.) automatically get the right
        // value without code changes.
        ink: {
          50: "rgb(var(--ink-50) / <alpha-value>)",
          100: "rgb(var(--ink-100) / <alpha-value>)",
          200: "rgb(var(--ink-200) / <alpha-value>)",
          300: "rgb(var(--ink-300) / <alpha-value>)",
          400: "rgb(var(--ink-400) / <alpha-value>)",
          500: "rgb(var(--ink-500) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
        },
        // Card surfaces — light theme: pure white. Dark theme: lifted near-black.
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          subtle: "rgb(var(--card-subtle) / <alpha-value>)",
        },
        flame: {
          50: "rgb(var(--flame-50) / <alpha-value>)",
          100: "rgb(var(--flame-100) / <alpha-value>)",
          300: "rgb(var(--flame-300) / <alpha-value>)",
          500: "rgb(var(--flame-500) / <alpha-value>)",
          600: "rgb(var(--flame-600) / <alpha-value>)",
          700: "rgb(var(--flame-700) / <alpha-value>)",
        },
      },
      fontFamily: {
        serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
