import chokidar from "chokidar";
import child_process from "child_process";
import { readArgument } from "./shared/readArgument.js";
import { debounce } from "./shared/debounce.js";
import fs from "fs";

const cache = new Map<string, child_process.ChildProcess>();
const build = (name: string) => {
  console.info(`-- Building plugin '${name}'.`);

  let process = cache.get(name);
  if (process) {
    console.info(`-- Killing previous build.`);
    process.kill("SIGKILL");
  }

  cache.set(
    name,
    child_process.exec(`pnpm run build -- --name="${name}"`, (error, stdout, stderr) => {
      if (error) console.error(error);
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
    }),
  );
};
const readArguments = () => {
  const argument = readArgument("name", "all");
  const names = argument === "all" ? fs.readdirSync("src/plugins").filter((name) => name !== "template") : [argument];

  return { names };
};

const { names } = readArguments();
console.info(`Developing: ${names.map((name) => `'${name}'`).join(", ")}.`);

names.forEach(build);
names.forEach((name) => {
  console.info(`- watching src/plugins/${name}/ for changes.`);

  chokidar.watch(`src/plugins/${name}`).on(
    "change",
    debounce(() => build(name)),
  );
});

console.info(`- watching src/shared/ for changes.`);
chokidar.watch("src/shared", {}).on(
  "change",
  debounce(() => names.forEach((name) => build(name))),
);
