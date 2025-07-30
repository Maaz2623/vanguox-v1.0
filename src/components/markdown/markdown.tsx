import { UIMessage } from "ai";
import { MemoizedMarkdown } from "./memoized-markdown";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import removeMarkdown from "remove-markdown";
import { CheckIcon, CopyIcon, Share2Icon } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  message: UIMessage;
  status: ReturnType<typeof useChat>["status"];
}

export const Markdown = ({ message, status }: Props) => {
  const [copied, setCopied] = useState(false);

  

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <div>
      {message.parts.map((part, i) => (
        <div key={i}>
          {part.type === "text" && (
            <>
              <MemoizedMarkdown id={message.id} content={part.text} />
              <div
                className={cn(
                  "h-7 -ml-1.5 gap-x-1 mt-4 text-neutral-700 dark:text-neutral-400 flex opacity-0 justify-start items-center transition-opacity duration-500",
                  status === "ready" &&
                    "opacity-100 transition-opacity duration-500"
                )}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={`ghost`}
                      size={`icon`}
                      onClick={() => {
                        setCopied(true);
                        const rawText = part.text;

                        const plainText = removeMarkdown(rawText);
                        navigator.clipboard.writeText(plainText);
                      }}
                      className="cursor-pointer size-7 p-0! rounded-[10px]!"
                    >
                      {copied ? (
                        <CheckIcon className="size-4" />
                      ) : (
                        <CopyIcon className="size-4" />
                      )}
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
            </>
          )}
        </div>
      ))}
    </div>
  );
};
