import { Breadcrumbs } from "@/components/docs/Breadcrumbs";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { MdxBody } from "@/components/docs/MdxBody";
import type { RelatedItemDTO } from "@/lib/types";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function DocsLayout({
  breadcrumbs,
  title,
  summary,
  metadata,
  tocSections,
  mdxSource,
  related,
  aside,
}: {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  summary: string;
  metadata?: { label: string; value: string }[];
  tocSections: { id: string; title: string }[];
  mdxSource: string | null;
  related?: RelatedItemDTO[];
  aside?: React.ReactNode;
}) {
  return (
    <div className="px-6 pb-24 pt-10">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-white/55">{summary}</p>

        {metadata && metadata.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {metadata.map((m) => (
              <div key={m.label} className="glass rounded-lg px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/35">{m.label}</p>
                <p className="mt-1 text-sm text-white/85">{m.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
          <aside className="hidden lg:block">
            <DocsSidebar sections={tocSections} />
          </aside>

          <div className="min-w-0">
            {mdxSource ? (
              <MdxBody source={mdxSource} />
            ) : (
              <p className="text-white/45">Full documentation for this page is coming soon.</p>
            )}

            {aside && <div className="mt-10">{aside}</div>}

            {related && related.length > 0 && (
              <div className="mt-12 border-t border-white/5 pt-8">
                <h2 className="font-display text-lg font-semibold text-white">Related</h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.url}
                      href={r.url}
                      className="group flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:border-cyan/25 hover:bg-cyan/[0.03]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm text-white/75 group-hover:text-white">{r.title}</p>
                        <p className="truncate text-xs text-white/40">{r.description}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25 group-hover:text-cyan" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
