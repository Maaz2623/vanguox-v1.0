import { google } from "@ai-sdk/google";
import { tool, generateText, Tool, ToolCallUnion, ToolResultUnion } from "ai";
import { UTApi } from "uploadthing/server";
import z from "zod";
import { base64ToFile } from "./functions";


export const utapi = new UTApi({
  // ...options,
});

export const myToolSet = {
    generateImage: tool({
        description: "Use this tool to generate an image when the user explicitly asks for an image, picture, or visual content. Generate the image and describe it in a about 4 lines. Do not return the url of the generated image.",    inputSchema: z.object({
        prompt: z.string().describe('The prompt to generate the image from.')
    }),
    execute: async ({prompt}) => {
        try {
            
            const result = await generateText({
            model: google('gemini-2.0-flash-exp'),
            providerOptions: {
                google: { responseModalities: ['IMAGE', 'TEXT'] },
            },
            prompt: prompt,
            });


           for (const file of result.files) {
                if (file.mediaType.startsWith('image/')) {
                    const readableFile = await base64ToFile(file.base64, file.mediaType, `file-${Date.now()}.png`)                    // The file object provides multiple data formats:
                    const [uploaded] = await utapi.uploadFiles([readableFile])
                    if(!uploaded.data) {
                        throw new Error("Something went wrong")
                    }

                    return {
                        url: uploaded.data.ufsUrl,
                        base64: file.base64,
                        mediaType: file.mediaType
                    }

                }
            }
        } catch (error) {
            console.log(error)
        }
    }
})
}


export type MyToolCall = ToolCallUnion<typeof myToolSet>;
export type MyToolResult = ToolResultUnion<typeof myToolSet>;
