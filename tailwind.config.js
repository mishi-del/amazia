/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '360px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        amazia: {
          teal: '#1A5C52',
          'teal-light': '#2a7a6e',
          gold: '#C9963A',
          'gold-light': '#E8C88A',
          ivory: '#FAF5EE',
          cream: '#F5EDD8',
          espresso: '#1A0F08',
          ink: '#4A3020',
          'ink-light': '#7A5C3E',
          sand: '#D4B896',
          sage: '#2D5A27',
          red: '#8B1A1A',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        headline: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '720px',
      },
      spacing: {
        section: '80px',
        'section-lg': '120px',
      },
      borderRadius: {
        card: '12px',
        button: '6px',
        pill: '999px',
      },
    },
  },
  plugins: [],
}
