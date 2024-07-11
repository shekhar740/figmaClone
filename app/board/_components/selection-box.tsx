import React, { memo } from "react";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useSelf, useStorage } from "@/liveblocks.config";
import { LayerType, Side, XWYH } from "@/type/cavnas";

interface SelectionBoxProps {
    onResizeHandlePointerDown: (corner: Side, intialBounds: XWYH) => void;
}

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf(me => me.presence.selection.length === 1 ? me.presence.selection[0] : null);
    const isWindowHandles = useStorage(root => soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path);
    const bounds = useSelectionBounds();

    if (!bounds) {
        return null;
    }


    return (
        <>
            <rect
                className="fill-transparent stroker-blue-500 stroke-1 pointer-events-none"
                style={{ transform: `translate(${bounds.x}px,${bounds.y}px)` }}
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
            />
            {isWindowHandles && (
                <>
                <rect
                    className="fill-white stroke-1 stroke-blue-500"
                    x={0}
                    y={0}
                    style={{
                        cursor: "nwse-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`
                    }}
                    onPointerDown={(e) => {
                        e.preventDefault();
                        // onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
                        // Todo : Add resize handler
                        // console.log(Side.Top + "" + Side.Left)
                    }}
                />
                {/* second left */}
                <rect
                    className="fill-white stroke-1 stroke-blue-500"
                    x={0}
                    y={0}
                    style={{
                        cursor: "ns-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`
                    }}
                    onPointerDown={(e) => {
                        e.preventDefault();
                        // Todo : Add resize handler
                        onResizeHandlePointerDown(Side.Top, bounds);

                    }}
                />
                {/* third */}
                <rect
                    className="fill-white stroke-1 stroke-blue-500"
                    x={0}
                    y={0}
                    style={{
                        cursor: "nesw-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,${bounds.y - HANDLE_WIDTH / 2}px)`
                    }}
                    onPointerDown={(e) => {
                        e.preventDefault();
                        // Todo : Add resize handler
                        onResizeHandlePointerDown(Side.Top + Side.Right, bounds);

                    }}
                />
                {/* fourth */}
                <rect
                    className="fill-white stroke-1 stroke-blue-500"
                    x={0}
                    y={0}
                    style={{
                        cursor: "ew-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,${bounds.height / 2 - HANDLE_WIDTH}px)`
                    }}
                    // bounds.height / 2 + HANDLE_WIDTH - HANDLE_WIDTH

                    onPointerDown={(e) => {
                        e.preventDefault();
                        onResizeHandlePointerDown(Side.Right, bounds);

                        // Todo : Add resize handler
                    }}
                />

                <rect
                    className="fill-white stroke-1 stroke-blue-500"
                    x={0}
                    y={0}
                    style={{
                        cursor: "nwse-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,${bounds.height - bounds.y - HANDLE_WIDTH}px)`
                    }}
                    onPointerDown={(e) => {
                        e.preventDefault();
                        onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);

                        // Todo : Add resize handler
                    }}
                />

                {/*  */}
                {/* SIXTH */}
                <rect
                    className="fill-white stroke-1 stroke-blue-500"
                    x={0}
                    y={0}
                    style={{
                        cursor: "ns-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x + bounds.width / 2}px,${bounds.height - bounds.y - HANDLE_WIDTH}px)`
                    }}
                    onPointerDown={(e) => {
                        e.preventDefault();
                        onResizeHandlePointerDown(Side.Bottom, bounds);
                        // Todo : Add resize handler
                    }}
                />
                <rect
                    className="fill-white stroke-1 stroke-blue-500"
                    x={0}
                    y={0}
                    style={{
                        cursor: "nesw-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px,${bounds.height - bounds.y - HANDLE_WIDTH}px)`
                    }}
                    onPointerDown={(e) => {
                        e.preventDefault();
                        // onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
                        console.log("this clicked")
                        console.log(Side.Left )

                        // Todo : Add resize handler
                    }}
                />

                <rect
                    className="fill-white stroke-1 stroke-blue-500"
                    x={0}
                    y={0}
                    style={{
                        cursor: "ew-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px,${bounds.height / 2 - HANDLE_WIDTH}px)`
                    }}
                    onPointerDown={(e) => {
                        e.preventDefault();
                        onResizeHandlePointerDown(Side.Left, bounds);
                    }}
                />

            </>

            )}
        </>
    );
});

SelectionBox.displayName = "SelectionBox";


