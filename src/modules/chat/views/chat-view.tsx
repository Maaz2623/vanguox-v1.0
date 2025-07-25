import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MessageForm } from "@/modules/messages/components/message-form";
import { MessagesList } from "@/modules/messages/components/messages-list";
import { Message } from "ai";
import { MessageCirclePlusIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  chatId: string;
  initialMessages: Message[];
}

export const ChatView = ({ chatId, initialMessages }: Props) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="h-10 flex items-center px-2 md:px-4 border-b border-neutral-100 justify-between">
        <SidebarTrigger className="" />
        <Button
          asChild
          className="size-7 md:hidden"
          variant={`ghost`}
          size={`icon`}
        >
          <Link href={`/`}>
            <MessageCirclePlusIcon />
          </Link>
        </Button>
      </div>
      {/* Messages area should grow to fill available height */}
      <div className="flex-1 overflow-hidden">
        <MessagesList initialMessages={initialMessages} chatId={chatId} />
      </div>

      {/* Message input form stays at bottom */}
      <div className="shrink-0 mb-2 md:mb-4">
        <MessageForm initialMessages={initialMessages} chatId={chatId} />
      </div>
    </div>
  );
};
