import { error } from "console";
import { action, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
// import { api } from "@/convex/_generated/api"
import { api } from "./_generated/api"
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY, // This is the default and can be omitted
});


export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});
// Create a new task with the given text
export const createTask = mutation({
    args: { text: v.string(), fileId: v.id("_storage") },
    handler: async (ctx, args) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) {
            throw new ConvexError("Not authenticated")
        }
        const newTaskId = await ctx.db.insert("documents", { text: args.text, tokenIdentifier: userId, fileId: args.fileId });
        return newTaskId;
    },
});

export const getDocuments = query({
    async handler(ctx) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) {
            return [];
        }
        return await ctx.db.query("documents")
            .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', userId)).collect();
    }
})

export const viewDocuments = query({
    args: {
        documentID: v.id('documents')
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) {
            return [];
        }
        const document = await ctx.db.get(args.documentID);
        if (document?.tokenIdentifier !== userId) {
            return null;
        }
        if (!document) {
            return null;
        }
        return { ...document, documentUrl: await ctx.storage.getUrl(document.fileId) };
    }
})

// 8123035232

export const askQuestion = action({
    handler: async (ctx, args) => {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-3.5-turbo',
        });
        return chatCompletion
    }
});


// 



// edit specific id
