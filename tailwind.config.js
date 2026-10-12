/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#140919',
        plum: '#24102B',
        burgundy: {
          DEFAULT: '#6E1433',
          deep: '#450C22',
          bright: '#9A2148',
        },
        blush: '#F4C9CF',
        rose: '#E39AAA',
        champagne: '#E9D2A4',
        gold: '#C8A25A',
        ivory: '#FBF5EC',
        ink: '#3A1522',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        hand: ['Caveat', '"Segoe Script"', 'cursive'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.08)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.06)' },
          '70%': { transform: 'scale(1)' },
        },
        halo: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.12)' },
        },
        nudge: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        bob: 'bob 6s ease-in-out infinite',
        heartbeat: 'heartbeat 2.4s ease-in-out infinite',
        halo: 'halo 5s ease-in-out infinite',
        nudge: 'nudge 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
