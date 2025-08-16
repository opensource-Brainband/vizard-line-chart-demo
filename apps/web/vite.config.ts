
import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.md'],
  server: {
    port: 5173,
  },
  base: '/vizard-line-chart-demo/',
});
