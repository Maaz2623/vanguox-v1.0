import { google } from "@ai-sdk/google";
import { generateText, tool } from "ai";
import z from "zod";
import { base64ToFile, saveFile } from "./functions";
import { UTApi } from "uploadthing/server";


export const utapi = new UTApi({
  // ...options,
});


export const weatherTool = tool({
      description: 'Get the weather in a location',
      parameters: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      })
    })



export const imageGenerationTool =  tool({
        description: "Generate an image from a prompt using Gemini.",
        parameters: z.object({
            prompt: z.string().describe("The prompt to generate an image for")
        }),
        execute: async ({prompt}) => {
            
            const result = await generateText({
                model: google("gemini-2.0-flash-exp"),
                prompt,
                providerOptions: {
                    google: {
                        responseModalities: ["TEXT", "IMAGE"]
                    }
                },
            })

            
           for (const file of result.files) {
            if(file.mimeType.startsWith('image/')) {

                const readableFile = await base64ToFile(file.base64, file.mimeType, `file-${Date.now()}.png`)

                try {
                    
                    
                    const [uploaded] = await utapi.uploadFiles([readableFile])

                    if(!uploaded.data) return

                    await saveFile({
                        fileUrl: uploaded.data.ufsUrl,
                        mimeType: file.mimeType
                    })

                    return {
                        fileUrl: uploaded.data.ufsUrl,
                        mimeType: file.mimeType,
                    }
                } catch (error) {
                    console.log(error)
                }

            }
        }
        }
          })
