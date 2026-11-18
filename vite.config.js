import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    // GitHub Actions 环境下用子路径，其他（本地/Netlify）用根路径
  base: process.env.GITHUB_ACTIONS ? '/task-hub/' : '/',

  plugins: [
    vue(),
    tailwindcss(),
    viteCompression({
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](vue|@vue|vue-router|pinia)[\\/]/.test(id)) {
            return 'vue-vendor'
          }
        }
      }
    }
  }
})