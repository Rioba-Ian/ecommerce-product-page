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
    foreground: "hsl(var(--foreground))",
    primary: "hsl(var(--ecommerce-orange))",
    secondary: "hsl(var(--ecommerce-pale-orange))",
   },
  },
 },
 plugins: [],
} satisfies Config;
