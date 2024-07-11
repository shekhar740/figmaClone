'use client'

import { Hint } from "@/app/home/(dashboard)/_components/hint"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface ToolButtonProps {
    label: string,
    icon: LucideIcon,
    onclick: () => void,
    isActive?: boolean,
    isDisabled?: boolean,
}


export const ToolButton = ({ label, icon: Icon, onclick, isActive, isDisabled }: ToolButtonProps) => {
    return (
        <Hint label={label} side="right" sideOffset={14} >
            <Button disabled={isDisabled} onClick={onclick} size="icon" variant={isActive ? "boardActive" : "board"} className="">
                <Icon />
            </Button>
        </Hint>
    )
}


// in the tool button we create conditon and sending props thorugh compmonent and 
// set here isActive true to set true