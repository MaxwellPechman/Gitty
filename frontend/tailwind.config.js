/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{html,js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/**/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/**/**/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/**/**/**/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '445px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1921px',
      '4xl': '2480px',
    },
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '42': '10.5rem',
        '54': '13.5rem',
        '275': '17.2rem',
        '360': '22.5rem',
        '570': '35rem'
      },
      colors: {
        'code-blue': '#1779BA',
        'code-red': '#CC4B37',
        'code-purple': '#CC3795',
        'code-yellow': '#FFAE00',
        'code-green': '#3ADB76',
        'code-grey-300': '#CACACA',
        'code-grey-500': '#8A8A8A',
        'code-grey-600': '#121321',
        'code-grey-700': '#17181F',
        'code-grey-800': '#09090F',
        'code-grey-950': '#06060A',
        'code-login-gray': '#121321',
        'code-border-gray': '#8C8C8C',
        'code-border-projects': '#121321',
      },
      fontSize: {
        'burger': '19px',
      }
    },
  },
  plugins: [],
}

