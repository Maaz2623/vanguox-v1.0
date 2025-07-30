"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCard } from "./message-card";
import { UIMessage, useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowUpIcon,
  Loader2Icon,
  PlusCircleIcon,
  SquareIcon,
} from "lucide-react";
import { useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { DefaultChatTransport } from "ai";
import { useSearchParams } from "next/navigation";
import { ChatViewSiteHeader } from "@/modules/chat/components/chat-view-site-header";

interface Props {
  chatId: string;
  initialMessages: UIMessage[];
}

export const MessagesList = ({ initialMessages, chatId }: Props) => {
  const searchParams = useSearchParams();

  const initialMessage = searchParams.get("message");

  const { messages, status, sendMessage, stop } = useChat({
    id: chatId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const hasSentInitialMessage = useRef(false);

  useEffect(() => {
    if (!initialMessage || hasSentInitialMessage.current) return;

    sendMessage({ text: initialMessage });
    hasSentInitialMessage.current = true;

    // Remove the query param from the URL
    const url = new URL(window.location.href);
    url.searchParams.delete("message");
    window.history.replaceState({}, "", url.toString());
  }, [initialMessage, sendMessage]);

  const [prompt, setPrompt] = useState("");

  const onSubmit = () => {
    if (status === "streaming") {
      stop();
      return;
    }

    if (!prompt.trim()) return; // Avoid sending empty messages

    sendMessage({ text: prompt });
    setPrompt("");
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "user";

  const lastIndex = messages.length - 1;

  console.log("messages-list-rendered");

  const streamingMessage =
    messages[lastIndex]?.role === "assistant" && status === "streaming"
      ? messages[lastIndex]
      : null;

  const stableMessages = streamingMessage ? messages.slice(0, -1) : messages;

  useEffect(() => {
    if (isLastMessageUser) {
      const frame = requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });

      return () => cancelAnimationFrame(frame);
    }

    if (!messages || messages.length === 0) return;
  }, [messages.length, messages, isLastMessageUser]);

  return (
    <>
      <div className="w-full h-full overflow-hidden relative max-w-screen flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-full z-50">
          <ChatViewSiteHeader chatId={chatId} />
        </div>
        <ScrollArea className="w-full h-screen overflow-auto">
          <div className="md:w-[70%] w-[95%] mx-auto h-full pb-[50vh] pt-20 flex flex-col gap-y-10">
            {stableMessages.map((msg) => (
              <MessageCard status={status} message={msg} key={msg.id} />
            ))}
            {streamingMessage && (
              <div>
                <MessageCard status={status} message={streamingMessage} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
        <div className="h-[15vh] bg-gradient-to-b from-transparent to-background w-full flex justify-center items-center">
          <div className="p-2 md:w-3/4 w-[95%]  rounded-lg border border-neutral-300 bg-neutral-200 dark:border-neutral-700 shadow-lg dark:bg-neutral-800 mx-auto flex items-center">
            <Button className="" variant={`ghost`} size={`icon`}>
              <PlusCircleIcon />
            </Button>
            <TextAreaAutoSize
              rows={1}
              maxRows={3}
              autoFocus={true}
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              className="px-3 py-3 resize-none text-sm border-none w-full outline-none"
              placeholder="Ask me anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (e.shiftKey) return; // Allow newline
                  e.preventDefault();
                  if (e.ctrlKey || !e.metaKey) {
                    onSubmit();
                  }
                }
              }}
            />
            <Button
              size={`icon`}
              onClick={onSubmit}
              disabled={status === "submitted"}
            >
              {status === "ready" && <ArrowUpIcon />}
              {status === "submitted" && (
                <Loader2Icon className="animate-spin" />
              )}
              {status === "streaming" && <SquareIcon className=" fill-white" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
