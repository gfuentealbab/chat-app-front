import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { API_CONFIG } from './src/config/api';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      [API_CONFIG.ENDPOINTS.CHAT]: {
        target: API_CONFIG.BASE_URL,
        changeOrigin: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        timeout: API_CONFIG.REQUEST.TIMEOUT,
        secure: true, // Changed to true for HTTPS
        ws: true,
      },
    },
  },
});