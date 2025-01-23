import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      template: './src/index.html',
    }),
    react(),
  ],
  esbuild: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testsSetup.js',
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
});
