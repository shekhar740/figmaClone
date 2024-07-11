'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { LayoutDashboard, Star } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function OrgSideBar() {
    const searcParasm = useSearchParams()
    const favourites = searcParasm.get("favourites")
    return (
        <div className="hidden lg:flex flex-col space-y-6 lg:w-[206px] pl-5 pt-5">
            <Link href="/">
                <div className="flex items-center space-x-2">
                    <h1 className={cn(
                        "font-semibold text-2xl",
                    )}>Board App</h1>
                </div>
            </Link>
            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #EAEAEA",
                            justifyContent: "space-between",
                            backgroundColor: "#F5F5F5",
                        }
                    }
                }}
            />
            <div className="space-y-1 w-full">
                <Link href="/home">
                    <Button variant={favourites ? "ghost" : "secondary"} size="lg" className="font-normal justify-start px-2 w-full">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Team Boards
                    </Button>
                </Link>
                <Link href={{
                    pathname: "/home/",
                    query: { favourites: true }
                }}>
                    <Button variant={favourites ? "secondary" : "ghost"} size="lg" className="font-normal justify-start px-2 w-full">
                        <Star className="h-4 w-4 mr-2" />
                        Favourite Board
                    </Button>
                </Link>
            </div>
        </div>
    )
}
