import svg from "svgson";
import { Resvg } from "@resvg/resvg-js";

export namespace Svg {
  export interface TextOptions {
    attributes: Record<string, string>;
    children?: svg.INode[];
  }

  export const text = (text: string, options?: TextOptions): svg.INode => ({
    type: "element",
    name: "text",
    value: "",
    children: [
      { type: "text", value: text, children: [], attributes: {}, name: "element" },
      ...(options?.children ?? []),
    ],
    attributes: options?.attributes ?? {},
  });

  interface AsPngOptions {
    size: number;
    antialiasing?: boolean;
    notext?: boolean;
  }

  export const asPng = (source: string, { size, notext, antialiasing }: AsPngOptions) =>
    new Resvg(source, {
      fitTo: { mode: "height", value: size },
      shapeRendering: antialiasing ? 2 : 0,
      textRendering: antialiasing ? 2 : 0,
      font: { loadSystemFonts: !notext },
      imageRendering: antialiasing ? 1 : 0,
    })
      .render()
      .asPng();
}
