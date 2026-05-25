import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Existing Figma prototype (do not change) ---
        primary: "#631CA0",
        dark: "#080808",
        body: "#FFFFFF",
        border: "#B2B2B2",
        muted: "#7A7A7A",
        placeholder: "#B2B2B2",
        yellow: "#FFE066",

        // --- p2: WHV World business-plan prototype ---
        "p2-ink": "#0B0F19",
        "p2-ink-2": "#475569",
        "p2-ink-3": "#94A3B8",
        "p2-ink-4": "#CBD5E1",
        "p2-paper": "#FAFAF7",
        "p2-surface": "#FFFFFF",
        "p2-surface-2": "#F8FAFC",
        "p2-line": "#E5E7EB",
        "p2-line-2": "#EEF0F3",
        "p2-brand": "#1E2F5C",
        "p2-brand-2": "#3B82F6",
        "p2-brand-deep": "#0F1B3D",
        "p2-accent": "#06B6D4",
        "p2-success": "#15803D",
        "p2-success-soft": "#DCFCE7",
        "p2-warn": "#D97706",
        "p2-warn-soft": "#FEF3C7",
        "p2-danger": "#B91C1C",
        "p2-danger-soft": "#FEE2E2",
        "p2-info": "#6366F1",
        "p2-info-soft": "#E0E7FF",
        "p2-cream": "#F5F1E8",
        "p2-slate-tint": "#F1F5F9",
      },
      fontFamily: {
        // Existing
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        // p2
        "p2-sans": ["var(--font-p2-sans)", "system-ui", "sans-serif"],
        "p2-display": ["var(--font-p2-display)", "Georgia", "serif"],
        "p2-mono": ["var(--font-p2-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        // Existing
        input: "8px",
        button: "50px",
        cta: "100px",
        card: "12px",
        // p2
        "p2-xs": "4px",
        "p2-sm": "6px",
        "p2-md": "8px",
        "p2-lg": "12px",
        "p2-xl": "16px",
        "p2-2xl": "20px",
      },
      maxWidth: {
        page: "1440px",
        "p2-page": "1280px",
        "p2-narrow": "960px",
      },
      boxShadow: {
        "p2-sm": "0 1px 2px rgba(11,15,25,0.04), 0 0 0 1px rgba(11,15,25,0.06)",
        "p2-md":
          "0 4px 12px -2px rgba(11,15,25,0.06), 0 0 0 1px rgba(11,15,25,0.06)",
        "p2-lg":
          "0 12px 32px -8px rgba(11,15,25,0.12), 0 0 0 1px rgba(11,15,25,0.06)",
        "p2-focus": "0 0 0 3px rgba(59,130,246,0.25)",
      },
      letterSpacing: {
        "p2-tight": "-0.025em",
        "p2-tighter": "-0.04em",
      },
      keyframes: {
        "p2-pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(217,119,6,0.4)" },
          "100%": { boxShadow: "0 0 0 10px rgba(217,119,6,0)" },
        },
        "p2-fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "p2-pulse-ring": "p2-pulse-ring 1.6s ease-out infinite",
        "p2-fade-in": "p2-fade-in 200ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
