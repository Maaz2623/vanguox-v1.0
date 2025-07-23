import { smoothStream, streamText } from 'ai';
import {google} from '@ai-sdk/google'

export async function POST(req: Request) {
    const {messages} = await req.json()

    const result = await streamText({
        model: google("gemini-2.0-flash"),
        messages,
        experimental_transform: smoothStream({
            chunking: "word",
            delayInMs: 50
        })
    })

    console.log(result)


    return result.toDataStreamResponse()
}