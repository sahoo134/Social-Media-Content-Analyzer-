/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,html,js}"],
   theme: {
    extend: {
      animation: {
        blink: 'blink 1.4s infinite steps(1)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
      transitionDelay: {
        300: '0.3s',
        600: '0.6s',
      },
    },
  },
  plugins: [],
}



