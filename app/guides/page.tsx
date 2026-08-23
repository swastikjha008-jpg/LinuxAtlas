import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { getAllGuides } from "@/lib/server/guide-service";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides — LinuxAtlas",
  description: "Step-by-step guides for learning and working with Linux.",
};

function difficultyLabel(d: string) {
  return d.charAt(0) + d.slice(1).toLowerCase();
}

export default async function GuidesPage() {
  const guides = await getAllGuides();

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Guides"
        title="Learn, don't just search"
        description="Guides that explain how the pieces fit together, not just what to type."
      />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-5 py-4 transition-colors hover:border-cyan/25 hover:bg-cyan/[0.03]"
            >
              <div>
                <span className="text-sm text-white/70 group-hover:text-white">{g.title}</span>
                <p className="mt-1 text-xs text-white/40">
                  {g.category} · {g.readMinutes} min · {difficultyLabel(g.difficulty)}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25 transition-colors group-hover:text-cyan" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
