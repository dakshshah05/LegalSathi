/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0D0F1A',
        'bg-secondary': '#13152A',
        'accent-violet': '#7C3AED',
        'accent-rose': '#F472B6',
        'text-primary': '#F9F5FF',
        'text-secondary': '#C4B5FD',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'violet-glow': '0 0 20px rgba(124, 58, 237, 0.4)',
        'rose-glow': '0 0 20px rgba(244, 114, 182, 0.4)',
      }
    },
  },
  plugins: [],
}
