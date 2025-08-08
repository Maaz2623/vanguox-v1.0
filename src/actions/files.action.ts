"use server"

import { db } from "@/db"
import { filesTable } from "@/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"

export const getFiles = async () => {
    const data = await auth.api.getSession({
        headers: await headers()
    })

    if(!data) {
        throw new Error("Unauthorized")
    }

    const files = await db.select().from(filesTable).where(eq(filesTable.userId, data.user.id))

    return files
}