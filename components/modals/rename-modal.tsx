'use client'

import { useRenameModal } from "@/store/use-rename-modals"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogClose, DialogFooter, DialogTitle } from "../ui/dialog"
import { ReactNode, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { remove } from "@/convex/board";
import { toast } from "../ui/use-toast";


export const RenameModal = () => {
    const { isOpen, onClose, initialValues } = useRenameModal();
    const [title, setTitle] = useState(initialValues.title)
    const { mutatue, pending } = useApiMutation(api.board.updateTitle)


    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("this is a rename patch",title)
        mutatue({ id: initialValues.id, title: title })
            .then(() => {
                toast({
                    description: "successfully updated name"
                }); onClose()
            })
            .catch((e) => toast({
                description: e.message
            }))

    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Board Title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form onSubmit={submit} className="space-y-4">
                    <Input disabled={pending} required maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Board Title" />
                    <DialogFooter className="" >
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="secondary" disabled={pending} type="submit" >
                            Save
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )

}