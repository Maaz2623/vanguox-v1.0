import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const createConvexChat = mutation({
    args: {
        userId: v.string()
    },
    handler: async (ctx, {userId}) => {
        const chatId = await ctx.db.insert("chats", {
            title: "Untitled",
            userId: userId
        })

        return chatId
    }
})


export const getChats = query({
    args: {
        userId: v.string()
    },
    handler: async (ctx, {userId}) => {
        const data = await ctx.db.query("chats").withIndex("by_userId", (q) => q.eq("userId", userId)).order("desc").collect()
        return data
    }
})