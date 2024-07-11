import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FormUpload } from "./upload-document-form";
import { useState } from "react";
import { CloudUpload, Upload, UploadCloudIcon } from "lucide-react";

export function DialogDemo() {
    const [isOpen,setIsOpen] = useState(false)
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-4 items-center"  variant="outline"> <Upload /> Upload Documents</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a Document</DialogTitle>
          <DialogDescription>
           Upload a team document for you to search over in the feature
          </DialogDescription>
        </DialogHeader>
       <FormUpload  onUpload={()=>setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
