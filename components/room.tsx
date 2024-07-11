'use client';
import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/type/cavnas";



interface RoomProps {
    roomId: string;
    children: ReactNode;
    fallback : NonNullable<ReactNode> | null
}


export const Room = ({ children, roomId,fallback }: RoomProps) => {
    return (
        <RoomProvider id={roomId}  initialPresence={{cursor : null,
            selection : [],
        }} initialStorage={{layers : new LiveMap<string,LiveObject<Layer>>(),
            LayerIds : new LiveList()
        }} >
            <ClientSideSuspense fallback={fallback}>
                {()=>children}
            </ClientSideSuspense>
        </RoomProvider>
    );
};
