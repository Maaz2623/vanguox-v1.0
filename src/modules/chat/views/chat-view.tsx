import { SiteHeader } from "@/app/(chat-dashboard)/_components/site-header";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MessageForm } from "@/modules/messages/_components/message-form";
import { MessagesList } from "@/modules/messages/_components/messages-list";
import { IconMessageCirclePlus } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
  chatId: string;
}

export const ChatView = ({ chatId }: Props) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 overflow-hidden">
        <MessagesList />
      </div>

      {/* Message input form stays at bottom */}
      <div className="shrink-0 pb-3">
        <MessageForm />
      </div>
    </div>
  );
};
