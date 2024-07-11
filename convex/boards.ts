import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images  = [
    "/placeholder/one.svg",
    "/placeholder/1.svg",
    "/placeholder/2.svg",
    "/placeholder/3.svg",
    "/placeholder/4.svg",
    "/placeholder/5.svg",
    "/placeholder/6.svg",
    "/placeholder/7.svg",
    "/placeholder/8.svg",
    "/placeholder/9.svg",

]

export const create = mutation({
    args : {
        orgId : v.string(),
        title : v.string(),
    },
    handler : async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        if(!identity){
            throw new Error("Unauthorized");
        }

        console.log({
            title : args.title,
            orgId : args.orgId,
            authorId : identity.subject,
            authorName : identity?.name as string || "Anonymous",
            imageUrl : images[randomNumber],
        })
        const board = await ctx.db.insert("boards",{
            title : args.title,
            orgId : args.orgId,
            authorId : identity.subject,
            authorName : identity?.name as string || "Anonymous",
            imageUrl : images[randomNumber],
        })
        return board;
    }
})