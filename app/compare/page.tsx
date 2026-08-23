import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { compareDistros } from "@/lib/server/compare-service";

export const metadata: Metadata = {
  title: "Compare — LinuxAtlas",
  description: "Compare distributions, package managers, release models, and more.",
};

const DEFAULT_COMPARE = ["arch-linux", "ubuntu", "fedora"];

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ distros?: string }>;
}) {
  const { distros: distrosParam } = await searchParams;
  const slugs = distrosParam
    ? distrosParam.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4)
    : DEFAULT_COMPARE;

  const { distros, rows } = await compareDistros(slugs);

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Compare"
        title="Compare Linux distributions"
        description="A side-by-side look at how these distributions differ."
      />

      <div className="mx-auto max-w-5xl px-6">
        {distros.length < 2 ? (
          <p className="text-center text-white/50">
            Not enough distributions resolved to compare. Try a URL like
            <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-cyan/80">
              /compare?distros=arch-linux,ubuntu
            </code>
          </p>
        ) : (
          <div className="glass-strong overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-white/35">Attribute</th>
                  {distros.map((d) => (
                    <th key={d.slug} className="px-5 py-4 font-display text-base font-semibold text-white">
                      {d.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white/[0.015]" : ""}>
                    <td className="px-5 py-3.5 text-sm text-white/45">{row.label}</td>
                    {distros.map((d) => (
                      <td key={d.slug} className="px-5 py-3.5 font-mono text-sm text-cyan/85">
                        {row.values[d.slug]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-white/35">
          Swap the comparison with a URL like
          <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-cyan/80">
            ?distros=debian,alpine-linux,nixos
          </code>
          — up to 4 at once. A visual distro picker lands next.
        </p>
      </div>
    </div>
  );
}
