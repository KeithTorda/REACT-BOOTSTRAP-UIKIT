import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/** Library build: produces dist/ that other projects install and import. */
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@kit': path.resolve(process.cwd(), 'src') } },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    lib: {
      entry: path.resolve(process.cwd(), 'src/index.js'),
      name: 'AdminUIKit',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'admin-ui-kit.js' : 'admin-ui-kit.cjs'),
    },
    rollupOptions: {
      external: [
        'react', 'react-dom', 'react/jsx-runtime',
        'react-router-dom', 'prop-types',
        'chart.js', 'chart.js/auto', 'react-chartjs-2',
      ],
      output: { assetFileNames: (asset) => (asset.name && /\.css$/.test(asset.name) ? 'admin-ui-kit.css' : 'assets/[name][extname]'), globals: { react: 'React', 'react-dom': 'ReactDOM' } },
    },
  },
});
