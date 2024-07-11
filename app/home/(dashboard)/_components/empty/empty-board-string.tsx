'use client'

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useOrganization } from '@clerk/nextjs'
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
export interface EmptyBoardStringProps {
    lable?: string;
    description?: string;
    image: string,
    button?: string,
}

export default function EmptyBoardString(props: EmptyBoardStringProps) {
    const [newID, setNewId] = useState("")
    const create = useMutation(api.boards.create);
    const { organization } = useOrganization();
    const { toast } = useToast();
    const { mutatue, pending } = useApiMutation(api.boards.create);
    const onCLick = async () => {
        if (!organization) return console.log("here is no orgainizations")
        mutatue({
            orgId: organization.id,
            title: "text title"
        })
            .then((id) => {
                toast({
                    description: "Board created successfull"
                });
                setNewId(id)
            })
            .catch((error) => toast({
                description: error.message
            }))

    }

    return <div className="grid place-content-center mt-auto">
        <div className="flex flex-col items-center gap-4">
            <Image src={props.image} alt={props.lable as string} />
            <p className="text-center font-bold text-4xl">{props.lable as string} !</p>
            <p className="text-muted-foreground text-xl"> {props.description as string}</p>
            {props.button && <Button onClick={onCLick} disabled={pending} className="">{pending && <Loader2 />} {props.button as string}</Button>}
        </div>
    </div>
}

