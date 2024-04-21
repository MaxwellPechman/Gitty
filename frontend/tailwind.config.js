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
    extend: {
      fontFamily: {
        'robot': ['Roboto'],
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
        'code-grey-700': '#17181F',
        'code-grey-800': '#09090F',
        'code-grey-950': '#06060a',
        'code-login-gray': '#121321',
      }
    },
  },
  plugins: [],
}

