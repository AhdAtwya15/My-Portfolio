import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  build: {
   
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react'
            if (id.includes('gsap'))        return 'vendor-gsap'
            if (id.includes('matter-js'))   return 'vendor-matter'
            if (id.includes('lottie-react')) return 'vendor-lottie'
            if (id.includes('react-icons')) return 'vendor-icons'
          }
        },
      },
    },
  },
})
