import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        'utils/validators': resolve(__dirname, "src/utils/validators.ts"),
      },
      name: "KemiUI",
      fileName: (format, entryName) => {
        if (entryName === 'utils/validators') {
          return `utils/validators.${format === 'es' ? 'js' : 'umd.cjs'}`;
        }
        return `kemi-ui.${format === 'es' ? 'js' : 'umd.cjs'}`;
      },
    },
    rollupOptions: {
      external: [],
    },
  },
});
