'use client'

import { ModeToggle } from "@/components/ui/ModeToggle"
import { Button } from "@/components/ui/button"
import { SignInButton, UserButton } from "@clerk/clerk-react"
import { Authenticated, Unauthenticated,AuthLoading } from "convex/react"

export function HeaderActions() {
    return (
        <>
            {/* <ModeToggle /> */}
            <Unauthenticated>
                <Button variant="destructive">
                    <SignInButton />
                </Button>
            </Unauthenticated>
            <Authenticated>
                <UserButton />
            </Authenticated>
            <AuthLoading>
                Loading....
            </AuthLoading>
        </>
    )
}