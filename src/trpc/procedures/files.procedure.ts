import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { filesTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const filesRouter = createTRPCRouter({
    getFiles: protectedProcedure.query(async ({ctx}) => {
    const files = await db.select().from(filesTable).where(eq(filesTable.userId, ctx.auth.user.id)).orderBy(desc(filesTable.createdAt))

    return files
  })
})