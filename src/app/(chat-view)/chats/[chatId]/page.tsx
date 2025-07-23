import { ChatView } from "@/modules/chat/views/chat-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { Message } from "ai";
import React from "react";

interface Props {
  params: Promise<{
    chatId: string;
  }>;
}

const ChatIdPage = async ({ params }: Props) => {
  const { chatId } = await params;

  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(
    trpc.messages.getMessages.queryOptions({
      chatId,
    })
  );

  return <ChatView initialMessages={data as Message[]} chatId={chatId} />;
};

export default ChatIdPage;
