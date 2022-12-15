import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  test: {},
  build: {
    minify: "terser",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "striff",
      fileName: (format) => `index.${format}.js`,
    },
  },
});
