import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "./",
  resolve: {
    alias: { "@shared": path.resolve(__dirname, "./src/shared") },
  },
});
