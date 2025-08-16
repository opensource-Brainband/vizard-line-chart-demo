import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, '../../packages/core/src'),
    },
  },
  assetsInclude: ['**/*.md'],
  server: {
    port: 5173,
  },
});
