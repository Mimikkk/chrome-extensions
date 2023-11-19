import chokidar from "chokidar";
import child_process from "child_process";
import { readArgument } from "./shared/readArgument.js";
import { debounce } from "./shared/debounce.js";
import fs from "fs";

const argument = readArgument("name", "all");
const names = argument === "all" ? fs.readdirSync("src/plugins").filter((name) => name !== "template") : [argument];

console.log(`Developing: ${names.map((name) => `'${name}'`).join(", ")}.`);

const cache = new Map<string, child_process.ChildProcess>();
const build = (name: string) => {
  console.log(`-- Building plugin '${name}'.`);

  let process = cache.get(name);
  if (process) {
    console.log(`-- Killing previous build.`);
    process.kill("SIGKILL");
  }

  cache.set(
    name,
    child_process.exec(`pnpm run build -- --name=${name}`, (error, stdout, stderr) => {
      if (error) console.error(error);
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
    }),
  );
};

names.forEach((name) => {
  console.log(`- watching src/${name}/ for changes.`);

  chokidar.watch(`src/${name}`).on(
    "change",
    debounce(() => build(name)),
  );
});

console.log(`- watching src/shared/ for changes.`);
chokidar.watch("src/shared").on("change", () => names.forEach((name) => build(name)));
