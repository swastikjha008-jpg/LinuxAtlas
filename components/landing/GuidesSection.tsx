import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAllGuides } from "@/lib/server/guide-service";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export async function GuidesSection() {
  const guides = await getAllGuides();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Guides"
          title="Learn, don't just search"
          description="LinuxAtlas is a reference, but it's also a place to actually understand how things fit together."
        />

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-5 py-4 transition-colors duration-200 hover:border-cyan/25 hover:bg-cyan/[0.03]"
            >
              <span className="text-sm text-white/65 group-hover:text-white">{g.title}</span>
              <ArrowUpRight className="h-4 w-4 text-white/25 transition-colors group-hover:text-cyan" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
