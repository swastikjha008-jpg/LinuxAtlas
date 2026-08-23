import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { CodeBlock } from "@/components/docs/CodeBlock";

export function MdxBody({ source }: { source: string }) {
  return (
    <div className="prose-linuxatlas">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h2: (props) => (
            <h2 className="scroll-mt-24 font-display text-xl font-semibold text-white first:mt-0" {...props} />
          ),
          h3: (props) => <h3 className="mt-6 font-display text-base font-semibold text-white" {...props} />,
          p: (props) => <p className="mt-3 leading-relaxed text-white/60" {...props} />,
          ul: (props) => <ul className="mt-3 list-disc space-y-1.5 pl-5 text-white/60" {...props} />,
          ol: (props) => <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-white/60" {...props} />,
          li: (props) => <li className="leading-relaxed marker:text-cyan/50" {...props} />,
          a: (props) => (
            <a className="text-cyan underline decoration-cyan/30 underline-offset-2 hover:decoration-cyan" {...props} />
          ),
          strong: (props) => <strong className="font-semibold text-white/85" {...props} />,
          code: (props) => {
            const { className, children } = props;
            const isBlock = Boolean(className);
            if (!isBlock) {
              return <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-cyan/90">{children}</code>;
            }
            const language = className?.replace("language-", "") || "bash";
            return (
              <div className="mt-4">
                <CodeBlock code={String(children).replace(/\n$/, "")} language={language} />
              </div>
            );
          },
          pre: (props) => <>{props.children}</>,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}