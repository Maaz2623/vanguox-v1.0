"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const FilesView = () => {
  const trpc = useTRPC();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const isMobile = useIsMobile();

  const { data: files } = useSuspenseQuery(trpc.files.getFiles.queryOptions());

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url, { mode: "cors" });

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = url.split("/").pop() || "download";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(blobUrl); // Clean up
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-wrap pb-40 w-full p-5 gap-3 justify-center md:justify-start">
        {files.map((file) => {
          if (file.mediaType === "image/png") {
            return (
              <div
                key={file.url}
                className="relative cursor-pointer rounded-lg overflow-hidden"
                onMouseEnter={() => setHoveredImage(file.url)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                {isMobile && (
                  <div className="bg-gradient-to-b h-[40%] transition-all duration-300 justify-end flex from-neutral-900/80 p-1 to-transparent w-full absolute">
                    <Button
                      className="cursor-pointer"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(file.url)}
                    >
                      <DownloadIcon className="text-white" />
                    </Button>
                  </div>
                )}
                {hoveredImage === file.url && !isMobile && (
                  <div className="bg-gradient-to-b h-[40%] transition-all duration-300 justify-end flex from-neutral-900/80 p-1 to-transparent w-full absolute">
                    <Button
                      className="cursor-pointer"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(file.url)}
                    >
                      <DownloadIcon className="text-white" />
                    </Button>
                  </div>
                )}
                <Image
                  src={file.url}
                  alt="image"
                  width={500}
                  height={500}
                  className="w-[200px] h-[200px] rounded-lg"
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </ScrollArea>
  );
};
