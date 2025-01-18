import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10BBB3",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          xl: "8rem",
          lg: "6rem",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
