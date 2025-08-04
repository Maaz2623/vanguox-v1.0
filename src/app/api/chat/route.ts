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

  const latestUserMessage = messages[messages.length - 1];

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
        const assistantMessage = updatedMessages[updatedMessages.length - 1];


        if(messages.length < 2) {
          updateChatTitle({
            chatId: id,
            messages,
          });
        }

        await saveChat({
          chatId: id,
          messages: [latestUserMessage, assistantMessage],
        });
      },
    });
  } catch (error) {
    console.log(error);
  }
}
