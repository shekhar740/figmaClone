import Image from "next/image";
import Link from "next/link";
import result from '../../../../../public/result.svg';
import { formatDistanceToNow } from 'date-fns';
import { Footer } from "./footer-com";
import { OverLay } from "./overlay";
import { useAuth } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionsComp } from "@/components/action";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "@/components/ui/use-toast";



interface BoardCardProps {
    idNumber: string;
    key: string;
    title: string;
    imagurl: string;
    autorId: string;
    createdAt: string;
    orgId: string;
    isFavourite: boolean;
    authorName: string;
}

export function BoardCard({ idNumber, key, title, imagurl, autorId, createdAt, orgId, isFavourite, authorName }: BoardCardProps) {
    const { userId } = useAuth();

    const authorLabel = userId === autorId ? "you" : authorName;
    const createdAtLabel = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    const { mutatue: onFavourite, pending: pendingFavourite } = useApiMutation(api.board.favourite)
    const { mutatue: onUnFavourite, pending: pendingUnFavourite } = useApiMutation(api.board.unfavourite);


    const toggleFavorutie = () => {
        console.log("favorute clicked")
        if (isFavourite) {
            onUnFavourite({ id: idNumber })
            .catch((()=>toast({
                description : "failed to unfavourite"
            })))
        } else {
            onFavourite({ id: idNumber, orgId: orgId })
            .catch((()=>toast({
                description : "failed to favourite"
            })))
        }
    }


    return (
        <div className="border rounded-lg overflow-hidden">
            <Link href={`/board/${idNumber}`}>
                <div className="group relative flex flex-col justify-between h-full p-2">
                    <div className="relative flex-1 bg-amber-50 h-full">
                        <Image src={imagurl} alt={title} width={400} height={400} className="w-full" />
                        <OverLay />
                        <ActionsComp id={idNumber} title={title} side="right">
                            <button className="text-black absolute z-50 top-1 right-1 text-5xl">
                                <MoreHorizontal className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>

                        </ActionsComp>
                    </div>
                    <Footer disabled={pendingFavourite || pendingUnFavourite} isFavourite={isFavourite} title={title} authorLabel={authorLabel} createdAtLabel={createdAtLabel} onClick={toggleFavorutie} />
                </div>
            </Link>
        </div>
    );
}


BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127]  rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    )

}
