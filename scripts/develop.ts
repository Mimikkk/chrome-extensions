import chokidar from "chokidar";
import * as child_process from "child_process";
import { readArgument } from "./shared/readArgument.js";
import { debounce } from "./shared/debounce.js";
import * as fs from "fs";

const argument = readArgument("name", "all");
const names = argument === "all" ? fs.readdirSync("src/plugins").filter((name) => name !== "template") : [argument];

console.log('watching "src" for changes.');
console.log(`Developing ${names.map((name) => `'${name}'`).join(", ")}.`);

names.forEach((name) => {
  let process: child_process.ChildProcess | undefined;

  chokidar.watch("src").on(
    "change",
    debounce(() => {
      console.log(`Building plugin '${name}'.`);
      if (process) process.kill("SIGKILL");

      process = child_process.exec(`pnpm run build -- --name=${name}`, (error, stdout, stderr) => {
        if (error) console.error(error);
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
      });
    }),
  );
});
