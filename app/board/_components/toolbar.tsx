'use client'

// import { ToolButton } from "./tool-button";
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Text, Type, Undo2 } from "lucide-react";
import { ToolButton } from "./tool-button";
import { CanvasMOde, CanvasState, LayerType } from "@/type/cavnas";

interface ToolbarProps {
    canvasState: CanvasState,
    setCanvasState: (newState: CanvasState) => void,
    undo: () => void,
    redo: () => void,
    CanUndo: boolean,
    canRedo: boolean,

}

export const Toolbar = ({ canvasState, setCanvasState, undo, redo, CanUndo, canRedo }: ToolbarProps) => {

    return (
        <div className="absolute top-[20%] translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white  rounded-md p-1.5 gap-y-1 flex-col flex items-center shadow-md">
                <ToolButton icon={MousePointer2} label="select" onclick={() => setCanvasState({ mode: CanvasMOde.None })} isActive={canvasState.mode === CanvasMOde.None || canvasState.mode === CanvasMOde.Translating ||
                    canvasState.mode === CanvasMOde.SelectionNet ||
                    canvasState.mode === CanvasMOde.Pressing ||
                    canvasState.mode === CanvasMOde.Resizing
                } />
                <ToolButton icon={Type} label="select" onclick={() => setCanvasState({ mode: CanvasMOde.Inserting, layerType: LayerType.Text })} isActive={canvasState.mode === CanvasMOde.Inserting && canvasState.layerType === LayerType.Text} />
                {/* sticky notes */}
                <ToolButton icon={StickyNote} label="select" onclick={() => setCanvasState({
                    mode: CanvasMOde.Inserting, layerType: LayerType.Note
                })} isActive={canvasState.mode === CanvasMOde.Inserting && canvasState.layerType === LayerType.Note} />
                {/* square */}
                <ToolButton icon={Square} label="select" onclick={() => setCanvasState({ mode: CanvasMOde.Inserting, layerType: LayerType.Reactangle })} isActive={canvasState.mode === CanvasMOde.Inserting && canvasState.layerType === LayerType.Reactangle}  />
                {/* circle logic */}
                <ToolButton icon={Circle} label="select" onclick={() => setCanvasState({ mode: CanvasMOde.Inserting, layerType: LayerType.Ellipse })} isActive={canvasState.mode === CanvasMOde.Inserting && canvasState.layerType === LayerType.Ellipse}  />
                {/* Pencil logic */}
                <ToolButton icon={Pencil} label="select" onclick={() =>setCanvasState({
                    mode : CanvasMOde.Peincil,
                })} isActive={canvasState.mode === CanvasMOde.Peincil} />
            </div>
            {/*  */}

            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton icon={Undo2} label="Undo" onclick={undo} />  {/* // here we set undo and redo below  */}
                <ToolButton icon={Redo2} label="Redo" onclick={redo} />
            </div>


        </div>
    )
}



export const ToolSkeleoton = () => {
    return (
        <div className="absolute top-[52%] shadow-md rounded-md translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[250px] w-[52px] " />
    );
};



