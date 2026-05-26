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

        // --- p3: prototype2 consumer hub ---
        "p3-ink": "#0B1220",
        "p3-ink-2": "#475569",
        "p3-ink-3": "#94A3B8",
        "p3-ink-4": "#CBD5E1",
        "p3-paper": "#FFFFFF",
        "p3-surface": "#F8FAFD",
        "p3-surface-2": "#F1F5F9",
        "p3-line": "#E2E8F0",
        "p3-line-2": "#EEF2F7",
        "p3-brand": "#2563EB",
        "p3-brand-deep": "#1D4ED8",
        "p3-brand-soft": "#DBEAFE",
        "p3-brand-tint": "#EFF6FF",
        "p3-accent-mint": "#14B8A6",
        "p3-accent-mint-soft": "#CCFBF1",
        "p3-accent-coral": "#FB7185",
        "p3-accent-coral-soft": "#FFE4E6",
        "p3-accent-amber": "#F59E0B",
        "p3-accent-amber-soft": "#FEF3C7",
        "p3-accent-violet": "#8B5CF6",
        "p3-accent-violet-soft": "#EDE9FE",
        "p3-accent-sky": "#0EA5E9",
        "p3-accent-sky-soft": "#E0F2FE",
        "p3-accent-orange": "#F97316",
        "p3-accent-orange-soft": "#FFEDD5",
        "p3-accent-rose": "#F43F5E",
        "p3-accent-rose-soft": "#FFE4E6",
        "p3-accent-emerald": "#10B981",
        "p3-accent-emerald-soft": "#D1FAE5",
        "p3-accent-indigo": "#6366F1",
        "p3-accent-indigo-soft": "#E0E7FF",
        "p3-success": "#16A34A",
        "p3-success-soft": "#DCFCE7",
        "p3-warn": "#D97706",
        "p3-warn-soft": "#FEF3C7",
        "p3-danger": "#DC2626",
        "p3-danger-soft": "#FEE2E2",
      },
      fontFamily: {
        // Existing
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        // p2
        "p2-sans": ["var(--font-p2-sans)", "system-ui", "sans-serif"],
        "p2-display": ["var(--font-p2-display)", "Georgia", "serif"],
        "p2-mono": ["var(--font-p2-mono)", "ui-monospace", "monospace"],
        // p3
        "p3-sans": ["var(--font-p3-sans)", "system-ui", "sans-serif"],
        "p3-mono": ["var(--font-p3-mono)", "ui-monospace", "monospace"],
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
        // p3
        "p3-xs": "6px",
        "p3-sm": "10px",
        "p3-md": "14px",
        "p3-lg": "18px",
        "p3-xl": "24px",
        "p3-2xl": "32px",
      },
      boxShadow: {
        "p2-sm": "0 1px 2px rgba(11,15,25,0.04), 0 0 0 1px rgba(11,15,25,0.06)",
        "p2-md":
          "0 4px 12px -2px rgba(11,15,25,0.06), 0 0 0 1px rgba(11,15,25,0.06)",
        "p2-lg":
          "0 12px 32px -8px rgba(11,15,25,0.12), 0 0 0 1px rgba(11,15,25,0.06)",
        "p2-focus": "0 0 0 3px rgba(59,130,246,0.25)",
        // p3 — softer, more lifted shadows for the consumer hub
        "p3-sm": "0 1px 2px rgba(11,18,32,0.05), 0 0 0 1px rgba(11,18,32,0.04)",
        "p3-md":
          "0 8px 24px -8px rgba(37,99,235,0.18), 0 0 0 1px rgba(11,18,32,0.04)",
        "p3-lg":
          "0 24px 48px -16px rgba(37,99,235,0.25), 0 0 0 1px rgba(11,18,32,0.04)",
        "p3-tile":
          "0 4px 12px -4px rgba(37,99,235,0.18), 0 0 0 1px rgba(11,18,32,0.04)",
      },
      letterSpacing: {
        "p2-tight": "-0.025em",
        "p2-tighter": "-0.04em",
        "p3-tight": "-0.02em",
      },
      maxWidth: {
        page: "1440px",
        "p2-page": "1280px",
        "p2-narrow": "960px",
        "p3-app": "640px",
        "p3-page": "1200px",
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
