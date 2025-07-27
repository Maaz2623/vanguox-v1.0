"use client";
import { SiteHeader } from "@/app/(chat-dashboard)/_components/site-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCard } from "./message-card";
import { useChat } from "@ai-sdk/react";

interface Props {
  chatId: string;
  messages: ReturnType<typeof useChat>["messages"];
  status: ReturnType<typeof useChat>["status"];
}

export const MessagesList = ({ messages, status }: Props) => {
  return (
    <>
      <div className="w-full h-full overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full bg-white z-50">
          <SiteHeader />
        </div>
        {status === "streaming" && <div>loading...</div>}
        <ScrollArea className="w-full h-[555px] pt-20">
          <div className="w-[70%] mx-auto h-full pb-[40vh] flex flex-col gap-y-10">
            {messages.map((msg) => (
              <MessageCard role={msg.role} parts={msg.parts} key={msg.id} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};
