import { bench, describe } from "vitest";

namespace Function {
  interface Options {
    a?: string;
    b?: string;
    c?: number;
  }

  export const WithCreation = (options: Options = { a: "default", c: 1000 }) => {};

  const Options: Options = Object.freeze({ a: "default", c: 1000 });
  export const WithFrozen = (options: Options = Options) => {};

  const EditableOptions: Options = { a: "default", c: 1000 };
  export const WithEditable = (options: Options = EditableOptions) => {};

  export const WithExplicit = ({ a = "default", b, c }: Options) => {};

  export const WithFilling = ({ a, c }: Options = {}) => {
    a ??= "default";
    c ??= 1000;
  };
}

describe("MicroBenchmark - Action dispatch", () => {
  const options = { warmupTime: 100, time: 100 };

  describe("Without arguments", () => {
    bench("Creation", () => Function.WithCreation(), options);
    bench("Frozen", () => Function.WithFrozen(), options);
    bench("Editable", () => Function.WithEditable(), options);
    bench("Filling", () => Function.WithFilling(), options);
  });

  describe("With static arguments", () => {
    bench("Creation", () => Function.WithCreation({ c: 300 }), options);
    bench("Frozen", () => Function.WithFrozen({ c: 300 }), options);
    bench("Editable", () => Function.WithEditable({ c: 300 }), options);
    bench("Explicit", () => Function.WithExplicit({ c: 300 }), options);
    bench("Filling", () => Function.WithFilling({ c: 300 }), options);
  });

  describe("With random arguments", () => {
    bench("Creation", () => Function.WithCreation({ c: Math.random() }), options);
    bench("Frozen", () => Function.WithFrozen({ c: Math.random() }), options);
    bench("Editable", () => Function.WithEditable({ c: Math.random() }), options);
    bench("Explicit", () => Function.WithExplicit({ c: Math.random() }), options);
    bench("Filling", () => Function.WithFilling({ c: Math.random() }), options);
  });
});
