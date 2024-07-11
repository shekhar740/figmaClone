'use client'
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { Info } from "./info"
import React, { useCallback, useMemo, useState } from "react"
import { Camera, CanvasMOde, CanvasState, Color, Layer, LayerType, Point, Side, XWYH } from "@/type/cavnas"
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useSelf, useStorage } from "@/liveblocks.config"
import { CursorPresence } from "./cursor-presence"
import { PointerEventToCanvasPoint, connectionIdCoolors, findIntersectinLayersWithRectangle, resizeBounds } from "@/lib/utils"
import { nanoid } from 'nanoid'
import { LiveObject } from "@liveblocks/client"
import { CanvasMode } from "@/app/types/canvas"
import { late } from "zod"
import { LayerPreview } from "./LayerPreview"
import { SelectionBox } from "./selection-box"
import { SelectionTools } from "./selection-tools"
const MAX_LAYER = 100;


interface ConavasProps {
    boardId: string
}

const HANDLE_WIDTH = 8;

export const Canvas = ({ boardId }: ConavasProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();
    const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMOde.None })
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const LayerIds = useStorage((root) => root.LayerIds)
    const [LastUsedColor, setLastUsedCOlor] = useState<Color>({ r: 0, g: 0, b: 0 })
    

    console.log(selection)

    const insertLayer = useMutation(
        ({ storage, setMyPresence }, layerType: LayerType.Ellipse | LayerType.Reactangle | LayerType.Text | LayerType.Note, position: Point) => {
            const livelayers = storage.get("layers")
            if (livelayers.size >= MAX_LAYER) {
                return;
            }
            const Livelayerids = storage.get("LayerIds")
            const layerId = nanoid();
            const layer = new LiveObject({
                type: layerType,
                x: position.x,
                y: position.y,
                height: 100,
                width: 100,
                fill: LastUsedColor
            })
            Livelayerids.push(layerId);
            livelayers.set(layerId, layer);
            setMyPresence({ selection: [layerId] }, { addToHistory: true })
            setCanvasState({ mode: CanvasMOde.None });
        },
        [LastUsedColor]
    );

    const TranslateSelectedLayer = useMutation(({ storage, self }, point: Point) => {
        if (canvasState.mode !== CanvasMOde.Translating) {
            return;
        }

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y,
        }
        const llivelayers = storage.get("layers");

        for (const id of self.presence.selection) {
            const layer = llivelayers.get(id)

            if (layer) {
                layer.update({
                    x: layer.get("x") + offset.x,
                    y: layer.get("y") + offset.y,
                })
            }
        }
        setCanvasState({ mode: CanvasMOde.Translating, current: point })

    }, [canvasState,])



    const unselectedLayers = useMutation(({ self, setMyPresence }) => {
        if (self.presence.selection.length > 0) {
            setMyPresence({ selection: [] }, { addToHistory: true })
        }
    }, [])

    const updateSelectionNet = useMutation(({storage,setMyPresence},current : Point,origin : Point)=>{
        const layers = storage.get("layers").toImmutable();
        setCanvasState({
            mode : CanvasMOde.SelectionNet,
            origin,
            current
        })

        const ids = findIntersectinLayersWithRectangle(LayerIds,layers,origin,current)

        setMyPresence({selection : ids})

    },[LayerIds])
 
    const startMultiSelection = useCallback((current: Point, origin: Point) => {
        console.log({first : Math.abs(current.x - origin.x),second : Math.abs(current.y - origin.y)})
        if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
            console.log("Attending a selected ")
            setCanvasState({mode : CanvasMOde.SelectionNet,origin,current})
        }
    }, []);

    const reizeselectedLayer = useMutation(({ storage, self }, point: Point,) => {
        if (canvasState.mode !== CanvasMOde.Resizing) {
            return;
        }
        const bounds = resizeBounds(canvasState.intialBounds, canvasState.corner,
            point
        )

        const livelayers = storage.get("layers");
        const layer = livelayers.get(self.presence.selection[0]);

        if (layer) {
            layer.update(bounds);
        }
    }, [canvasState])

    const onWheel = useCallback((e: React.WheelEvent) => {
        console.log("scroling coorect")
        setCamera((camera) => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY, }))
    }, [])

    const onPointerLeave = useMutation(({ setMyPresence }) => (e: React.PointerEvent) => {
        // e.preventDefault();
        console.log("pointer moving")
        const current = PointerEventToCanvasPoint(e, camera);
        console.log("pointe moved")
        setMyPresence({ cursor: null });
    }, []);

    const continueDrawding = useMutation(({self,setMyPresence},Point : Point,e : React.PointerEvent)=>{
        const {pencilDrafts} = self.presence;
        if(canvasState.mode != CanvasMOde.Peincil || e.buttons !== 1 || pencilDrafts == null){
            return;
        }
        setMyPresence({
            cursor : Point,
            pencilDrafts : pencilDrafts.length === 1 &&
            pencilDrafts[0][0] === Point.x &&
            pencilDrafts[0][1] === Point.y
            ? pencilDrafts : [...pencilDrafts,[Point.x , Point.y,e.pressure]]
        })
    },[canvasState.mode])



    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();
        console.log("moving correct");
        const current = PointerEventToCanvasPoint(e, camera);
    
        if (canvasState.mode === CanvasMOde.Pressing) {
            startMultiSelection(current, canvasState.origin);
        } else if (canvasState.mode === CanvasMOde.SelectionNet) {
            updateSelectionNet(current, canvasState.origin);
        } else if (canvasState.mode === CanvasMOde.Translating) {
            TranslateSelectedLayer(current);
        } else if (canvasState.mode === CanvasMOde.Resizing) {
            reizeselectedLayer(current);
        }else if(canvasState.mode === CanvasMOde.Peincil){
            continueDrawding(current,e);
        }
    
        setMyPresence({ cursor: current });
    }, [continueDrawding,camera, canvasState, startMultiSelection, updateSelectionNet, TranslateSelectedLayer, reizeselectedLayer]);
    

    const startDrawing = useMutation(({setMyPresence},point : Point,pressure : number)=>{
        setMyPresence({pencilDrafts : [[point.x,point.y,pressure]],PenColor : LastUsedColor})

    },[LastUsedColor])

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const point = PointerEventToCanvasPoint(e, camera);
        if (canvasState.mode === CanvasMOde.Inserting) {
            return;
        }

        if(canvasState.mode == CanvasMOde.Peincil){
            startDrawing(point,e.pressure);
            return;
        }
    
        // Check if the Ctrl key is pressed
        if (e.ctrlKey) {
            console.log("Ctrl key is pressed, entering Pressing mode");
            setCanvasState({ origin: point, mode: CanvasMOde.Pressing });
            return;
        }
    }, [camera, canvasState.mode, setCanvasState,startDrawing]);
    
    const InsertPath = useMutation(({storage,self,setMyPresence})=>{
        const liveLayers = storage.get('layers');
        const {pencilDrafts} = self.presence;

        if(pencilDrafts == null || pencilDrafts.length <2 || liveLayers.size >= MAX_LAYER){
            setMyPresence({pencilDrafts : null});
        }
        const id = nanoid();
        
    },[])

    const onPointerUp = useMutation(({ }, e) => {
        console.log("pointer up trigerd")
        const point = PointerEventToCanvasPoint(e, camera)
        if(canvasState.mode === CanvasMOde.None || canvasState.mode === CanvasMOde.Pressing){
            unselectedLayers();
            setCanvasState({
                mode : CanvasMOde.None,
            })
        }else if (canvasState.mode === CanvasMOde.Peincil){
            InsertPath();
        }else if(canvasState.mode === CanvasMOde.Inserting){
            insertLayer(canvasState.layerType,point);
        }else {
            setCanvasState({
                mode : CanvasMOde.None
            })
        }
      
        history.resume()
    }, [camera, canvasState, unselectedLayers, history, insertLayer,InsertPath])

    const onLayerPointDown = useMutation(
        ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
            console.log(layerId)
            if (canvasState.mode === CanvasMOde.Peincil ||
                canvasState.mode === CanvasMOde.Inserting
            ) {
                return;
            }
            history.pause();
            e.preventDefault();
            const point = PointerEventToCanvasPoint(e, camera)
            if (!self.presence.selection.includes(layerId)) {
                setMyPresence({ selection: [layerId] }, { addToHistory: true })
            }
            setCanvasState({ mode: CanvasMOde.Translating, current: point });
        },
        [
            setCanvasState,
            camera,
            history,
            canvasState.mode,
        ]
    );

    const selections = useOthersMapped((other) => other.presence.selection)

    const layerIdToCOlorSelection = useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {};
        for (const user of selections) {
            const [connectionID, selection] = user;
            for (const layerId of selection) {
                layerIdsToColorSelection[layerId] = connectionIdCoolors(connectionID)
            }
        }
        return layerIdsToColorSelection;
    }, [selections])


    const onResizeHandlePointerDown = useCallback((corner: Side, intialBounds: XWYH) => {
        history.pause();
        setCanvasState({ mode: CanvasMOde.Resizing, intialBounds, corner })
    }, [history])

    return (
        <main className="h-screen w-full text-black relative touch-none">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar canRedo={canRedo} CanUndo={canUndo} undo={history.undo} redo={history.redo} canvasState={canvasState} setCanvasState={setCanvasState} />
            <SelectionTools camera={camera} setLastUsedColor={setLastUsedCOlor} />
            <svg className="h-[100vh] w-[100vw] border-1" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
                <g style={{
                    transform: `translate(${camera.x}px, ${camera.y}px)`
                }}>
                    {LayerIds.map((layerid) => (
                        <LayerPreview
                            key={layerid}
                            id={layerid}
                            selectionColor={layerIdToCOlorSelection[layerid]} // Fixed typo from selectionCOlor to selectionColor
                            onLayerPointDown={onLayerPointDown} // Corrected typo
                        />
                    ))}

                    <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
                    {canvasState.mode === CanvasMOde.SelectionNet && canvasState.current != null && (
                      <rect className="fill-blue-500/5 stroke-blue-500 stroke-1" x={Math.min(canvasState.origin.x,canvasState.current.x)}
                      y={Math.min(canvasState.origin.y,canvasState.current.y)}
                      width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                      height={Math.abs(canvasState.origin.y - canvasState.current.y)} />
                    )}
                    <CursorPresence />
                </g>
            </svg>


        </main>
    )
}