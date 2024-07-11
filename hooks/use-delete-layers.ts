
// hooks/use-delete-layers.ts
import { useMutation, useSelf } from "@/liveblocks.config";

export const useDeleteLayers = () => {
    const selection = useSelf((me) => me.presence.selection);
    
    return useMutation(({ storage, setMyPresence }) => {
        const livelayers = storage.get('layers');
        const livelayersIds = storage.get("LayerIds");
        for (const id of selection) {
            console.log(id)
            livelayers.delete(id);
            const index = livelayersIds.indexOf(id);
            if (index !== -1) {
                livelayersIds.delete(index, 1); // Correct method to delete from LiveList
            }
        }

        setMyPresence({ selection: [] }, { addToHistory: true });
    }, [selection]);
};
