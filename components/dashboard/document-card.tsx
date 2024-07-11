import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { Eye } from "lucide-react";
import Link from "next/link";

export function DocumentCard({ document }: { document: Doc<"documents"> }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm">{document.text}</CardTitle>
                <CardDescription>{document.fileId}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <Button asChild variant="secondary"><Link className="flex gap-2 items-center" href={`/documents/${document._id}`}>
                    <Eye className="w-4 h-4" /> View
                </Link></Button>
            </CardFooter>
        </Card>

    )
}