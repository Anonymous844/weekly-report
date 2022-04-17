import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import html from 'vite-plugin-html';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // build: {
  //   outDir: '../dist'
  // },
  plugins: [
    vue(),
    html({
      minify: true
    })
  ]
})
