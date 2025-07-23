"use server"

import { db } from "@/db";
import { messagesTable } from "@/db/schema";
import { Message } from "ai";



export async function saveChat({
  chatId,
  messages,
}: {
  chatId: string
  messages: Message[];
}): Promise<void> {
  try {
    // 3. Insert only new messages
    await db.insert(messagesTable).values(
      messages.map((msg) => ({
        message: {
          ...msg,
        },
        chatId: chatId,
      }))
    );
  } catch (error) {
    console.error('Failed to save chat:', error);
  }
}