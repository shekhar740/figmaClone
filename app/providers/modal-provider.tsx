'use client'

import { RenameModal } from "@/components/modals/rename-modal"
import { useEffect, useState } from "react"

export const ModalProvider = () => {
    const [isMOunted, setIsMOunted] = useState(false)

    useEffect(() => {
        setIsMOunted(true)
    }, [])

    if (!isMOunted) {
        return null;
    }
    return (
        <>
            <RenameModal />
        </>
    )
}