import { UIMessage } from "ai";
import { MemoizedMarkdown } from "./memoized-markdown";
import { GeneratingImage } from "./images/generating-image";
import { GeneratedImage } from "./images/generated-image";

export const DefaultMarkdown = ({
  // id,
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
            return <MemoizedMarkdown key={i} content={part.text} id="123456" />;
          case "tool-invocation": {
            switch (part.toolInvocation.toolName) {
              case "weather": {
                switch (part.toolInvocation.state) {
                  case "partial-call":
                    return <div>{part.toolInvocation.state}</div>;
                  case "call":
                    return <div key={i}>Loading</div>;
                  case "result":
                    return (
                      <div key={`weather-${i}`}>
                        {part.toolInvocation.result}
                      </div>
                    );
                }
              }
              case "imageGenerator": {
                switch (part.toolInvocation.state) {
                  case "call":
                    return <GeneratingImage key={`image-${i}`} />;
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
