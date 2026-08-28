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
        // 2026 Modern Business Palette: Refined Jade Emerald, Luxury Warm Gold, Ultra-Clean Charcoal
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',
          600: '#059669', // Modern Jade Green
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        slate: {
          50: '#fafaf9',
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
          900: '#121214', // Neutral Charcoal
          950: '#09090b', // Deep True Obsidian
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
      boxShadow: {
        'glow': '0 0 40px -10px rgba(16, 185, 129, 0.25)',
        'glow-lg': '0 0 60px -15px rgba(16, 185, 129, 0.35)',
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
};
export default config;
