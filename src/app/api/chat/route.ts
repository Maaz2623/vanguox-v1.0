import { UIMessage, appendResponseMessages, smoothStream, streamText } from 'ai';
import {google} from '@ai-sdk/google'
import { saveChat } from '@/actions';

export const runtime = "edge"


export async function POST(req: Request) {

    const {messages, id}: {messages: UIMessage[]; id: string} = await req.json()


    const result = streamText({
        model: google("gemini-2.0-flash"),
        messages: messages,
        experimental_transform: smoothStream({
            chunking: "word",
            delayInMs: 50
        }),
        async onError({error}) {
        console.log(error)
    },
    async onFinish({ response,  }) {

      const lastUserMessage = messages.slice(-1);


       await saveChat({
        chatId: id  ,
        messages: appendResponseMessages({
          messages: lastUserMessage,
          responseMessages: response.messages
        })
      })
    },
    })

    return result.toDataStreamResponse()
}