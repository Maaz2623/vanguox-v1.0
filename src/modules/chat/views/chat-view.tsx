import { MessagesList } from "@/modules/messages/_components/messages-list";
import { UIMessage } from "ai";

interface Props {
  chatId: string;
  initialMessages: UIMessage[];
}

export const ChatView = ({ chatId, initialMessages }: Props) => {
  return (
    <div className="flex flex-col w-full h-full">
      <MessagesList initialMessages={initialMessages} chatId={chatId} />
    </div>
  );
};
