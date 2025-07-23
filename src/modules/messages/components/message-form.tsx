"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { Message, useChat } from "@ai-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpIcon,
  Loader2Icon,
  PaperclipIcon,
  SquareIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

interface Props {
  chatId: string;
  initialMessages: Message[];
}

export const MessageForm = ({ chatId, initialMessages }: Props) => {
  const { input, handleInputChange, handleSubmit, status, stop } = useChat({
    id: chatId,
    initialMessages: initialMessages,
  });

  const queryClient = useQueryClient();

  const trpc = useTRPC();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  console.log(initialMessages.length);

  useEffect(() => {
    if (initialMessages.length < 4) {
      queryClient.invalidateQueries(
        trpc.chats.getChat.queryOptions({
          chatId,
        })
      ); // optionally pass a specific query key
    }
  }, [initialMessages.length, queryClient, trpc.chats.getChat, chatId]);

  return (
    <>
      <div className="w-3/4 mx-auto flex flex-col justify-center items-end">
        <div className="" />
        <div className="w-full mx-auto rounded-md shadow-md">
          <div className="rounded-lg mx-auto dark:bg-neutral-800 border dark:border-neutral-700 border-neutral-200 bg-white overflow-hidden p-2">
            <form className="" onSubmit={onSubmit}>
              <div className="flex">
                <TextAreaAutoSize
                  rows={1}
                  maxRows={3}
                  onChange={handleInputChange}
                  value={input}
                  disabled={status === "streaming" || status === "submitted"}
                  className="px-3 py-3 resize-none text-sm border-none w-full outline-none bg-transparent"
                  placeholder="What would you like to build?"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (e.shiftKey) return; // Allow newline
                      e.preventDefault();
                      if (e.ctrlKey || !e.metaKey) {
                        onSubmit(e);
                      }
                    }
                  }}
                />
              </div>
              <div className="h-8 flex justify-between items-center">
                <div className="w-fit">
                  <Button
                    variant={`ghost`}
                    size={`icon`}
                    type="button"
                    className="h-8 shadow-none w-8"
                  >
                    <PaperclipIcon className="size-4" />
                  </Button>
                </div>
                <Button
                  size="icon"
                  disabled={status === "submitted"}
                  type={status !== "streaming" ? "submit" : "button"}
                  onClick={() => {
                    if (status !== "streaming") {
                      handleSubmit();
                    }
                    if (status === "streaming") {
                      stop();
                    }
                  }}
                  className="h-8 shadow-none w-8"
                >
                  {status === "ready" && <ArrowUpIcon className="size-4" />}
                  {status === "submitted" && (
                    <Loader2Icon className="animate-spin" />
                  )}
                  {status === "streaming" && (
                    <SquareIcon className="fill-white" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
