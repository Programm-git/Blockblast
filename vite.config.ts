import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://<user>.github.io/Blockblast/ as a project page,
  // so asset URLs must be relative to that subpath rather than the domain root.
  base: '/Blockblast/',
  plugins: [react()],
})
