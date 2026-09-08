import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/** Dev/build config for the showcase app in /app. */
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: { outDir: 'build' },
  resolve: {
    alias: {
      '@kit': path.resolve(process.cwd(), 'src'),
      '@app': path.resolve(process.cwd(), 'app'),
      'admin-ui-kit': path.resolve(process.cwd(), 'src/index.js'),
    },
  },
});
