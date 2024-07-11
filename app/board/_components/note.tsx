import { cn, colorTOCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { TextLayer } from "@/type/cavnas";
import { Kalam } from "next/font/google";
import React, { useState } from "react";
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'


const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
})

interface TextProps {
    id: string,
    layer: TextLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string,
}

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.5;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBaseOnWidth = width * scaleFactor;
    return Math.min(fontSizeBasedOnHeight, fontSizeBaseOnWidth, maxFontSize);
}

export const Note = ({ id, layer, onPointerDown, selectionColor }: TextProps) => {
    const [values, setValues] = useState("text")
    const { x, y, width, fill, value, height } = layer
    console.log(fill)

    const updateValue = useMutation(({ storage }, newValue: string) => {
        const liveLauers = storage.get("layers");
        liveLauers.get(id)?.set("value", "shekhar metre");
    }, [])



    function onChange(v: any) {
        console.log('changed', v);
        setValues(v);
    }

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            className="folded-corner relative overflow-hidden"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
                background : `${colorTOCss(fill)}`
            }}
        >
            
        </foreignObject>



    )
}

// className="h-full w-full bg-transparent text-center outline-none"
//                     style={{
//                         fontSize: calculateFontSize(width, height),
//                         color: fill ? colorTOCss(fill) : "#000",
//                     }}
// style="overflow:visible;" transform="translate(0,0) scale(1,-1)"