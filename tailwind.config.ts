import type { Config } from "tailwindcss";

export default {
 content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
  extend: {
   colors: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    primary: "var(--ecommerce-orange)",
    secondary: "var(--very-dark-blue)",
   },
  },
 },
 plugins: [],
} satisfies Config;
