"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import { MessageCard } from "./message-card";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SyncLoader } from "react-spinners";

interface Props {
  chatId: string;
}

export const MessagesList = ({ chatId }: Props) => {
  const { messages, handleInputChange, handleSubmit, status } = useChat({
    id: chatId,
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("message");
  const imageUrl = searchParams.get("imageUrl");
  const filesParam = searchParams.get("files"); // assume this is a public file URL

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "user";

  const lastIndex = messages.length - 1;

  const streamingMessage =
    messages[lastIndex]?.role === "assistant" && status === "streaming"
      ? messages[lastIndex]
      : null;

  const stableMessages = streamingMessage ? messages.slice(0, -1) : messages;

  useEffect(() => {
    async function fetchAndSubmit() {
      let fileList: FileList | undefined;

      if (filesParam) {
        try {
          const response = await fetch(filesParam);
          const blob = await response.blob();
          const filename = filesParam.split("/").pop() || "file";
          const file = new File([blob], filename, { type: blob.type });

          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileList = dataTransfer.files;
        } catch (error) {
          console.error("Failed to fetch file from URL:", error);
        }
      }

      if (initialMessage) {
        handleInputChange({
          target: { value: initialMessage },
        } as React.ChangeEvent<HTMLTextAreaElement>);

        handleSubmit(undefined, {
          experimental_attachments: fileList,
          data: imageUrl ? { imageUrl } : undefined,
        });

        const url = new URL(window.location.href);
        url.searchParams.delete("message");
        url.searchParams.delete("imageUrl");
        url.searchParams.delete("files");
        window.history.replaceState({}, "", url.toString());
      }
    }

    // only run when message is present
    if (initialMessage) {
      fetchAndSubmit();
    }
  }, [initialMessage, imageUrl, filesParam, handleInputChange, handleSubmit]);

  useEffect(() => {
    if (isLastMessageUser || status === "submitted") {
      const frame = requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });

      return () => cancelAnimationFrame(frame);
    }

    if (!messages || messages.length === 0) return;

    if (status === "streaming") {
      return;
    }
  }, [messages.length, messages, status, isLastMessageUser]); // only when a new message is added

  return (
    <ScrollArea className="h-full relative">
      <div className="h-8 bg-gradient-to-t from-transparent to-white absolute top-0 left-0 w-full z-10" />

      {/* <div className="h-8 bg-gradient-to-b from-transparent to-white absolute bottom-0 left-0 w-full z-10" /> */}
      <div className="w-3/4 px-2 mx-auto flex flex-col gap-y-14 pb-[20%] pt-10">
        {stableMessages.map((message) => (
          <MessageCard
            status={status}
            messageId={message.id}
            key={message.id}
            role={message.role}
            parts={message.parts}
          />
        ))}
        {status === "submitted" && (
          <div className="flex items-center justify-center size-10 m-2">
            <SyncLoader className="" size={6} color="#ffff" margin={2} />
          </div>
        )}
        {streamingMessage && (
          <div>
            <MessageCard
              messageId={streamingMessage.id}
              status={status}
              role={streamingMessage.role}
              parts={streamingMessage.parts}
              key={streamingMessage.id}
            />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};
