import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { UIMessage, useChat } from "@ai-sdk/react";
import { format } from "date-fns";
import { CopyIcon, Share2Icon } from "lucide-react";
import Image from "next/image";

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
      <Card className="shadow-none animate-in duration-300 w-fit max-w-[60%] py-2 px-4 rounded-md! bg-neutral-800 text-white dark:text-neutral-950">
        {message.parts.map((part, i) => (
          <span className="" key={i}>
            {part.type === "text" && part.text}
          </span>
        ))}
      </Card>
    </div>
  );
};

const AssistantMessageCard = ({ message, status }: Props) => {
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
            "shadow-none text-[14px] md:text-[16px]  bg-transparent dark:bg-neutral-900 w-full p-5 border-none animate-fade-in max-w-full"
          )}
        >
          {message.parts.map((part, index) =>
            part.type === "text" ? <span key={index}>{part.text}</span> : null
          )}
          <div
            className={cn(
              "h-7 -ml-1.5 gap-x-1 mt-4 text-neutral-700 dark:text-neutral-300 flex opacity-0 justify-start items-center transition-opacity duration-500",
              status === "ready" &&
                "opacity-100 transition-opacity duration-500"
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={`ghost`}
                  size={`icon`}
                  className="cursor-pointer size-7 p-0! rounded-[10px]!"
                >
                  <CopyIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy text</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={`ghost`}
                  size={`icon`}
                  className="cursor-pointer size-7 rounded-[10px]!"
                >
                  <Share2Icon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share link</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
