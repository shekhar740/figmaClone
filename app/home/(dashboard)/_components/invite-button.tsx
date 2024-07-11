
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { OrganizationProfile } from "@clerk/nextjs"

export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger  asChild>
                <Button variant="outline">Invite Memebers</Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
                <OrganizationProfile />
            </DialogContent>
        </Dialog>
    )
}