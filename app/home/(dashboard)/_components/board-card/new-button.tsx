'use client';

import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from 'next/navigation';
interface NewBoardButtonProps {
    id: string;
    disabled?: boolean;
}

export function NewBoardButton({ id, disabled = false }: NewBoardButtonProps) {
        const router = useRouter();
    const { mutatue, pending } = useApiMutation(api.boards.create); // Corrected 'mutatue' to 'mutate'

    const handleClick = () => {
        mutatue({
            orgId: id,
            title: "Untitled"
        })
            .then((id) => {
                router.push(`/board/${id}`)
                toast({
                    description: "Board created successfully"
                })
            })
            .catch((err) => {
                toast({
                    description: `Error creating board: ${err.message}`
                })
            })
    };

    return (
        <div className="w-full h-full">
            <button
                disabled={pending || disabled}
                onClick={handleClick}
                className={cn(
                    "w-full h-full bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                    { "opacity-75 cursor-not-allowed": pending || disabled }
                )}
            >
                <Plus className="h-12 w-12 text-white stroke-1" />
                <p className="text-sm text-white font-light">New Button</p>
            </button>
        </div>
    );
}
