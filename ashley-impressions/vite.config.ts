import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served by the preview hub at /ashley-impressions/ (see ../hub)
  base: '/ashley-impressions/',
  plugins: [react()],
})
