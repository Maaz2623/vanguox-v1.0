import { UIMessage } from "ai";
import { MemoizedMarkdown } from "./memoized-markdown";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import removeMarkdown from "remove-markdown";
import {
  CheckIcon,
  CopyIcon,
  ImageIcon,
  Loader2Icon,
  Share2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    <div className="flex flex-col gap-y-3">
      {message.parts.map((part, i) => {
        switch (part.type) {
          case "text":
            return (
              <div key={i}>
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
                          <CheckIcon className="size-3.5" />
                        ) : (
                          <CopyIcon className="size-3.5" />
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
                        <Share2Icon className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share link</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            );
          case "tool-generateImage":
            switch (part.state) {
              case "input-available":
                return <GeneratingImage key={i} />;
              case "output-available":
                return (
                  <div key={i} className="">
                    <GeneratedImage src={part.output as string} />
                  </div>
                );
            }
        }
      })}
    </div>
  );
};

const GeneratingImage = () => {
  return (
    <div className="w-[350px] h-[350px] bg-neutral-800 border border-neutral-700 animate-pulse rounded-lg flex justify-center items-center">
      <div className="relative size-10 flex justify-center items-center">
        <Loader2Icon className="h-full w-full animate-spin text-muted-foreground" />
        <ImageIcon className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
};

const GeneratedImage = ({ src }: { src: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-[80px] aspect-auto">
      {!loaded && <GeneratingImage />}
      <Image
        src={src}
        alt="Generated image"
        width={500}
        height={500}
        className={cn(
          "rounded-lg border w-[350px] object-center border-neutral-800 aspect-auto transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
        unoptimized // Optional: Use if the image is already optimized (e.g., from UploadThing)
      />
    </div>
  );
};
