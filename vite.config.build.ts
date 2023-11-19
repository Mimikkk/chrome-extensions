import { defineConfig } from "vite";
import path from "path";
import { cp, mkdir, unlink } from "fs/promises";
import { readArgument } from "./scripts/shared/readArgument.js";

let name;
try {
  name = readArgument("name");
} catch {
  console.info("Usage: pnpm run build -- --name=plugin-name");
  process.exit(1);
}

console.info(`Building plugin '${name}'.`);

try {
  await unlink(`build/${name}/`);
} catch {
  console.info(`- No previous build found for '${name}'.`);
}

await mkdir(`build/${name}`, { recursive: true });
await cp(`src/plugins/${name}/manifest.json`, `build/${name}/manifest.json`);
await cp(`src/plugins/${name}/icons/`, `build/${name}/icons/`, { recursive: true });

console.info("- Copied manifest.json and icons.");
console.info();

export default defineConfig({
  base: "./",
  build: {
    outDir: `build/${name}`,
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: [`src/plugins/${name}/background.ts`, `src/plugins/${name}/manipulate.ts`],
      fileName: (_, b) => `${b}.js`,
      formats: ["es"],
    },
  },
  resolve: {
    alias: { "@shared": path.resolve(__dirname, "./src/shared") },
  },
  define: {
    "process.env": {},
  },
});
