import { Markdown } from "@/components/markdown/markdown";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UIMessage, useChat } from "@ai-sdk/react";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

interface Props {
  message: UIMessage;
  status: ReturnType<typeof useChat>["status"];
}

export const MessageCard = ({ message, status }: Props) => {
  return (
    <div>
      {message.role === "assistant" ? (
        <div className="flex justify-start items-center">
          <AssistantMessageCard message={message} status={status} />
        </div>
      ) : (
        <div className="flex justify-end items-center">
          <UserMessageCard message={message} status={status} />
        </div>
      )}
    </div>
  );
};

const UserMessageCard = ({ message }: Props) => {
  return (
    <div className="w-full flex justify-end text-[14px] md:text-[16px]">
      <Card className="shadow-none animate-in duration-300 w-fit max-w-[60%] py-2 px-4 rounded-md! bg-neutral-300 dark:bg-neutral-700 border-none dark:text-neutral-200 text-neutral-900 ">
        {message.parts.map((part, i) => (
          <span className="" key={i}>
            {part.type === "text" && part.text}
          </span>
        ))}
      </Card>
    </div>
  );
};

const AssistantMessageCard = React.memo(({ message, status }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col group px-2 pb-4 max-w-[90%] text-[14px] md:text-[16px]"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <Image
          src={`/logo.svg`}
          alt="vibe"
          width={15}
          height={15}
          className="shrink-0"
        />
        <span className="text-xs md:text-sm font-medium">Vanguox</span>
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 font-medium">
          {/* {createdAt && format(createdAt, "HH:mm 'on' MM dd, yyyy")} */}
          {format(new Date(), "HH:mm 'on' MM dd, yyyy")}
        </span>
      </div>

      <div className="w-full flex justify-start flex-col gap-y-2">
        <div
          className={cn(
            "shadow-none text-[14px] md:text-[16px] text-neutral-800 dark:text-neutral-200  bg-transparent dark:bg-neutral-900 w-full p-5 border-none animate-fade-in max-w-full"
          )}
        >
          <Markdown status={status} message={message} />
        </div>
      </div>
    </div>
  );
});

AssistantMessageCard.displayName = "AssistantMessageCard";
