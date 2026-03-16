import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

const repoName = process.env.VITE_REPO_NAME || '/';

// https://vite.dev/config/
export default defineConfig({
  base: repoName,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    watch: {
      ignored: [
        "**/*.md",
      ],
    },
  },
})
