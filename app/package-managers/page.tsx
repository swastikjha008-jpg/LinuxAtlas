import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { getAllPackageManagers } from "@/lib/server/package-manager-service";
import { getAllDistros } from "@/lib/server/distro-service";

export const metadata: Metadata = {
  title: "Package Managers — LinuxAtlas",
  description: "Understand apt, pacman, dnf, apk, zypper, and more.",
};

export default async function PackageManagersPage() {
  const [packageManagers, distros] = await Promise.all([getAllPackageManagers(), getAllDistros()]);

  const dockerRow = packageManagers
    .map((p) => {
      // docker's install command varies by manager the same way any package does
      const dockerPackage =
        p.slug === "apt" ? "docker.io" : p.slug === "pacman" ? "docker" : p.slug === "dnf" ? "docker" : p.slug === "apk" ? "docker" : "docker";
      const distro = distros.find((d) => d.packageManager === p.command);
      return { distro: distro?.name ?? p.distributionFamily, command: p.installCmd.replace("<package>", dockerPackage) };
    });

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Package Managers"
        title="Every distro speaks a different dialect"
        description="Same intent, different syntax. Here's how the major package managers compare."
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packageManagers.map((p) => (
            <Link key={p.slug} href={`/package-managers/${p.slug}`} className="glass rounded-xl p-5 transition-colors hover:border-cyan/25">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">{p.name}</h3>
                <span className="font-mono text-xs text-cyan/80">{p.command}</span>
              </div>
              <p className="mt-1.5 text-sm text-white/50">{p.distributionFamily}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/45">{p.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-white/35">
            Try it — install docker
          </p>
          <div className="glass-strong overflow-hidden rounded-xl">
            {dockerRow.map((row, i) => (
              <div
                key={row.distro}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i !== dockerRow.length - 1 ? "border-b border-white/5" : ""
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
  );
}
