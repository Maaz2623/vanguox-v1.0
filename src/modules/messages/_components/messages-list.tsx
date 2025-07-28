"use client";
import { SiteHeader } from "@/app/(chat-dashboard)/_components/site-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCard } from "./message-card";
import { UIMessage, useChat } from "@ai-sdk/react";
import { SyncLoader } from "react-spinners";
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

interface Props {
  chatId: string;
  initialMessages: UIMessage[];
}

export const MessagesList = ({ initialMessages, chatId }: Props) => {
  const { messages, status, sendMessage } = useChat({
    id: chatId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const [prompt, setPrompt] = useState("");

  const onSubmit = () => {
    sendMessage({
      text: prompt,
    });
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
      <div className="w-full h-full overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full bg-white z-50">
          <SiteHeader />
        </div>
        <ScrollArea className="w-full h-[555px] ">
          <div className="w-[70%] mx-auto h-full pb-[40vh] pt-20 flex flex-col gap-y-10">
            {stableMessages.map((msg) => (
              <MessageCard
                status={status}
                role={msg.role}
                parts={msg.parts}
                key={msg.id}
              />
            ))}
            {isLastMessageUser && (
              <SyncLoader color="#0000" size={6} margin={2} />
            )}
            {streamingMessage && (
              <div>
                <MessageCard
                  status={status}
                  role={streamingMessage.role}
                  parts={streamingMessage.parts}
                />
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-2 w-3/4 rounded-lg border bg-stone-50 border-neutral-300 mx-auto flex items-center">
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
            {status === "submitted" && <Loader2Icon className="animate-spin" />}
            {status === "streaming" && <SquareIcon className=" fill-white" />}
          </Button>
        </div>
      </div>
    </>
  );
};
