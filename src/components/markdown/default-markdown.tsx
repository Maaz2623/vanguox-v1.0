import { UIMessage } from "ai";
import { MemoizedMarkdown } from "./memoized-markdown";
import { GeneratingImage } from "./images/generating-image";
import { GeneratedImage } from "./images/generated-image";

export const DefaultMarkdown = ({
  id,
  parts,
}: {
  id: string;
  parts: UIMessage["parts"];
}) => {
  return (
    <div>
      {parts.map((part, i) => {
        switch (part.type) {
          case "text":
            console.log(part.text, part.type);
            return <MemoizedMarkdown key={i} content={part.text} id="123456" />;
          case "tool-invocation": {
            switch (part.toolInvocation.toolName) {
              case "imageGenerator": {
                switch (part.toolInvocation.state) {
                  case "call":
                    return <GeneratingImage key={id} />;
                  case "result":
                    const { fileUrl, mimeType } = part.toolInvocation.result;
                    return (
                      <GeneratedImage
                        mimeType={mimeType}
                        key={i}
                        fileUrl={fileUrl}
                      />
                    );
                }
              }
            }
          }
        }
      })}
    </div>
  );
};
