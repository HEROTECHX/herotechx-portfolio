import path from "path"
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/portfolio/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor chunks
          if (id.includes('node_modules')) {
            // React and React DOM in separate chunk
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            // Firebase in separate chunk
            if (id.includes('firebase')) {
              return 'firebase';
            }
            // Other node_modules
            return 'vendor-other';
          }
        },
      },
    },
  },
})