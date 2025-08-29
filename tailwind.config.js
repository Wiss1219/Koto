/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7A0C10',
          950: '#450a0a',
        },
        leather: {
          800: '#1a1a1a',
          900: '#0D0D0D',
        },
        gold: {
          400: '#facc15',
          500: '#D4AF37',
          600: '#ca8a04',
        },
        beige: {
          100: '#F5F5DC',
          200: '#E6CFAF',
          300: '#ddd6bd',
        }
      },
      fontFamily: {
        'amiri': ['Amiri', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'leather': '0 4px 6px -1px rgba(13, 13, 13, 0.1), 0 2px 4px -1px rgba(13, 13, 13, 0.06)',
        'gold': '0 4px 6px -1px rgba(212, 175, 55, 0.1), 0 2px 4px -1px rgba(212, 175, 55, 0.06)',
      }
    },
  },
  plugins: [],
};
