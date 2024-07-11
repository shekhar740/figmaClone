import { Room } from "@/components/room";
import { Canvas } from "../_components/canvas";
import { Loading } from "../_components/canvas-loadint";

interface BoardIdProps {
    params : {
        boardId : string;
    }
}


export default function BoardId({params}: BoardIdProps){
    return (
        <Room roomId={params.boardId} fallback={<Loading /> }> 
            <Canvas boardId={params.boardId} />
        </Room>
    )
}






