import chokidar from "chokidar";
import * as child_process from "child_process";
import { readArgument } from "./shared/readArgument.js";
import { debounce } from "./shared/debounce.js";

const name = readArgument("name");

let process: child_process.ChildProcess | undefined;
chokidar.watch("src/plugins").on(
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
