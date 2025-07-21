import react from '@vitejs/plugin-react'
// eslint-disable-next-line import/namespace
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
