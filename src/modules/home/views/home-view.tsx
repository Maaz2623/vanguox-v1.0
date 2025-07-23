"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ArrowUpIcon, PaperclipIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import TextAreaAutoSize from "react-textarea-autosize";

export const HomeView = () => {
  const pathname = usePathname();

  const router = useRouter();

  const onSubmit = () => {
    router.push(`/auth`);
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
          <Image src="/logo.svg" alt="logo" width={80} height={80} priority />
          <h1 className="text-4xl font-semibold mt-4">Vanguox AI</h1>
          <p className="text-md text-muted-foreground mt-2">
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
        className="w-3/4 mx-auto"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        <div className="w-2/3 mx-auto rounded-md shadow-sm">
          <div className="rounded-lg w-full mx-auto dark:bg-neutral-800 border dark:border-neutral-700 border-neutral-200 overflow-hidden p-2">
            <fieldset>
              <form className="" onSubmit={onSubmit}>
                <div className="flex">
                  <TextAreaAutoSize
                    rows={1}
                    maxRows={3}
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
                      className="h-8 shadow-none w-8"
                    >
                      <PaperclipIcon className="size-4" />
                    </Button>
                  </div>
                  <Button
                    size="icon"
                    type="submit"
                    className="h-8 shadow-none w-8"
                  >
                    <ArrowUpIcon className="size-4" />
                  </Button>
                </div>
              </form>
            </fieldset>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
