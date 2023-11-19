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
    antialiasing?: boolean | { text?: boolean; shapes?: boolean; images?: boolean };
    notext?: boolean;
  }

  export const asPng = (source: string, { size, notext, antialiasing }: AsPngOptions) => {
    const isFineAntialias = typeof antialiasing === "object";
    const antialiasingText = isFineAntialias ? antialiasing.text : antialiasing;
    const antialiasingShapes = isFineAntialias ? antialiasing.shapes : antialiasing;
    const antialiasingImages = isFineAntialias ? antialiasing.images : antialiasing;

    return new Resvg(source, {
      fitTo: { mode: "height", value: size },
      shapeRendering: antialiasingShapes ? 2 : 0,
      textRendering: antialiasingText ? 1 : 0,
      imageRendering: antialiasingImages ? 1 : 0,
      font: { loadSystemFonts: !notext },
    })
      .render()
      .asPng();
  };
}
