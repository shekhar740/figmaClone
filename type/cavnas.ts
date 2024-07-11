export type Color = {
    r: number;
    g: number;
    b: number;
}

export type Camera = {
    x: number;
    y: number;
}

export enum LayerType {
    Reactangle,
    Ellipse,
    Path,
    Text,
    Note,
}


export type ReactangleLayer = {
    type: LayerType.Reactangle;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export type PathLayer = {
    type: LayerType.Path;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    points: number[][];
    value?: string;
}

export type TextLayer = {
    type: LayerType.Text;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export type NoteLayer = {
    type: LayerType.Note;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export type Point = {
    x: number;
    y: number;
}


export type XWYH = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8,
}

export type EllipseLayer = {
    type: LayerType.Ellipse;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
}

export enum CanvasMOde {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Peincil
}
export type CanvasState =
    | {
        mode: CanvasMOde.None,
    }
    | {
        mode: CanvasMOde.SelectionNet,
        origin: Point;
        current?: Point;
    }
    | {
        mode: CanvasMOde.Translating,
        current: Point;
    }
    | {
        mode: CanvasMOde.Inserting,
        layerType: LayerType.Ellipse | LayerType.Reactangle | LayerType.Text | LayerType.Note
    }
    | {
        mode: CanvasMOde.Peincil
    }
    | {
        mode: CanvasMOde.Pressing,
        origin: Point,
    }
    | {
        mode: CanvasMOde.Resizing,
        intialBounds: XWYH;
        corner: Side;
    }


export type Layer = ReactangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer 


