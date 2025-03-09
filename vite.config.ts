import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'CNAME', // Assurez-vous que CNAME est à la racine du projet
          dest: '.' // Copie à la racine de dist
        }
      ]
    })
  ],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      }
    }
  }
})
