import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#631CA0",
        dark: "#080808",
        body: "#FFFFFF",
        border: "#B2B2B2",
        muted: "#7A7A7A",
        placeholder: "#B2B2B2",
        yellow: "#FFE066",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      borderRadius: {
        input: "8px",
        button: "50px",
        cta: "100px",
        card: "12px",
      },
      maxWidth: {
        page: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
