/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    screens: {
      'max-ph': {max:'600px'},
      // => @media (min-width: 640px) { ... }

      'lp': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    
    
    
    extend: {},
    
    
    
  },
  plugins: [
    require('tailwindcss-animated')
    ],
}

