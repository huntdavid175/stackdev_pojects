import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served by the preview hub at /hair-by-gyeiwaa/ (see ../hub)
  base: '/hair-by-gyeiwaa/',
  plugins: [react()],
  define: {
    // Images in public/ keep their names and are browser-cached for a day, so tag each
    // deploy's URLs with the commit to make replaced images show up straight away.
    __IMAGE_VERSION__: JSON.stringify((process.env.VERCEL_GIT_COMMIT_SHA ?? Date.now().toString(36)).slice(0, 8)),
  },
})
