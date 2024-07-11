'use client'
import { LoaderIcon } from "lucide-react"
import { Button } from "../ui/button"

export const LoadingButton = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <Button>
            {isLoading && <LoaderIcon className="animate-spin" />}
            {isLoading ? "...uploading" : "upload"}
        </Button>
    )
}
