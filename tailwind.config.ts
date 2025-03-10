import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(button|drawer|input|modal|select|table|ripple|spinner|form|listbox|divider|popover|scroll-shadow|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#191919",
        darkGray: "#212427"
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem"
      }
    }
  },
  plugins: [heroui()],
};
export default config;
