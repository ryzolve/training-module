/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        black: '#000',
        coral: '#FF774C',
        navy: '#0D5992',
        dimgray: '#595959',
        darkslategray: '#373737',
        darkslateblue: '#21266a',
        lightgray: 'rgba(209, 209, 209, 0.8)',
      },
      spacing: {},
      fontFamily: {
        montserrat: 'Montserrat',
        montaga: 'Montaga',
      },
      borderRadius: {
        xl: '20px',
        '21xl': '40px',
      },
    },
    fontSize: {
      sm: '14px',
      '6xl-7': '25.7px',
      mini: '15px',
      base: '16px',
      '26xl': '45px',
      '41xl': '60px',
      inherit: 'inherit',
    },
  },
  corePlugins: {
    preflight: false,
  },
};
