"use server"

import { db } from "@/db"
import { messagesTabe } from "@/db/schema"
import { google } from "@ai-sdk/google"
import { UIMessage, convertToModelMessages, generateText } from "ai"
import { eq } from "drizzle-orm"



export async function loadChat(id: string) {

    const messages = await db.select().from(messagesTabe).where(eq(messagesTabe.chatId, id))

    if(messages.length === 0) {
        return []
    }

    const formattedMessages = messages.map((msg) => msg.message)

    return formattedMessages
}

export async function updateChatTitle({
  messages,
  chatId,
}: {
  messages: UIMessage[];
  chatId: string;
}) {
  try {
    const result = await generateText({
      model: google.chat("gemini-2.5-flash"),
      messages: convertToModelMessages(messages),
    });

    const title = result.text;

    await fetch("http://localhost:3000/api/updateTitle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId, title }),
    });
  } catch (error) {
    console.log("updateChatTitle error", error);
  }
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