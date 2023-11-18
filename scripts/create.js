import { cp, mkdir } from "fs/promises";

const readArgument = (name) => {
  const argument = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  if (argument === undefined) throw Error(`Missing argument --${name}`);

  return argument.split("=")[1];
};

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
