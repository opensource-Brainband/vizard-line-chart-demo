import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  assetsInclude: ['**/*.md'],
  server: {
    port: 5173,
  },
})