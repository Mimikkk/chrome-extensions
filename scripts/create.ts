import { readArgument } from "./shared/readArgument.js";
import { cp, mkdir } from "fs/promises";

try {
  const name = readArgument("name");

  console.log(`Creating plugin '${name}'...`);
  await mkdir(`src/plugins/${name}/`, { recursive: true });
  await cp("src/plugins/template", `src/plugins/${name}/`, { recursive: true });
  console.log(`Created!`);
} catch {
  console.info("Usage: pnpm run create -- --name=plugin-name");
  process.exit(1);
}
