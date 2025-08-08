import {
  streamText,
  UIMessage,
  convertToModelMessages,
  smoothStream,
  createIdGenerator,
} from "ai";
import { google } from "@ai-sdk/google";
import { saveChat, updateChatTitle } from "@/ai/functions";
import { myToolSet } from "@/ai/tools";
import { systemPrompt } from "@/prompt";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


export async function POST(req: Request) {
  const { messages, id }: { messages: UIMessage[]; id: string } =
    await req.json();


  try {
    const result = streamText({
      model: google("gemini-2.0-flash"),
      messages: convertToModelMessages(messages),
      experimental_transform: smoothStream({
        chunking: "word",
        delayInMs: 50,
      }),
      system: systemPrompt,
      tools: myToolSet,
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      generateMessageId: createIdGenerator({
        prefix: "msg",
        size: 16,
      }),
      onFinish: async ({ messages: updatedMessages }) => {

  if (messages.length < 2) {
    updateChatTitle({
      chatId: id,
      messages,
    });
  }

  const reversed = [...updatedMessages].reverse();

  const assistantMessage = reversed.find(
    (m) =>
      m.role === "assistant" &&
      m.parts.some((p) => p.type === "text") &&
      m.parts.every((p) => p.type !== "tool-generateImage" || p.output !== undefined)
  );

  if (!assistantMessage) return;

  // Now find the user message that came before this assistant message
  const assistantIndex = updatedMessages.findIndex(
    (m) => m.id === assistantMessage.id
  );

  const userMessage = updatedMessages
    .slice(0, assistantIndex)
    .reverse()
    .find((m) => m.role === "user");

  if (!userMessage) return;

  await saveChat({
    chatId: id,
    messages: [userMessage, assistantMessage],
  });
}

    });
  } catch (error) {
    console.log(error);
  }
}
