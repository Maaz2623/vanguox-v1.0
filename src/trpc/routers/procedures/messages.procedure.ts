import { db } from "@/db";
import { messagesTable } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";
import z from 'zod'

export const messagesRouter = createTRPCRouter({
    getMessages: protectedProcedure.input(z.object({
        chatId: z.string()
    })).query(async ({input}) => {
        const rows = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.chatId, input.chatId))
    .orderBy(messagesTable.createdAt);

  return rows.map((row) => ({
    ...row.message,
    id: row.id
  }))
    })
})