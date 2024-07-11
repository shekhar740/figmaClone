import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {getAllOrThrow} from 'convex-helpers/server/relationships'

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favourite: v.optional(v.boolean()) // Changed to boolean for the favourite argument
    },
    
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        let boards = [];

        if (args.favourite) {
            // If fetching favorite boards
            const favouriteBoards = await ctx.db.query("useFavourite")
                .withIndex("by_user_org", (q) =>
                    q.eq("userId", identity.subject)
                        .eq("orgId", args.orgId))
                .order("desc")
                .collect();

            const ids = favouriteBoards.map((b) => b.boardId);
            boards = await getAllOrThrow(ctx.db, ids);

            if (args.search) {
                boards = boards.filter(board => board.title.includes(args.search as string));
            }

            boards = boards.map(board => ({
                ...board,
                isFavourite: true
            }));

            return boards;
        }

        const title = args.search ? args.search : "";

        if (title) {
            boards = await ctx.db.query("boards")
                .withSearchIndex("search_title", (q) =>
                    q.search("title", title)
                        .eq("orgId", args.orgId))
                .collect();
        } else {
            boards = await ctx.db.query("boards")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
                .order("desc")
                .collect();
        }

        const boardsWithFavouritesRelation = boards.map(async (board) => {
            const favourite = await ctx.db.query("useFavourite")
                .withIndex("by_user_board", (q) =>
                    q.eq("userId", identity.subject)
                        .eq("boardId", board._id))
                .unique();
            return {
                ...board,
                isFavourite: !!favourite,
            };
        });

        const boardsWithFavouriteBoolean = await Promise.all(boardsWithFavouritesRelation);
        return boardsWithFavouriteBoolean;
    },
});

export const remove = mutation({
    args: {
        id: v.id("boards"), // Validate that the id is of the correct type
    },
    handler: async (ctx, args) => {
        // Get the user identity from the context
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        // Check if the board is a favorite of the current user
        const existingFavorite = await ctx.db.query("useFavourite")
            .withIndex("by_user_board", (q) =>
                q.eq("userId", userId)
                    .eq("boardId", args.id))
            .unique();

        // If the board is a favorite, delete the favorite entry
        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id);
        }

        // Delete the board itself
        try {
            await ctx.db.delete(args.id);
        } catch (error) {
            console.error('Error deleting the item:', error);
            throw new Error('Failed to delete the item');
        }
    }
});

export const updateTitle = mutation({
    args: {
        id: v.id("boards"), // Validate that the id is of the correct type
        title: v.string() // Validate the title as a non-empty string with a maximum length
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        const title = args.title.trim();

        if (!title) {
            throw new Error("Title is required")
        }
        if (title.length > 60) {
            throw new Error("Title cannot be longer thatn 60 character")
        }
        const board = await ctx.db.patch(args.id, {
            title: args.title
        })
        return board;
    }
});

export const favourite = mutation({
    args: { id: v.id("boards"), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existingFavourite = await ctx.db.query("useFavourite")
            .withIndex("by_user_board_org", (q) =>
                q.eq("userId", userId)
                    .eq("boardId", board._id)
                    .eq("orgId", args.orgId)
            )
            .unique();

        if (existingFavourite) {
            throw new Error("Already in favourite");
        }

        await ctx.db.insert("useFavourite", {
            userId: userId,
            boardId: board._id,
            orgId: args.orgId
        })

        return board;
    },
});

export const unfavourite = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existingFavourite = await ctx.db.query("useFavourite")
            .withIndex("by_user_board_org", (q) =>
                q.eq("userId", userId)
                    .eq("boardId", board._id)
                // Todo : check if orgi needed
            )
            .unique();

        if (!existingFavourite) {
            throw new Error("Favourite board not found");
        }

        await ctx.db.delete(existingFavourite._id);
        return board;
    },
});



export const getAno = query({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const board = ctx.db.get(args.id)
        return board
    }
});


// Explanation : 
// We define three function fetchuserData, fetcPostData , and fetchCOmment data each returing a promise that resolves after delta y o simulate fetcing data from an api.

// in fetchData we user Promise all to execute all three functions concurrently.
// promise.alll takes an array of promises and returns a single promise that resolves when all promises in the array have resolved
// we wait ther ersult of Promise.all to get an array of resolved values 
// finaly we log ther retrieved data to the console

// promise.all is useful when you need to execute multiple asynchronous operations concurrently and wait for all of them to complete before proceedoing. it allows for efficient parallel execution of independant tasks and simplifies handling of multiple asynchronous results.



