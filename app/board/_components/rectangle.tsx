// rectangel laer

import { colorTOCss } from "@/lib/utils";
import { ReactangleLayer } from "@/type/cavnas";
import React from "react";


interface RectangeleProps {
    id : string,
    layer : ReactangleLayer,
    onPointDown : (e:React.PointerEvent,id : string)=>void;
    selectionColor : string;
}


export const Rectangle = ({id,layer,onPointDown,selectionColor}:RectangeleProps)=>{
    const {x,y,width,height,fill} = layer;
    return (
        <rect className="drop-shadow-md cursor-pointer" onPointerDown={(e)=>onPointDown(e,id)}  style={{transform : `translate(${x}px,${y}px)`}} x={0} y={0}  width={width} height={height} strokeWidth={1} fill={fill ?  colorTOCss(fill) : "#000"} stroke={selectionColor}  />
    )
}