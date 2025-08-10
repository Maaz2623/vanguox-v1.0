import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { filesTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import z from "zod";

export const filesRouter = createTRPCRouter({
    getFiles: protectedProcedure.query(async ({ctx}) => {
    const files = await db.select().from(filesTable).where(eq(filesTable.userId, ctx.auth.user.id)).orderBy(desc(filesTable.createdAt))

    return files
    }),
    getFile: protectedProcedure.input(z.object({
      fileUrl: z.string()
    })).query(async ({input}) => {
      const [file] = await db.select().from(filesTable).where(eq(filesTable.url, input.fileUrl))

      return file
    })
},
)