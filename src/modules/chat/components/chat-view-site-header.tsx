"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input"; // Ensure you have an Input component

export function ChatViewSiteHeader({ chatId }: { chatId: string }) {
  const data = useQuery(api.chats.getChat, { chatId });
  const updateTitle = useMutation(api.chats.updateConvexChatTitle); // Assume this mutation exists

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Update animation key when title changes
  useEffect(() => {
    if (data?.title) {
      setTitle(data.title);
      setAnimationKey((prev) => prev + 1); // force re-mount TypeAnimation
    }
  }, [data?.title]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleTitleSubmit = async () => {
    if (title.trim() && title !== data?.title) {
      await updateTitle({ chatId, title: title.trim() });
    }
    setIsEditing(false);
  };

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 transition-[width,height] bg-neutral-100! dark:bg-neutral-900! ease-linear ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {data ? (
          <div className="text-base font-medium dark:text-neutral-400 text-neutral-600 w-full max-w-xs">
            {isEditing ? (
              <Input
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTitleSubmit();
                  } else if (e.key === "Escape") {
                    setIsEditing(false);
                    setTitle(data.title); // reset on escape
                  }
                }}
                className="h-7 ring-0 focus-visible:ring-0 text-sm"
              />
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="cursor-pointer"
              >
                <TypeAnimation
                  key={animationKey}
                  sequence={[data.title]}
                  cursor={false}
                />
              </div>
            )}
          </div>
        ) : (
          <Skeleton className="h-8 dark:bg-neutral-800 bg-neutral-200 w-32" />
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
