/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c23a50',
          light: '#e05a70',
          dark: '#a22a40',
        },
        secondary: {
          DEFAULT: '#634e4e',
          light: '#836e6e',
          dark: '#433e3e',
        },
      },
      fontFamily: {
        corinthia: ['Corinthia', 'cursive'],
        pompiere: ['Pompiere', 'Arial', 'sans-serif'],
      },
      animation: {
        'bounce': 'bounce 1.5s infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-in': 'slideIn 1s ease-in-out',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
