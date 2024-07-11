
import { Loader } from "lucide-react"
import { InfoSkeleton } from "./info"
import { PartiSkeleton } from "./participants"
import { ToolSkeleoton } from "./toolbar"

export const Loading = () =>{
    return (
        <main className="h-screen w-full relative  touch-none flex items-center justify-center">
                <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
                <InfoSkeleton />
                <PartiSkeleton />
                <ToolSkeleoton />
        </main>
    )
}