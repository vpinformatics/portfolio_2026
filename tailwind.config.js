/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plex-sans)', 'sans-serif'],
        display: ['var(--font-plex-sans)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      colors: {
        // LinkedIn-style corporate blue — the single accent, used sparingly.
        red: {
          50: '#EAF3FB',
          100: '#CFE4F6',
          200: '#9CC7EC',
          300: '#69AAE2',
          400: '#3B8DD3',
          500: '#0A66C2',
          600: '#0B5CAD',
          700: '#0B4E90',
        },
        danger: {
          50: '#FDEEEC',
          100: '#F9D4CE',
          200: '#F0A99C',
          500: '#C2452F',
          600: '#A83A27',
        },
      },
    },
  },
  plugins: [],
};
