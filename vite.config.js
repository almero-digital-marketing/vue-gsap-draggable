import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, '/src/index.js'),
      name: 'VueGsapDraggable',
      fileName: (format) => `vue-gsap-draggable.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'gsap', 'gsap-external-plugins'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'gsap': 'Gsap',
          'vue': 'Vue',
          'gsap-external-plugins': 'GsapExternalPlugins'
        }
      }
    }
  }
})
