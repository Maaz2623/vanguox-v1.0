import {
  CoreMessage,
  UIMessage,
  appendResponseMessages,
  generateText,
  smoothStream,
  streamText,
} from "ai";
import { google } from "@ai-sdk/google";
import { saveChat, updateChatSummary } from "@/actions";
import { SYSTEM_PROMPT } from "@/prompt";
import { imageGenerationTool, weatherTool } from "@/ai/tools";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, id }: { messages: UIMessage[]; id: string } =
    await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: messages,
    tools: {
      weather: weatherTool,
      imageGenerator: imageGenerationTool,
    },
    experimental_transform: smoothStream({
      chunking: "word",
      delayInMs: 50,
    }),
    system: SYSTEM_PROMPT,
    async onError({ error }) {
      console.log(error);
    },
    async onFinish({ response }) {
      const lastUserMessage = messages.slice(-1);

      await saveChat({
        chatId: id,
        messages: appendResponseMessages({
          messages: lastUserMessage,
          responseMessages: response.messages,
        }),
      });

      const summaryPrompt = [
        {
          role: "user",
          content: `Summarize this conversation's topics in 1 or 2 word max:\n\n${messages
            .filter((m) => m.role === "user")
            .map((m) => m.content)
            .join("\n")}. Give plain text, no markdown, no styling.`,
        },
      ];

      const summaryResult = await generateText({
        model: google("gemini-2.0-flash"), // or use the same model
        messages: summaryPrompt as CoreMessage[],
      });

      const summary = summaryResult.text;

      // Save summary to chat
      await updateChatSummary({
        chatId: id,
        summary,
      });
    },
  });

  return result.toDataStreamResponse();
}
