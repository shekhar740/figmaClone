'use client'

import { CreateOrganization } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { Hint } from "../hint"

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger >
                <Hint label="Create Organization" side="right" align="start" sideOffset={18}>
                    <button className="bg-white/25 p-2 w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100">
                        <Plus className="text-white" />
                    </button>
                </Hint>
            </DialogTrigger>
            <DialogContent className="">
                <CreateOrganization
                    afterCreateOrganizationUrl="/home"
                    skipInvitationScreen={false}
                />
            </DialogContent>
        </Dialog>
    )
}
