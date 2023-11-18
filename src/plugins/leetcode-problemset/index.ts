import { findByRole } from "@testing-library/dom";

(async () => {
  const item = await findByRole(document.body, "table");

  console.log(123);
  console.log(item);
})();
