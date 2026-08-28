import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Business Clean Palette: Pure Executive Charcoal (0% Blue), Forest Emerald, Rich Gold
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#059669', // Primary Business Green
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        slate: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          750: '#27272a',
          800: '#202023',
          850: '#18181b',
          900: '#121214', // Pure Charcoal Black
          950: '#09090b', // Deep True Obsidian
        },
        charcoal: {
          700: '#3f3f46',
          800: '#202023',
          850: '#18181b',
          900: '#121214',
          950: '#09090b',
        },
        navy: {
          // Re-mapped to pure charcoal to completely eliminate blue tints
          800: '#202023',
          900: '#121214',
          950: '#09090b',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
