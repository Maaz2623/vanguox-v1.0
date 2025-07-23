"use client";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import {
  ArrowUpIcon,
  Loader2Icon,
  PaperclipIcon,
  SquareIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import TextAreaAutoSize from "react-textarea-autosize";

interface Props {
  chatId: string;
}

export const MessageForm = ({ chatId }: Props) => {
  const { input, handleInputChange, handleSubmit, status } = useChat({
    id: chatId,
  });

  const pathname = usePathname();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <div className="w-3/4 mx-auto flex flex-col justify-center items-end">
        <div className="" />
        <div className="w-full mx-auto rounded-md shadow-md">
          <div className="rounded-lg mx-auto dark:bg-neutral-800 border dark:border-neutral-700 border-neutral-200 bg-white overflow-hidden p-2">
            <fieldset>
              <form className="" onSubmit={onSubmit}>
                <div className="flex">
                  <TextAreaAutoSize
                    rows={1}
                    maxRows={3}
                    onChange={handleInputChange}
                    value={input}
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
                    type="submit"
                    onClick={handleSubmit}
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
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};
