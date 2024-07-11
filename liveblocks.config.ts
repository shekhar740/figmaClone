import { createClient,LiveList,LiveMap,LiveObject } from "@liveblocks/client";
import { createRoomContext, createLiveblocksContext } from "@liveblocks/react";

import {Layer,Color} from '@/type/cavnas'

// Initialize the Liveblocks client with necessary configuration
const client = createClient({
  throttle : 16,
  authEndpoint : "/api/liveblocks-auth",
  
  async resolveMentionSuggestions({ text }) {
    // Replace the placeholder implementation with actual logic
    // const users = await getUsers({ search: text });
    // return users.map((user) => user.id);

    return [];  // Placeholder
  },
  async resolveRoomsInfo({ roomIds }) {
    // Replace the placeholder implementation with actual logic
    // const roomsData = await __fetchRoomsFromDB__(roomIds);
    // return roomsData.map((roomData) => ({
    //   name: roomData.name,
    //   url: roomData.url,
    // }));
    
    return [];  // Placeholder
  },
});

// Define types for Presence, Storage, UserMeta, RoomEvent, and ThreadMetadata

type Presence = {
  cursor: { x: number, y: number } | null,
  selection : string[];
  pencilDrafts : [x : number,y:number,pressure : number][] | null;
  PenColor : Color | null;
};

type Storage = {
    layers : LiveMap<string, LiveObject<Layer>>;
    LayerIds : LiveList<string>;
};

type UserMeta = {
  id?: string,  // Accessible through `user.id`
  info?: {
    name?: string,
    picture?: string
  },
};

type RoomEvent = {
  // type: "NOTIFICATION",
  // ... other events
};

export type ThreadMetadata = {
  // resolved: boolean;
  // quote: string;
  // time: number;
};

// Create Room Context and Liveblocks Context with the client and necessary types
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersListener,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
    useThreadSubscription,
    useMarkThreadAsRead,
    useRoomNotificationSettings,
    useUpdateRoomNotificationSettings,
    // These hooks can be exported from either context
    // useUser,
    // useRoomInfo
  }
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client);

export const {
  suspense: {
    LiveblocksProvider,
    useMarkInboxNotificationAsRead,
    useMarkAllInboxNotificationsAsRead,
    useInboxNotifications,
    useUnreadInboxNotificationsCount,
    // These hooks can be exported from either context
    useUser,
    useRoomInfo,
  }
} = createLiveblocksContext<UserMeta, ThreadMetadata>(client);