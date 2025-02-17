import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Fix relative paths for Vercel
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
