/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
     "./src/**/*.{html,js,ts,jsx,tsx,mdx,css}",
    //  "./src/pages/**/*.{js,ts,jsx,tsx,mdx,css}",
    //  "./src/components/**/*.{js,ts,jsx,tsx,mdx,css}",
    //  "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    light: {},
    dark: {},
    // colors:{
    //   neutral: {
    //     100: '#FFFFFF',
    //     200: '#F9FAFB',
    //     300: '#E7EAEE',
    //     400: '#BECAD7',
    //     500: '#8096B0',
    //     600: '#62778F',
    //     700: '#1E3D60',
    //     800: '#0F437F',
    //   },
    // },
    screens:{
      // '3xs': '320px',  // Very small mobile devices
      // '2xs': '375px',  // Small mobile devices
      xs: '425px',   // Larger mobile devices
      sm: '640px',   // Default Tailwind small screen
      md: '768px',   // Default Tailwind medium screen
      lg: '1024px',  // Default Tailwind large screen
      xl: '1440px',  // Default Tailwind extra-large screen
      // '2xl': '1536px', // Default Tailwind 2x-large screen
      // '3xl': '1920px', // Very large desktops
    },
    fontSize: {
      xs: ['14px', '1.5em'],
      sm: ['15px', '1.6em'],
      base: ['16px', '1.44em'],
      lg: ['18px', '1.667em'],
      xl: ['20px', '1.5em'],
      xxl: ['22px', '1.5em'],
      '2xl': ['24px', '1.583em'],
      '3xl': ['26px', '1.289em'],
      '4xl': ['32px', '1.289em'],
      '5xl': ['36px', '1.3em'],
      '6xl': ['38px', '1.289em'],
      '7xl': ['42px', '1.3em'],
      '8xl': ['52px', '1.3em'],
      '9xl': ['60px', '1.3em'],
    },
    extend: {
      spacing: {
        container: `max(
          1rem,
          calc((100vw - calc(1280px - 1rem * 2)) / 2)
        )`,
        'md-container': `max(
          1rem,
          calc((100vw - calc(1024px - 1rem * 2)) / 2)
        )`,
        'sm-container': `max(
          1rem,
          calc((100vw - calc(550px - 1rem * 2)) / 2)
        )`,
      },
      aspectRatio: {
        image: '3 / 4',
        'h-image': '4 / 3',
        'blog-image': '16/9',
        'novel':'2/3',
      },
      screens:{
        // '3xs': '320px',  // Very small mobile devices
        // '2xs': '375px',  // Small mobile devices
        // 'xs': '425px',   // Larger mobile devices
        // 'sm': '640px',   // Default Tailwind small screen
        // 'md': '768px',   // Default Tailwind medium screen
        // 'lg': '1024px',  // Default Tailwind large screen
        // 'xl': '1280px',  // Default Tailwind extra-large screen
        // '2xl': '1536px', // Default Tailwind 2x-large screen
        // '3xl': '1920px', // Very large desktops
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/line-clamp'),
  ],
};
export default config;
