import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDistroBySlug, getDistroSlugs } from "@/lib/server/distro-service";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";

export async function generateStaticParams() {
  const slugs = await getDistroSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const distro = await getDistroBySlug(slug);
  if (!distro) return {};
  return { title: `${distro.name} — LinuxAtlas`, description: distro.description };
}

export default async function DistroDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const distro = await getDistroBySlug(slug);
  if (!distro) notFound();

  return (
    <DocsLayout
      breadcrumbs={[
        { label: "LinuxAtlas", href: "/" },
        { label: "Distros", href: "/distros" },
        { label: distro.name },
      ]}
      title={distro.name}
      summary={distro.description}
      metadata={[
        { label: "Base", value: distro.basedOn ?? distro.family },
        { label: "Package Manager", value: distro.packageManager },
        { label: "Init System", value: distro.initSystem },
        { label: "Release Model", value: distro.releaseModel },
        { label: "Architecture", value: distro.architectures.join(", ") },
      ]}
      tocSections={distro.tocSections}
      mdxSource={distro.mdxSource}
      related={distro.related}
      aside={
        distro.commandExamples.length > 0 && (
          <section id="common-commands" className="scroll-mt-24">
            <h2 className="font-display text-xl font-semibold text-white">Common Commands</h2>
            <div className="mt-4 space-y-3">
              {distro.commandExamples.map((c) => (
                <div key={c.code}>
                  <CodeBlock code={c.code} />
                  <p className="mt-1.5 text-sm text-white/45">{c.description}</p>
                </div>
              ))}
            </div>
          </section>
        )
      }
    />
  );
}
