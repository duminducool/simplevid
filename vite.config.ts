import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/simplevid/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});