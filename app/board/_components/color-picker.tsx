'use client'

import { colorTOCss } from "@/lib/utils";
import { Color } from "@/type/cavnas"

interface COlorPickerProps {
    onchange: (color: Color) => void;
};

export const ColorPicker = ({ onchange }: COlorPickerProps) => {
    return (
        <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-1 mr-1 border-r border-neutral-200">
            <ColorButton color={{
                r: 243,
                g: 82,
                b: 35
            }}
                onClick={onchange}
            />
            {/* second */}
            <ColorButton color={{
                r: 68,
                g: 202,
                b: 99
            }}
                onClick={onchange}
            />
            <ColorButton color={{
                r: 255,
                g: 249,
                b: 177
            }}
                onClick={onchange}
            />
            <ColorButton color={{
                r: 39,
                g: 142,
                b: 237
            }}
                onClick={onchange}
            />
            <ColorButton color={{
                r: 155,
                g: 105,
                b: 245
            }}
                onClick={onchange}
            />
            <ColorButton color={{
                r: 252,
                g: 82,
                b: 35
            }}
                onClick={onchange}
            />
            <ColorButton color={{
                r: 0,
                g: 0,
                b: 0
            }}
                onClick={onchange}
            />
            <ColorButton color={{
                r: 255,
                g: 255,
                b: 255
            }}
                onClick={onchange}
            />
        </div>
    )
}

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color,
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
    return (
        <button className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition" onClick={()=>onClick(color)}>
            <div className="h-8 w-8 rounded-md border border-neutral-300" style={{backgroundColor:colorTOCss(color)}} />
        </button>
    )
}