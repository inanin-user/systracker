/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'dark-orange': '#9B3922',
        'navy': '#334756',
        'dark-blue': '#001C30',
        'background-blue': '#082032'
      },
      backgroundImage: {
        'login-background': "url('/images/pxfuel.jpg')",
      }
    },
  },
  plugins: [],
}
