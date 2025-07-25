import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./code-block";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <div className="duration-500 animate-in">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
          components={{
            h1: (props) => (
              <h1
                className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
                {...props}
              />
            ),
            h2: (props) => (
              <h2
                className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3"
                {...props}
              />
            ),
            h3: (props) => (
              <h3
                className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2"
                {...props}
              />
            ),
            p: (props) => {
              return (
                <p
                  className="leading-relaxed animate-in duration-500 text-neutral-800 dark:text-neutral-200 mb-4"
                  {...props}
                />
              );
            },
            strong: (props) => (
              <strong
                className="font-semibold text-neutral-900 dark:text-neutral-100"
                {...props}
              />
            ),
            em: (props) => (
              <em
                className="italic text-neutral-700 dark:text-neutral-300"
                {...props}
              />
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-neutral-400 pl-4 italic text-neutral-700 dark:text-neutral-300 mb-4">
                {children}
              </blockquote>
            ),
            hr: () => (
              <hr className="my-6 border-neutral-300 dark:border-neutral-700" />
            ),
            ul: (props) => (
              <ul
                className="list-disc pl-6 space-y-1 text-neutral-900 dark:text-neutral-200 mb-4"
                {...props}
              />
            ),
            ol: (props) => (
              <ol
                className="list-decimal pl-6 space-y-1 text-neutral-900 dark:text-neutral-200 mb-4"
                {...props}
              />
            ),
            li: (props) => (
              <li
                className="ml-1 text-neutral-800 dark:text-neutral-300"
                {...props}
              />
            ),
            code: ({ className, children }) => {
              const isBlock = className?.includes("language-");

              if (isBlock) {
                return <CodeBlock className={className}>{children}</CodeBlock>;
              }

              return (
                <code className="bg-neutral-300 dark:bg-neutral-700 px-1 py-0.5 rounded text-[14px] font-mono max-w-[200px]">
                  {children}
                </code>
              );
            },
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800"
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src || ""}
                alt={alt || ""}
                className="my-4 rounded-lg shadow-md max-w-full"
              />
            ),
            table: (props) => (
              <table
                className="table-auto w-full rounded-lg max-w-[100%] overflow-hidden border-collapse border bg-neutral-100 border-neutral-400 dark:border-neutral-600 mb-4"
                {...props}
              />
            ),
            thead: (props) => (
              <thead
                className="bg-neutral-300 dark:bg-neutral-700"
                {...props}
              />
            ),
            tbody: (props) => <tbody {...props} />,
            tr: (props) => (
              <tr
                className="border-b border-neutral-300 dark:border-neutral-600"
                {...props}
              />
            ),
            th: (props) => (
              <th
                className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 text-left font-semibold"
                {...props}
              />
            ),
            td: (props) => (
              <td
                className="border border-neutral-300 dark:border-neutral-600 px-4 py-2"
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  }
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
    ));
  }
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
