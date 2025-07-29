import { UIMessage } from "ai";
import { MemoizedMarkdown } from "./memoized-markdown";

interface Props {
  message: UIMessage;
}

export const Markdown = ({ message }: Props) => {
  return (
    <div>
      {message.parts.map((part, i) => (
        <div key={i}>
          {part.type === "text" && (
            <MemoizedMarkdown id={message.id} content={part.text} />
          )}
        </div>
      ))}
    </div>
  );
};
