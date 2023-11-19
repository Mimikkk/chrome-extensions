import { readArgument } from "./shared/readArgument.js";
import fs, { cp, mkdir } from "fs/promises";
//@ts-expect-error
import IconTemplate from "../assets/favicon.svg?raw";
import * as svgson from "svgson";
import { Svg } from "./shared/svg.js";

let name: string;
try {
  name = readArgument("name");
} catch {
  console.info("Usage: pnpm run create -- --name=plugin-name");
  process.exit(1);
}

const attributes = {
  "stroke-width": ".3",
  x: "50%",
  y: "50%",
  "font-size": "7",
  "dominant-baseline": "central",
  "text-anchor": "middle",
};
export const createIcon = async (name: string) => {
  const icon = await svgson.parse(IconTemplate);

  icon.children.push(Svg.text(name, { attributes }));

  return svgson.stringify(icon);
};

console.info(`Creating plugin '${name}'...`);

console.info(`- creating directory '${name}'...`);

const directory = `src/plugins/${name}`;
await mkdir(`${directory}/icons`, { recursive: true });
console.info(`- Moving template files into '${directory}/'...`);
await cp("assets/template", directory, { recursive: true });

console.info(`- creating icons/pngs '${name}'...`);
console.info(`-- making favicon '${name}'...`);
const favicon = await createIcon(
  name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .toUpperCase(),
);

await fs.writeFile(`${directory}/icons/favicon.svg`, favicon);
const sizes = [16, 24, 32, 48, 128];
for (const size of sizes) {
  const image = Svg.asPng(favicon, { size });
  console.info(`-- 'favicon${size}.png'`);

  await fs.writeFile(`${directory}/icons/favicon${size}.png`, image);
}

console.info(`Created!`);
