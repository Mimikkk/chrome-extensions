import { readArgument } from "./shared/readArgument.js";
import { cp, mkdir } from "fs/promises";

try {
  const name = readArgument("name");

  console.info(`Creating plugin '${name}'...`);
  await mkdir(`src/plugins/${name}/`, { recursive: true });
  await cp("src/plugins/template", `src/plugins/${name}/`, { recursive: true });
  console.info(`Created!`);
} catch {
  console.info("Usage: pnpm run create -- --name=plugin-name");
  process.exit(1);
}
