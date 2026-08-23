import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HardDrive, Terminal, Package, BookOpen, GitCompare } from "lucide-react";

const FEATURES = [
  { icon: HardDrive, title: "Distributions", desc: "Explore Linux distributions and understand what makes each one different.", href: "/distros" },
  { icon: Terminal, title: "Commands", desc: "Learn Linux commands with practical examples and explanations.", href: "/commands" },
  { icon: Package, title: "Package Managers", desc: "Understand apt, pacman, dnf, apk, zypper, and more.", href: "/package-managers" },
  { icon: BookOpen, title: "Guides", desc: "Step-by-step guides for learning and working with Linux.", href: "/guides" },
  { icon: GitCompare, title: "Compare", desc: "Compare distributions, package managers, release models, desktop environments, and more.", href: "/compare" },
];

export function FeatureGrid() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Why LinuxAtlas"
          title="One place for everything Linux."
          description="Linux knowledge is scattered across distribution websites, wikis, manuals, forums, and package documentation. LinuxAtlas brings the most useful information into one consistent, searchable experience."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <GlassCard key={f.title} glow className="group">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-cyan/20 bg-cyan/[0.06] text-cyan">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
