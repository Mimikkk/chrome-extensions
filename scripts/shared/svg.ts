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

  export interface RectOptions {
    width: number;
    height: number;
    x?: number | string;
    y?: number | string;
    rx?: number | string;
    ry?: number | string;
    border?: number | string;
    fill?: string;
    color?: string;
  }

  export const rect = ({ fill, border, width, height, color, x, y, rx, ry }: RectOptions): svg.INode => ({
    type: "element",
    name: "rect",
    value: "",
    children: [],
    attributes: {
      "stroke-width": `${border ?? 0}`,
      width: `${width}`,
      height: `${height}`,
      x: `${x ?? 0}`,
      y: `${y ?? 0}`,
      rx: `${rx ?? width / 4}`,
      ry: `${ry ?? height / 4}`,
      fill: fill!,
      color: color!,
    },
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
