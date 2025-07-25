"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ArrowUpIcon, Loader2Icon, PaperclipIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import TextAreaAutoSize from "react-textarea-autosize";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import React, { useState } from "react";
import { useTheme } from "next-themes";

export const NewChatTemplateView = () => {
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [input, setInput] = useState("");

  const pathname = usePathname();

  const queryClient = useQueryClient();

  const trpc = useTRPC();

  const router = useRouter();

  const createChat = useMutation(trpc.chats.create.mutationOptions());

  if (!mounted) return null; // or show a loading skeleton or fallback

  const onSubmit = () => {
    setLoading(true);
    createChat.mutate(undefined, {
      onSuccess: async (data) => {
        queryClient.invalidateQueries(trpc.chats.getChatsList.queryOptions());
        setInput("");
        const params = new URLSearchParams({ message: input });
        router.push(`/chats/${data}?${params.toString()}`);
      },
    });
  };

  return (
    <div className="h-screen">
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          key="new-messages-view-logo"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col -mt-12 justify-center h-full items-center text-center"
        >
          <Image
            src={theme === "light" ? `/logo.svg` : `/dark-logo.svg`}
            alt="logo"
            width={80}
            height={80}
            priority
          />
          <h1 className="md:text-4xl text-xl font-semibold mt-4">Vanguox AI</h1>
          <p className="md:text-md text-sm text-pretty px-2 text-muted-foreground mt-2">
            A powerful AI system designed to enhance ideas and streamline
            creation.
          </p>
        </motion.div>
      </AnimatePresence>
      <motion.div
        layout
        initial={{
          bottom: pathname === "/" ? 12 : 150,
          opacity: 0,
        }}
        animate={{ bottom: pathname === "/" ? 150 : 12, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full md:w-2/3 md:px-0 px-1 mx-auto"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        <div className="w-full mx-auto rounded-md shadow-md">
          <div className="rounded-lg w-full mx-auto dark:bg-neutral-800 border dark:border-neutral-700 border-neutral-200 overflow-hidden p-2">
            <form className="" onSubmit={onSubmit}>
              <div className="flex">
                <TextAreaAutoSize
                  rows={1}
                  maxRows={3}
                  autoFocus={true}
                  disabled={loading}
                  onChange={(e) => setInput(e.target.value)}
                  className="px-3 py-3 resize-none text-sm border-none w-full outline-none bg-transparent"
                  placeholder="What's on your mind today?"
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
              </div>
              <div className="h-8 flex justify-between items-center">
                <div className="w-fit">
                  <Button
                    variant={`ghost`}
                    size={`icon`}
                    type="button"
                    disabled={loading}
                    className="h-8 shadow-none w-8"
                  >
                    <PaperclipIcon className="size-4" />
                  </Button>
                </div>
                <Button
                  size="icon"
                  type="submit"
                  disabled={loading}
                  className="h-8 shadow-none w-8"
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin size-4" />
                  ) : (
                    <ArrowUpIcon className="size-4" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
