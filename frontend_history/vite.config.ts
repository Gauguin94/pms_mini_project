// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { fileURLToPath, URL } from 'node:url'

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     port: 5173,
//     proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } }
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//     }
//   }
// })

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: {
    proxy: {
      '/api': {
        // ⬇︎ 백엔드 주소 (HTTP면 http://localhost:8080, HTTPS면 https://localhost:8443)
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false, // 백엔드가 self-signed HTTPS일 때만 필요
      },
    },
  },
})
