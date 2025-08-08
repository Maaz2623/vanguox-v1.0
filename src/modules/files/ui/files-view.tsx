"use client";

import { getFiles } from "@/actions/files.action";
import Image from "next/image";

interface Props {
  files: Awaited<ReturnType<typeof getFiles>>;
}

export const FilesView = ({ files }: Props) => {
  return (
    <div className="p-5 flex flex-wrap gap-3">
      {files.map((file) => {
        switch (file.mediaType) {
          case "image/png":
            return (
              <Image
                key={file.url}
                src={file.url}
                alt="image"
                width={500}
                height={500}
                className="w-[200px] rounded-lg"
              />
            );
        }
      })}
    </div>
  );
};
