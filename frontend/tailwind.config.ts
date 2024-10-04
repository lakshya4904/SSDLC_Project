/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
     "./src/**/*.{html,js,ts,jsx,tsx,mdx,css}",
     "./src/pages/**/*.{js,ts,jsx,tsx,mdx,css}",
     "./src/components/**/*.{js,ts,jsx,tsx,mdx,css}",
     "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    light: {},
    dark: {},
    screens:{
      // '3xs': '320px',  // Very small mobile devices
      // '2xs': '375px',  // Small mobile devices
      // 'xs': '425px',   // Larger mobile devices
      'sm': '640px',   // Default Tailwind small screen
      'md': '768px',   // Default Tailwind medium screen
      'lg': '1024px',  // Default Tailwind large screen
      // 'xl': '1280px',  // Default Tailwind extra-large screen
      // '2xl': '1536px', // Default Tailwind 2x-large screen
      // '3xl': '1920px', // Very large desktops
    },
    extend: {
      screens:{
        '3xs': '320px',  // Very small mobile devices
        '2xs': '375px',  // Small mobile devices
        'xs': '425px',   // Larger mobile devices
        // 'sm': '640px',   // Default Tailwind small screen
        // 'md': '768px',   // Default Tailwind medium screen
        // 'lg': '1024px',  // Default Tailwind large screen
        'xl': '1280px',  // Default Tailwind extra-large screen
        '2xl': '1536px', // Default Tailwind 2x-large screen
        '3xl': '1920px', // Very large desktops
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
