import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Karinderya-POS-system/',
  plugins: [react(), tailwindcss()],
})
