'use client';

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/type/cavnas";
import React, { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Hint } from "@/app/home/(dashboard)/_components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolsProps {
    camera: Camera,
    setLastUsedColor: (color: Color) => void,
}

export const SelectionTools = memo(({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const moveToBack = useMutation(({ storage }) => {
        // this code is getting all layers and directly sending him to the back
        const liveLayerIds = storage.get("LayerIds")
        const indies: number[] = [];
        const arr = liveLayerIds.toArray();
        for (let i = 0; i < arr.length; i++) {
            if (selection.includes(arr[i])) {
                indies.push(i)
            }
        }
        for(let i = 0 ; i < indies.length;i++){
            liveLayerIds.move(indies[i],i);
        }
    }, [selection])

    const moveToFront = useMutation(({ storage }) => {
        // this code is getting all layers and directly sending him to the back
        const liveLayerIds = storage.get("LayerIds")
        const indies: number[] = [];
        const arr = liveLayerIds.toArray();
        for (let i = 0; i < arr.length; i++) {
            if (selection.includes(arr[i])) {
                indies.push(i)
            }
        }
        for(let i = indies.length - 1;i>= 0; i--){
            liveLayerIds.move(indies[i],arr.length - 1 - (indies.length - 1 - i))
        }
    }, [selection])

    const setFill = useMutation(({ storage }, fill: Color) => {
        const liveLayerIds = storage.get("layers");
        setLastUsedColor(fill);
        selection.forEach((id) => {
            liveLayerIds.get(id)?.set("fill", fill);
        });
    }, [selection, setLastUsedColor]);

    const deleteLayers = useDeleteLayers(); // Correctly using the custom hook

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
        return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
        <div className={`absolute  top-[${x}px]  p-3 rounded-xl bg-white shadow-md border flex select-none`} style={{
            transform: `translate(calc(${x}px - 50%),calc(${y - 16}px - 90%))`
        }}>
            <ColorPicker onchange={setFill} />
            <div className="flex flex-col gap-y-0.5">
                <Hint label="Bring to front">
                    <Button variant="board" size="icon" onClick={moveToFront} >
                        <BringToFront />
                    </Button>
                </Hint>
                <Hint label="Send to back" side="bottom">
                    <Button variant="board" size="icon" onClick={moveToBack}>
                        <SendToBack />
                    </Button>
                </Hint>
            </div>

            <div className="flex items-center pl-2 border-1 border-neutral-200">
                <Hint label="Delete">
                    <Button variant="board" size="icon" onClick={deleteLayers}>
                        <Trash2 />
                    </Button>
                </Hint>
            </div>
        </div>
    );
});
