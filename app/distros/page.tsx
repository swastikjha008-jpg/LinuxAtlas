import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { getAllDistros } from "@/lib/server/distro-service";

export const metadata: Metadata = {
  title: "Distributions — LinuxAtlas",
  description: "Explore Linux distributions and understand what makes each one different.",
};

function difficultyLabel(d: string) {
  return d.charAt(0) + d.slice(1).toLowerCase();
}

export default async function DistrosPage() {
  const distros = await getAllDistros();

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Distributions"
        title="Explore Linux distributions"
        description={`${distros.length} distributions, and counting. Every one takes a different stance on defaults, release cadence, and philosophy.`}
      />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {distros.map((d) => (
            <Link key={d.slug} href={`/distros/${d.slug}`}>
              <GlassCard glow className="flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-lg font-semibold text-white">{d.name}</h3>
                  <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10px] text-white/40">
                    {d.basedOn ?? d.family}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{d.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                  <span className="font-mono text-[11px] text-cyan/80">{d.packageManager}</span>
                  <span className="text-white/20">·</span>
                  <span className="font-mono text-[11px] text-white/40">{d.releaseModel}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge className="border-white/10 bg-white/[0.03] text-white/45">{d.family}</Badge>
                  <Badge className="border-white/10 bg-white/[0.03] text-white/45">{difficultyLabel(d.difficulty)}</Badge>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
