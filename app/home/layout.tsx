import { Navbar } from "./(dashboard)/_components/navbar";
import { OrgSideBar } from "./(dashboard)/_components/org-sidebar";
import { SideBar } from "./(dashboard)/_components/sidebar/sidebar";
import { Toaster } from "@/components/ui/toaster"

export default function Home({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main>
            <SideBar />
            <div className="pl-14 h-full">
                <div className="flex gap-x-3 h-full">
                    <OrgSideBar />
                    <div className="h-full flex-1">
                        <Navbar />
                        <Toaster />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}