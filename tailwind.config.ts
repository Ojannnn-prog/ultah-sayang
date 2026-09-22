import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        crimson: "#8B0000",
        burgundy: "#6B0012",
        rose: "#C82333",
        paper: "#FFFDF5",
        gold: "#D4AF37",
      },
    },
  },
  plugins: [],
};

export default config;
