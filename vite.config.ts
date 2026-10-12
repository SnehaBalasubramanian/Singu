import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // relative paths so the site works from a GitHub Pages sub-folder
  base: './',
  plugins: [react()],
})
