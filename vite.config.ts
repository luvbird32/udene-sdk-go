
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 8080,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@admin': path.resolve(__dirname, './src/components/admin'),
      '@client': path.resolve(__dirname, './src/components/client'),
      '@shared': path.resolve(__dirname, './src/components/shared'),
      '@monitoring': path.resolve(__dirname, './src/components/monitoring')
    }
  }
});

