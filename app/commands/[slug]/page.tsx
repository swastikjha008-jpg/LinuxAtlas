import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCommandBySlug, getCommandSlugs } from "@/lib/server/command-service";
import { Breadcrumbs } from "@/components/docs/Breadcrumbs";
import { CodeBlock } from "@/components/docs/CodeBlock";

export async function generateStaticParams() {
  const slugs = await getCommandSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmd = await getCommandBySlug(slug);
  if (!cmd) return {};
  return { title: `${cmd.name} — LinuxAtlas`, description: cmd.description };
}

export default async function CommandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cmd = await getCommandBySlug(slug);
  if (!cmd) notFound();

  return (
    <div className="px-6 pb-24 pt-10">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "LinuxAtlas", href: "/" },
            { label: "Commands", href: "/commands" },
            { label: cmd.name },
          ]}
        />

        <h1 className="mt-4 font-display text-4xl font-semibold text-cyan">{cmd.name}</h1>
        <p className="mt-2 text-white/60">{cmd.description}</p>

        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-white">Syntax</h2>
          <div className="mt-3">
            <CodeBlock code={cmd.syntax} />
          </div>
        </section>

        {cmd.examples.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-lg font-semibold text-white">Examples</h2>
            <div className="mt-3 space-y-4">
              {cmd.examples.map((ex) => (
                <div key={ex.code}>
                  <CodeBlock code={ex.code} />
                  <p className="mt-1.5 text-sm text-white/45">{ex.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {cmd.options.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-lg font-semibold text-white">Options</h2>
            <div className="mt-3 divide-y divide-white/5 rounded-lg border border-white/10">
              {cmd.options.map((o) => (
                <div key={o.flag} className="flex gap-4 px-4 py-3">
                  <code className="w-20 shrink-0 font-mono text-sm text-cyan/90">{o.flag}</code>
                  <span className="text-sm text-white/55">{o.description}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {cmd.related.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-lg font-semibold text-white">Related</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {cmd.related.map((r) => (
                <Link
                  key={r.url}
                  href={r.url}
                  className="rounded-lg border border-white/10 px-3 py-1.5 font-mono text-sm text-white/60 transition-colors hover:border-cyan/30 hover:text-cyan"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
