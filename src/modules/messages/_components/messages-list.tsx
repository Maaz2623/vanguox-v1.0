"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCard } from "./message-card";
import { UIMessage, useChat } from "@ai-sdk/react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowUpIcon,
  CheckCircleIcon,
  Loader2Icon,
  PaperclipIcon,
  PlusCircleIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { DefaultChatTransport } from "ai";
import { useSearchParams } from "next/navigation";
import { ChatViewSiteHeader } from "@/modules/chat/components/chat-view-site-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTruncatedFileName } from "@/lib/utils";

interface Props {
  chatId: string;
  initialMessages: UIMessage[];
}

export const MessagesList = ({ initialMessages, chatId }: Props) => {
  const searchParams = useSearchParams();

  const initialMessage = searchParams.get("message");

  const { messages, status, sendMessage, stop } = useChat({
    id: chatId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const hasSentInitialMessage = useRef(false);

  useEffect(() => {
    if (!initialMessage || hasSentInitialMessage.current) return;

    sendMessage({ text: initialMessage });
    hasSentInitialMessage.current = true;

    // Remove the query param from the URL
    const url = new URL(window.location.href);
    url.searchParams.delete("message");
    window.history.replaceState({}, "", url.toString());
  }, [initialMessage, sendMessage]);

  const [prompt, setPrompt] = useState("");

  const [optionsOpen, setOptionsOpen] = useState(false);

  const onSubmit = () => {
    if (status === "streaming") {
      stop();
      return;
    }

    if (!prompt.trim()) return; // Avoid sending empty messages

    sendMessage({ text: prompt });
    setPrompt("");
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "user";

  const lastIndex = messages.length - 1;

  console.log("messages-list-rendered");

  const streamingMessage =
    messages[lastIndex]?.role === "assistant" && status === "streaming"
      ? messages[lastIndex]
      : null;

  const stableMessages = streamingMessage ? messages.slice(0, -1) : messages;

  useEffect(() => {
    if (isLastMessageUser) {
      const frame = requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });

      return () => cancelAnimationFrame(frame);
    }

    if (!messages || messages.length === 0) return;
  }, [messages.length, messages, isLastMessageUser]);

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="w-full h-full overflow-hidden relative max-w-screen flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-full z-50">
          <ChatViewSiteHeader chatId={chatId} />
        </div>
        <ScrollArea className="w-full h-screen overflow-auto">
          <div className="md:w-[70%] w-[95%] mx-auto h-full pb-[50vh] pt-20 flex flex-col gap-y-10">
            {stableMessages.map((msg) => (
              <MessageCard status={status} message={msg} key={msg.id} />
            ))}
            {streamingMessage && (
              <div>
                <MessageCard status={status} message={streamingMessage} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
        <div className="h-auto mb-3 flex-col w-full flex justify-center items-center">
          {files && files.length > 0 && (
            <Attachments files={files} setFiles={setFiles} />
          )}
          <div className="p-2 md:w-3/4 w-[95%]  rounded-lg border border-neutral-300 bg-neutral-200 dark:border-neutral-700 shadow-lg dark:bg-neutral-800 mx-auto flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className=""
                  variant={`ghost`}
                  size={`icon`}
                  onClick={() => setOptionsOpen(true)}
                >
                  <PlusCircleIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-50 border-none w-[200px] py-1">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex gap-x-2"
                  onClick={handleClick}
                >
                  <PaperclipIcon className="text-muted-foreground size-4" />
                  Upload Files
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TextAreaAutoSize
              rows={1}
              maxRows={3}
              autoFocus={true}
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              className="px-3 py-3 resize-none text-sm border-none w-full outline-none"
              placeholder="Ask me anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (e.shiftKey) return; // Allow newline
                  e.preventDefault();
                  if (e.ctrlKey || !e.metaKey) {
                    onSubmit();
                  }
                }
              }}
            />
            <Button
              size={`icon`}
              onClick={onSubmit}
              disabled={status === "submitted"}
            >
              {status === "ready" && <ArrowUpIcon />}
              {status === "submitted" && (
                <Loader2Icon className="animate-spin" />
              )}
              {status === "streaming" && <SquareIcon className=" fill-white" />}
            </Button>
            <input
              type="file"
              className="hidden"
              onChange={(event) => {
                if (event.target.files) {
                  setFiles(event.target.files);
                }
              }}
              ref={fileInputRef}
            />
          </div>
        </div>
      </div>
    </>
  );
};

interface AttachmentsProps {
  files: FileList | undefined;
  setFiles: Dispatch<SetStateAction<FileList | undefined>>;
}

const Attachments = ({ files, setFiles }: AttachmentsProps) => {
  const uploadedFilesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    const newFiles = fileArray.filter((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}`;
      return !uploadedFilesRef.current.has(key);
    });

    if (newFiles.length === 0) return;

    newFiles.forEach((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}`;
      uploadedFilesRef.current.add(key);
    });
  }, [files]);

  return (
    <>
      <div className="px-3 py-2 bg-card rounded-t-lg w-[90%] md:w-[70%] mx-auto flex justify-between items-center">
        <Button
          size={`sm`}
          variant={`link`}
          className="text-sm cursor-pointer "
        >
          {files &&
            Array.from(files).map((file, idx) => (
              <div key={idx} className="flex gap-x-2 w-full ">
                <CheckCircleIcon className="text-green-500" />
                <p className="max-w-[200px] truncate">
                  {getTruncatedFileName(file.name)}
                </p>
              </div>
            ))}
        </Button>
        <Button
          variant={`ghost`}
          className="h-5 w-5"
          onClick={() => setFiles(undefined)}
        >
          <XIcon className="size-4" />
        </Button>
      </div>
    </>
  );
};
