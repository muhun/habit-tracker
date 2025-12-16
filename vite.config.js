import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    exclude: ['**/node_modules/**', '**/e2e/**', '**/*.stories.*'],
    coverage: {
      include: ['src/**/*'],
      exclude: ['server/**/*', '**/node_modules/**', '**/e2e/**', '**/*.test.*', '**/*.spec.*', '**/*.stories.*'],
      reporter: ['text', 'html', 'json'],
      reportsDirectory: './coverage'
    },
  },
});
