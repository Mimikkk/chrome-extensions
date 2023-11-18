console.log("Hello world!");

import { findByRole } from "@testing-library/dom";

const problemset = await findByRole(document.body, "table");

console.log(1234);
console.log({
  problemset,
});
