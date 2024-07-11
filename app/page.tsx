'use client'

import { ModeToggle } from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { Content } from "next/font/google";
import { DocumentCard } from "../components/dashboard/document-card";
import { DialogDemo } from "@/components/dashboard/upload-dialog";
export default function Home() {
  const getDocuments = useQuery(api.documents.getDocuments)
  console.log(getDocuments)
  return (
    <>
      <div className="flex justify-between my-4">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <DialogDemo />
      </div>
      <div className="grid grid-cols-4  gap-4">
        {getDocuments?.map(doc => <DocumentCard document={doc} />)}
      </div>
    </>
  );
}
