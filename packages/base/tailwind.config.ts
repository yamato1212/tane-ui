import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ff4444',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f5f5f5',
          foreground: '#000000',
        },
        accent: {
          DEFAULT: '#f0f0f0',
        },
        input: '#e5e5e5',
        background: '#ffffff',
        ring: '#0070f3',
      },
    },
    keyframes: {
      shake: {
        '0%, 100%': { transform: 'translateX(0)' },
        '25%': { transform: 'translateX(-5px)' },
        '75%': { transform: 'translateX(5px)' },
      },
      slideIn: {
        '0%': { transform: 'translateY(10px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
    animation: {
      shake: 'shake 0.5s ease-in-out',
      slideIn: 'slideIn 0.3s ease-out',
      fadeIn: 'fadeIn 0.3s ease-out',
    },
  },
  plugins: [],
} satisfies Config;
