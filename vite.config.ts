import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        properties: resolve(__dirname, 'properties.html'),
        property: resolve(__dirname, 'property.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
})
