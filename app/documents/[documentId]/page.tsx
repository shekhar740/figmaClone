'use client'

import { ChatComp } from "@/components/dashboard/chat-comp"
import { TextView } from "@/components/dashboard/text-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { useQuery } from "convex/react"
import { Delete, File, Notebook, Search, Trash } from "lucide-react"
import { useState } from "react"


export default function DocumentView({ params }: { params: { documentId: Id<'documents'> } }) {
    const [selectedTab, setSelectedTab] = useState('document')
    const getDoucments = useQuery(api.documents.viewDocuments, {
        documentID: params.documentId
    })
    if (!getDoucments) {
        return <div>You were not accissible</div>
    }
    const triggeredItem = ["document", "chat"]
    return (
        <div>
            <div className="flex  gap-8 p-8">
                {/* sideBar */}
                <div className="border-r-2 h-[100vh]">
                    <Button className="bg-transparent text-white flex gap-3 text-xl font-thin font-sans hover:bg-slate-600"><Search className="w-4" />  Search</Button>
                    <Button className="bg-transparent text-white flex gap-3 text-xl font-thin font-sans hover:bg-slate-600 "><File className="w-4" />  Documents</Button>
                    <Button className="bg-transparent text-white flex gap-3 text-xl font-thin font-sans  hover:bg-slate-600 "><Notebook className="w-4" />  Notes</Button>
                </div>
                <div className="flex flex-col gap-8 w-full">
                    <div className="flex justify-between w-full">
                        <h1 className="text-3xl font-semibold font-sans">{getDoucments && getDoucments?.text}</h1>
                        <Button variant="destructive" className="flex gap-3"><Trash />  Delete</Button>
                    </div>

                    <Tabs defaultValue="document" className="w-full">
                        <TabsList className="mb-2  bg-slate-800 w-fit flex gap-5 p-1 rounded-md">
                            {triggeredItem.map((tab) => (
                                <TabsTrigger
                                onClick={(e)=>setSelectedTab(tab)}
                                    key={tab}
                                    value={tab}
                                    className={`p-1 px-3  transition-all duration-700 ease-in-out rounded-md ${selectedTab === tab ? 'bg-slate-900' : ''}`}
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList >
                        <TabsContent value="document">
                            <TextView url={getDoucments?.documentUrl} />
                        </TabsContent>
                        <TabsContent value="chat">
                           <ChatComp documentId={getDoucments?.fileId}  />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div >
    )
}