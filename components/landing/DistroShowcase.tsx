import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getAllDistros } from "@/lib/server/distro-service";

export async function DistroShowcase() {
  const distros = await getAllDistros();
  const featured = distros.slice(0, 6);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader eyebrow="Distributions" title="Explore Linux distributions" />
          <Button href="/distros" variant="ghost" icon>
            Explore all distributions
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => (
            <GlassCard key={d.slug} glow className="flex flex-col">
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
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
