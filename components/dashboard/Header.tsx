'use client'
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { HeaderActions } from "../components/dashboard/header-actions";

export function Header() {
    return (
        <div className="bg-slate-900 py-4">
            <div className="container mx-auto flex items-center justify-between ">
                <div>
                    <h1 className="text-white text-2xl">Second Brain</h1>
                </div>
                <div className="flex gap-8 items-center">
                    <HeaderActions />
                </div>
            </div>
        </div>
    )

}