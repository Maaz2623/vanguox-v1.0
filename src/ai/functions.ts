"use server";

import { db } from "@/db";
import { messagesTabe } from "@/db/schema";
import { google } from "@ai-sdk/google";
import { UIMessage, convertToModelMessages, generateText } from "ai";
import { ConvexHttpClient } from "convex/browser";
import { eq } from "drizzle-orm";
import { api } from "../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function loadChat(id: string) {
  const messages = await db
    .select()
    .from(messagesTabe)
    .where(eq(messagesTabe.chatId, id));

  if (messages.length === 0) {
    return [];
  }

  const formattedMessages = messages.map((msg) => msg.message);

  return formattedMessages;
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
      system:
        "You are a messages summarizer. You take the prompts and extract the topics efficiently in least possible words. This title will be give for the chat. Do not include markdown, just plain text. Never say no topic and never say anything like varied topics. If multiple topics seperate by commas. Never exceed more than 4 words.",
      messages: convertToModelMessages(messages),
    });

    const title = result.text;

    await convex.mutation(api.chats.updateConvexChatTitle, {
      title: title,
      chatId: chatId,
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
    const newMessages = await db
      .insert(messagesTabe)
      .values(
        messages.map((msg) => ({
          message: {
            ...msg,
            id: msg.id,
          },
          chatId: chatId,
        }))
      )
      .returning();

    return newMessages;
  } catch (error) {
    console.log(error);
  }
}


export async function base64ToFile(base64: string, mimeType: string, filename: string): Promise<File> {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new File([intArray], filename, { type: mimeType });
}
