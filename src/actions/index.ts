"use server"

import { db } from "@/db";
import { chatsTable, messagesTable } from "@/db/schema";
import { Message } from "ai";
import { eq } from "drizzle-orm";



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
        createdAt: msg.createdAt
      }))
    );
  } catch (error) {
    console.error('Failed to save chat:', error);
  }
}


export async function updateChatSummary({
  chatId,
  summary,
}: {
  chatId: string;
  summary: string;
}) {
  await db
    .update(chatsTable)
    .set({ title: summary })
    .where(eq(chatsTable.id, chatId));
}