import { db } from "@/db";
import { chatsTable } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";

export const chatsRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({ctx}) => {

        try {
            
            const [newChat] = await db.insert(chatsTable).values({
                userId: ctx.auth.user.id
            }).returning()
            
            return newChat.id
        } catch (error) {
         console.log(error)   
        }
    }),
    getChatsList: protectedProcedure.query(async ({ctx}) => {
        const chats = await db.select({
            id: chatsTable.id,
            title: chatsTable.title
        }).from(chatsTable).where(eq(chatsTable.userId, ctx.auth.user.id))

        return chats
    })
})