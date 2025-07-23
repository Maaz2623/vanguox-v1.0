import { db } from "@/db";
import { chatsTable } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

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
    })
})