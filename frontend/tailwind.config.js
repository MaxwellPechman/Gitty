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
        '570': '35rem'
      },
      textColor: {
        'code-blue': '#1779BA',
        'code-red': '#CC4B37',
        'code-purple': '#CC3795',
        'code-yellow': '#FFAE00',
        'code-green': '#3ADB76',
      }
    },
  },
  plugins: [],
}

