'use client'

import { memo } from "react"
import { useOthersConnectionIds } from "@/liveblocks.config"
import { Cursor } from "./cursor"

const Cursors = () => {
    const ids = useOthersConnectionIds();
    return (
        <>
            {ids.map((connectoionId) => (
                <Cursor key={connectoionId} connectionId={connectoionId} />
            ))}
        </>
    )
}


export const CursorPresence = memo(() => {
    return (
        <>
            {/* Todo draft pencl */}
            <Cursors />
            
        </>
    )
})

CursorPresence.displayName = "CursorPresence";

