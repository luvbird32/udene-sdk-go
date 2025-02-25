
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
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1000,
    minify: 'terser', // Use terser for better minification
    sourcemap: false, // Disable sourcemaps in production
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
    target: 'es2015', // Target more modern browsers for smaller bundle size
    cssCodeSplit: true, // Enable CSS code splitting
    reportCompressedSize: false, // Disable compressed size reporting for faster builds
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
