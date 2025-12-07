// client/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@shared': path.resolve(import.meta.dirname, 'src', 'shared'),
      '@assets': path.resolve(import.meta.dirname, 'src', 'assets'),
    },
  },
  // GitHub Pages - 레포지토리 이름 필수
  base: '/GILab_Home_Page/',
  build: {
    // docs 폴더로 빌드 (루트에 생성)
    outDir: '../docs',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})
