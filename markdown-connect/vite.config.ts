import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  assetsInclude: ['**/*.md'], // Markdown 파일을 import 가능하게
  server: {
    port: 5173,
  },
})