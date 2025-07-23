import { MessageForm } from "@/modules/messages/components/message-form";
import { MessagesList } from "@/modules/messages/components/messages-list";
import { Message } from "ai";

interface Props {
  chatId: string;
  initialMessages: Message[];
}

export const ChatView = ({ chatId, initialMessages }: Props) => {
  return (
    <div className="flex flex-col w-full h-screen pt-10">
      {/* Messages area should grow to fill available height */}
      <div className="flex-1 overflow-hidden">
        <MessagesList initialMessages={initialMessages} chatId={chatId} />
      </div>

      {/* Message input form stays at bottom */}
      <div className="shrink-0 mb-4">
        <MessageForm initialMessages={initialMessages} chatId={chatId} />
      </div>
    </div>
  );
};
