"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { TypeAnimation } from "react-type-animation";

export function ChatViewSiteHeader({ chatId }: { chatId: string }) {
  const data = useQuery(api.chats.getChat, {
    chatId,
  });

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 transition-[width,height] bg-neutral-100! dark:bg-neutral-900! ease-linear ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {data ? (
          <h1 className="text-base font-medium text-neutral-400">
            <TypeAnimation
              key={data.title}
              sequence={[data.title]}
              cursor={false}
            />
          </h1>
        ) : (
          <Skeleton className="h-8 bg-neutral-300" />
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
