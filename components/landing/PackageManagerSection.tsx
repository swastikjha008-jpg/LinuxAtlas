import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { getAllPackageManagers } from "@/lib/server/package-manager-service";

export async function PackageManagerSection() {
  const packageManagers = await getAllPackageManagers();
  const dockerRows = packageManagers.map((p) => ({
    distro: p.distributionFamily,
    command: p.installCmd.replace("<package>", p.slug === "apt" ? "docker.io" : "docker"),
  }));

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Package Managers"
            title="Every distro speaks a different dialect"
            description="Same intent, different syntax. LinuxAtlas maps the differences so you never have to guess."
          />
          <Button href="/package-managers" variant="ghost" icon>
            Explore package managers
          </Button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-5 lg:gap-6">
          <div className="lg:col-span-2">
            <div className="glass rounded-xl divide-y divide-white/5">
              {packageManagers.map((p) => (
                <div key={p.slug} className="flex items-center justify-between px-5 py-4">
                  <span className="text-sm text-white/60">{p.distributionFamily}</span>
                  <span className="font-mono text-sm text-cyan">{p.command}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-white/35">
              Try it — install docker
            </p>
            <div className="glass-strong overflow-hidden rounded-xl">
              {dockerRows.map((row, i) => (
                <div
                  key={row.distro}
                  className={`flex items-center justify-between px-5 py-3.5 ${
                    i !== dockerRows.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <span className="text-sm text-white/50">{row.distro}</span>
                  <code className="font-mono text-sm text-cyan/90">{row.command}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
