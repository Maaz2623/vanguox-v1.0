import { streamText, UIMessage, convertToModelMessages, smoothStream } from 'ai';
import { google } from '@ai-sdk/google'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    
    const result = streamText({
      model: google("gemini-2.0-flash"),
      messages: convertToModelMessages(messages),
      experimental_transform: smoothStream({
        chunking: "word",
        delayInMs: 50
      })
    });
    
    
    console.log(result.text)
    
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log(error)
  }
}