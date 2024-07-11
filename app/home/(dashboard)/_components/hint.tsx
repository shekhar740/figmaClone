import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export interface HintProps {
    label: string,
    children: React.ReactNode,
    side: "left" | "right" | "top" | "bottom",
    sideOffset: number,
    align: "start" | "end" | "center",
    alignOffset: number,


}


export function Hint({ label, children, side, sideOffset, align, alignOffset }: HintProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <button>{children}</button>
                </TooltipTrigger>
                <TooltipContent side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} className="text-white bg-black border-black ">
                    <p >{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
