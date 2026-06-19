import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // './' makes all asset paths relative — works on GitHub Pages subdirectory
  // (shellzero.github.io/portfolio/) AND Netlify root without no changes.
  base: './',
})
