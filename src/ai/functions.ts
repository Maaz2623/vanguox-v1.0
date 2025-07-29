"use server"

import { db } from "@/db"
import { messagesTabe } from "@/db/schema"
import { UIMessage } from "ai"
import { eq } from "drizzle-orm"


export async function loadChat(id: string) {

    const messages = await db.select().from(messagesTabe).where(eq(messagesTabe.chatId, id))

    if(messages.length === 0) {
        return []
    }

    const formattedMessages = messages.map((msg) => msg.message)

    return formattedMessages
}


export async function saveChat({
  chatId,
  messages,
}: {
  chatId: string;
  messages: UIMessage[];
}) {
    try {

        
        const newMessages = await db.insert(messagesTabe).values(
            messages.map((msg) => ({
                message: {
                    ...msg,
                    id: msg.id
                },
                chatId: chatId
            }))
        ).returning()

        return newMessages
    } catch (error) {
        console.log(error)
    }
}