import { mutation } from "./_generated/server";


export const createConvexChat = mutation({
    args: {},
    handler: async (ctx) => {
        const chatId = await ctx.db.insert("chats", {
            title: "Untitled"
        })

        return chatId
    }
})