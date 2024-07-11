'use client'

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/type/cavnas";
import React, { memo } from "react"
import { Rectangle } from "./rectangle";
import { Elllipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";

interface LayerPreviewProps {
    id: string;
    selectionColor: string;
    onLayerPointDown: (e: React.PointerEvent, LayerId: string) => void;
}


export const LayerPreview = memo(({ id, selectionColor, onLayerPointDown }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))
    if (!layer) {
        return null;
    }
    switch (layer.type) {
        case LayerType.Reactangle:
            return (<Rectangle id={id} layer={layer} onPointDown={onLayerPointDown} selectionColor={selectionColor} />);
        case LayerType.Ellipse:
            return (
                <Elllipse id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />
            )
        case LayerType.Note:
            return (
                <Note id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />
            )
        default:
            console.warn("unknown layer type");
            return null;
    }
});

LayerPreview.displayName = "LayerPreview"
