import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'

const repoName = process.env.VITE_REPO_NAME || '/';

// https://vite.dev/config/
export default defineConfig({
  base: repoName,
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      template: "treemap",
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: "analyse.html",
    }) as PluginOption,
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
  build: {
    assetsInlineLimit: 0,
  },
})
