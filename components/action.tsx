'use client'

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";
import Link from "next/link";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "./ui/use-toast";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConFirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modals";
interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const ActionsComp = ({ children, side, sideOffset, id, title }: ActionProps) => {
    const {onOpen} = useRenameModal()
    const { mutatue, pending } = useApiMutation(api.board.remove)

    const copyId = () => {
        console.log("copied to ")
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            .then(() => {
                toast({
                    title: "copied to clipboard",
                })
            })
            .catch((err) => {
                toast({
                    title: "failed to copy to clipboard",
                })
            })
    }

    const delettionId = () => {
        mutatue({ id })
            .then(() => toast({
                description: "deleted successfully",
            }))
            .catch((err) => toast({
                description: "failed to delete",
            }))

    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.preventDefault()} side={side} sideOffset={sideOffset} className="w-60">
                <DropdownMenuItem className="cursor-pointer p-3" onClick={copyId}>
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy board link

                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3" onClick={()=>onOpen(id,title)}>
                    <Pencil className="h-4 w-4 mr-2" />
                   Rename

                </DropdownMenuItem>
                <ConFirmModal header="Delete Board?" description="This will delete the boarrd and all of its content" disabled={pending} onConfirm={delettionId}>
                    <Button variant="ghost" className="p-3 cursor-pointer text-sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </ConFirmModal>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}