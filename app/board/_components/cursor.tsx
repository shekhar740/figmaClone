'use client'

import { connectionIdCoolors } from "@/lib/utils";
import { useOther } from "@/liveblocks.config";
import { MousePointer2 } from "lucide-react";
import React from "react";

interface CursorProps {
    connectionId: number;
}

export function Cursor({ connectionId }: CursorProps) {

    const info = useOther(connectionId, (user) => user?.info);
    const cursor = useOther(connectionId, (user) => user.presence);
    console.log(cursor)
   
    const name = info?.name || "Teammate";

    if (!cursor) {
        return null;
    }

    const { x, y } = cursor;

    console.log(x,y)

    return (
        <foreignObject
            x={x}
            y={y}
            width={50}
            height={50}
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`
            }}
            className="relative drop-shadow-md"
        >
            <MousePointer2 className="h-5 w-5" style={{
                backgroundColor: "blue",
                fill: connectionIdCoolors(connectionId), // Change fill to connectionIdCoolors color
                color: connectionIdCoolors(connectionId) // Change color to connectionIdCoolors color
            }} />
            <div className="absolute text-white py-0.5 rounded-md text-xs font-semibold" style={{ backgroundColor: connectionIdCoolors(connectionId) }}>  
                {name}
            </div>
        </foreignObject>
    );
}
