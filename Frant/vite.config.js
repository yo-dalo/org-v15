import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  
    server: {
    proxy: {
      //'/api':'https://fast-food-v4.onrender.com'
    '/api':'http://localhost:5000'
    },
  },
  
})
