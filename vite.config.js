import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bestie-birthday/',   // ✅ important for GitHub Pages
})
