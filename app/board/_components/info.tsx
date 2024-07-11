'use client'

import { Hint } from "@/app/home/(dashboard)/_components/hint";
import { ActionsComp } from "@/components/action";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modals";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import Link from "next/link";

interface InfoProps {
    boardId: string,
}

export const TablSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5" >
            Hel
        </div>
    )
}


export const Info = ({ boardId }: InfoProps) => {
    const { onOpen } = useRenameModal()
    const data = useQuery(api.board.getAno, { id: boardId as Id<"boards">, })
    if (!data) {
        return <InfoSkeleton />
    }


    return (
        <div className="absolute left-2 top-2 font-medium rounded-md px-1.5 h-14 flex items-center shadow-md cursor-pointer ">
            <Hint label="home" >
                <Button asChild variant="outline" className="text-blue-700 font-bold"   >
                    <Link href="/home" >
                        S <strong className="text-green-700">Figma</strong>
                    </Link>
                </Button>
            </Hint>
            <Hint label="Rename Board">
                <div className="text-white">
                    boardName : <Button variant="board" onClick={() => onOpen(data?._id, data?.title)}>{data.title}</Button>
                </div>
            </Hint>

            <ActionsComp id={data?._id} title={data?.title} side="bottom" sideOffset={10}>
                <div>
                    <Hint label="Main menu">
                        <Button variant="link">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </ActionsComp>


        </div>
    );
};


export const InfoSkeleton = () => {
    return (
        <div className="absolute left-2 top-2 font-medium bg-white rounded-md px-1.5 h-14 flex items-center shadow-md w-[300px]" />
    );
};
