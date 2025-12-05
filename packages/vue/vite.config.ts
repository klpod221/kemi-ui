import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat kemi-ui tags as custom elements
          isCustomElement: (tag: string) => tag.startsWith('ui-')
        }
      }
    }),
    dts({
      outDir: 'dist',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      staticImport: true,
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KemiUIVue',
      formats: ['es', 'umd'],
      fileName: (format) => `kemi-ui-vue.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: ['vue', '@klpod221/kemi-ui', '@klpod221/kemi-ui/validators'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          '@klpod221/kemi-ui': 'KemiUI',
          '@klpod221/kemi-ui/validators': 'KemiUI.validators'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
