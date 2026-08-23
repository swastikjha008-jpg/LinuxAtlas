import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPackageManagerBySlug, getPackageManagerSlugs } from "@/lib/server/package-manager-service";
import { Breadcrumbs } from "@/components/docs/Breadcrumbs";
import { CodeBlock } from "@/components/docs/CodeBlock";

export async function generateStaticParams() {
  const slugs = await getPackageManagerSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pm = await getPackageManagerBySlug(slug);
  if (!pm) return {};
  return { title: `${pm.name} — LinuxAtlas`, description: pm.description };
}

export default async function PackageManagerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pm = await getPackageManagerBySlug(slug);
  if (!pm) notFound();

  const rows = [
    { label: "Install a package", code: pm.installCmd },
    { label: "Update all packages", code: pm.updateCmd },
    { label: "Search for a package", code: pm.searchCmd },
    { label: "Remove a package", code: pm.removeCmd },
  ];

  return (
    <div className="px-6 pb-24 pt-10">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "LinuxAtlas", href: "/" },
            { label: "Package Managers", href: "/package-managers" },
            { label: pm.name },
          ]}
        />
        <h1 className="mt-4 font-display text-4xl font-semibold text-white">{pm.name}</h1>
        <p className="mt-2 text-white/60">{pm.description}</p>
        <p className="mt-1 font-mono text-xs text-cyan/70">{pm.distributionFamily}</p>

        <div className="mt-8 space-y-5">
          {rows.map((r) => (
            <div key={r.label}>
              <p className="mb-2 text-sm text-white/50">{r.label}</p>
              <CodeBlock code={r.code} />
            </div>
          ))}
        </div>

        {pm.sourceUrl && (
          <a
            href={pm.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-cyan/80 hover:text-cyan"
          >
            Official source: {pm.sourceName} →
          </a>
        )}
      </div>
    </div>
  );
}
