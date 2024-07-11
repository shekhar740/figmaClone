import { Camera, Color, Layer, LayerType, PathLayer, Point, Side, XWYH } from "@/type/cavnas";
import { type ClassValue, clsx } from "clsx"
import React from "react";
import { twMerge } from "tailwind-merge"
const COLORS = [
  "#DC2626",
  "#D97706",
  "#059669",
  "#7C3AED",
  "#DB2777"
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function connectionIdCoolors(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function PointerEventToCanvasPoint(e: React.PointerEvent, camera: Camera) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y
  }
}

export function colorTOCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(bounds: XWYH, corner: Side, point: Point): XWYH {
  const result = {
    x: bounds.x,
    y: bounds.y,

    width: bounds.width,
    height: bounds.height
  }
  if ((corner && Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }
  if ((corner && Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);

  };
  if ((corner && Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }
  if ((corner && Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y)
  }
  return result
}

export function findIntersectinLayersWithRectangle(layersIds: readonly string[], layers: ReadonlyMap<string, Layer>, a: Point, b: Point) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y)
  };

  const ids = [];
  for (const layerId of layersIds) {
    const layer = layers.get(layerId);
    if (layer == null) {
      continue;
    }
    const { x, y, height, width } = layer;

    if (rect.x + rect.width > x && rect.x < x + width && rect.y + rect.height > y && rect.y < y + height) {
      ids.push(layerId);
    }
  }
  return ids;
}

export function penPointsToPathLayer(points: number[][], color: Color): PathLayer {

  if (points.length < 2) {
    throw new Error("cannot tranfrom points with less then 2 points");
  }

  let lefft = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let Bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (lefft > x) {
      lefft = x;
    }
    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (Bottom < y) {
      Bottom = y;
    }
  }

  return {
    type : LayerType.Path,
    x : lefft,
    y : top,
    width : right - lefft,
    height : Bottom - top,
    fill : color,
    points : points
    .map(([x,y,pressure])=>[x- lefft,y - top,pressure]),
  }

}


