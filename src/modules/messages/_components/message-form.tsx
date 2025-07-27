"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { useChat } from "@ai-sdk/react";

interface Props {
  chatId: string;
  sendMessage: ReturnType<typeof useChat>["sendMessage"];
  status: ReturnType<typeof useChat>["status"];
}

export const MessageForm = ({ sendMessage }: Props) => {
  const [prompt, setPrompt] = useState("");

  const onSubmit = () => {
    sendMessage({
      text: prompt,
    });
  };

  return (
    <div className="p-2 w-3/4 rounded-lg border bg-stone-50 border-neutral-300 mx-auto flex items-center">
      <Button className="" variant={`ghost`} size={`icon`}>
        <PlusCircleIcon />
      </Button>
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
      <Button size={`icon`} onClick={onSubmit}>
        <ArrowUpIcon />
      </Button>
    </div>
  );
};
