"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpIcon, PaperclipIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import TextAreaAutoSize from "react-textarea-autosize";

export const MessageForm = () => {
  const pathname = usePathname();

  const onSubmit = () => {};

  return (
    <>
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
        <div className="w-2/3 mx-auto">
          <div className="rounded-lg w-full mx-auto bg-neutral-200 dark:bg-neutral-800 border dark:border-neutral-700 border-neutral-300 overflow-hidden p-2">
            <fieldset>
              <form className="" onSubmit={onSubmit}>
                <div className="flex">
                  <TextAreaAutoSize
                    rows={1}
                    className="px-3 py-3 resize-none text-sm border-none w-full outline-none bg-transparent"
                    placeholder="What would you like to build?"
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter") {
                    //     if (e.shiftKey) return; // Allow newline
                    //     e.preventDefault();
                    //     if (e.ctrlKey || !e.metaKey) {
                    //       onSubmit(e);
                    //     }
                    //   }
                    // }}
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
    </>
  );
};
