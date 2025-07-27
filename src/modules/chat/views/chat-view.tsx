"use client";
import { MessageForm } from "@/modules/messages/_components/message-form";
import { MessagesList } from "@/modules/messages/_components/messages-list";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

interface Props {
  chatId: string;
}

export const ChatView = ({ chatId }: Props) => {
  const { messages, status, sendMessage } = useChat({
    id: chatId,
    transport: new DefaultChatTransport({
      api: `/api/chat`,
    }),
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 overflow-hidden">
        <MessagesList status={status} messages={messages} chatId={chatId} />
      </div>

      <div className="shrink-0 pb-7">
        <MessageForm
          status={status}
          sendMessage={sendMessage}
          chatId={chatId}
        />
      </div>
    </div>
  );
};
