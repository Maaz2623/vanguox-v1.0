"use client";
import { MessageForm } from "@/modules/messages/components/message-form";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export const NewChatTemplateView = () => {
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
      <MessageForm />
    </div>
  );
};
