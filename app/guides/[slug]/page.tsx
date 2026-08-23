import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuideBySlug, getGuideSlugs } from "@/lib/server/guide-service";
import { DocsLayout } from "@/components/docs/DocsLayout";

export async function generateStaticParams() {
  const slugs = await getGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};
  return { title: `${guide.title} — LinuxAtlas`, description: guide.description };
}

function difficultyLabel(d: string) {
  return d.charAt(0) + d.slice(1).toLowerCase();
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <DocsLayout
      breadcrumbs={[
        { label: "LinuxAtlas", href: "/" },
        { label: "Guides", href: "/guides" },
        { label: guide.title },
      ]}
      title={guide.title}
      summary={guide.description}
      metadata={[
        { label: "Category", value: guide.category },
        { label: "Read time", value: `${guide.readMinutes} min` },
        { label: "Difficulty", value: difficultyLabel(guide.difficulty) },
      ]}
      tocSections={guide.tocSections}
      mdxSource={guide.mdxSource}
      related={guide.related}
    />
  );
}
