import { defineConfig } from "vite";
import {} from "vite";
import path from "path";
import { cp, mkdir, unlink } from "fs/promises";

const readArgument = (name: string) => {
  const argument = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  if (argument === undefined) throw Error(`Missing argument --${name}`);
  return argument.split("=")[1];
};

let name;
try {
  name = readArgument("name");
} catch {
  console.info("Usage: pnpm run build -- --name=plugin-name");
  process.exit(1);
}

console.log(`Building plugin '${name}'.`);

try {
  await unlink(`build/${name}`);
} catch {
  console.info(`- No previous build found for '${name}'.`);
}
console.log();

await mkdir(`build/${name}`, { recursive: true });
await cp(`src/plugins/${name}/manifest.json`, `build/${name}/manifest.json`);
await cp(`src/plugins/${name}/icons/`, `build/${name}/icons/`, { recursive: true });

console.info("- Copied manifest.json and icons.");

export default defineConfig({
  base: "./",
  build: {
    outDir: `build/${name}`,
    emptyOutDir: false,
    lib: {
      entry: `src/plugins/${name}/index.ts`,
      fileName: "index",
      formats: ["es"],
    },
  },
  resolve: {
    alias: { "@shared": path.resolve(__dirname, "./src/shared") },
  },
});
