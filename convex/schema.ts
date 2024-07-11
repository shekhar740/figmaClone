import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        text: v.string(),
        tokenIdentifier: v.string(),
        fileId: v.id("_storage"),
    }).index("by_tokenIdentifier", ["tokenIdentifier"]),

    boards: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string(),
    })
        .index("by_org", ["orgId"])
        .searchIndex("search_title", {
            searchField: "title",
            filterFields: ["orgId"],
        }),

    useFavourite: defineTable({
        userId: v.string(),
        orgId: v.string(),
        boardId: v.id("boards")

    })
        .index("by_board", ["boardId"])
        .index("by_user_org", ["userId","orgId"])
        .index("by_user_board",["userId","boardId"])
        .index("by_user_board_org",["userId","boardId","orgId"])
        
});
