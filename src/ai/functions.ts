"use server"
import { db } from "@/db";
import { filesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export async function base64ToFile(base64: string, mimeType: string, filename: string): Promise<File> {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new File([intArray], filename, { type: mimeType });
}


export async function saveFile({
  mimeType,
  fileUrl
}: {
  fileUrl: string;
  mimeType: string;
}) {
  try {
     const data = await auth.api.getSession({
        headers: await headers()
    })

    if(!data) {
        throw new Error('Unauthorized')
    }

    await db.insert(filesTable).values({
      userId: data.user.id,
      mimeType,
      fileUrl
    })
  } catch (error) {
    console.log(error)
  }
}