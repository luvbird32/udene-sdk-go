
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8080,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true
    },
    allowedHosts: [
      'localhost',
      '*.lovableproject.com',
      '93cd0ad5-a304-45e0-bed8-a08742db3f9f.lovableproject.com'
    ]
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-alert-dialog', '@radix-ui/react-toast'],
          'chart-vendor': ['recharts'],
          'query-vendor': ['@tanstack/react-query'],
        }
      },
    },
    target: 'es2015',
    cssCodeSplit: true,
    reportCompressedSize: false,
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
