import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { FilesView } from "@/modules/files/ui/files-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import React, { Suspense } from "react";

const FilesPage = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.files.getFiles.queryOptions());

  return (
    <div className="overflow-hidden">
      <Header />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<FilesLoading />}>
          <FilesView />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default FilesPage;

const FilesLoading = () => {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-wrap pb-40 w-full p-5 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            className="w-[200px] h-[200px] dark:bg-neutral-800"
            key={i}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

const Header = () => {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 transition-[width,height] bg-neutral-100! dark:bg-neutral-900! ease-linear ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />{" "}
        <span className="text-xl">My Files</span>
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
};
