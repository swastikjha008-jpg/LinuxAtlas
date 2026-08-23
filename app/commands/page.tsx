import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { getAllCommands } from "@/lib/server/command-service";

export const metadata: Metadata = {
  title: "Commands — LinuxAtlas",
  description: "Learn Linux commands with practical examples and explanations.",
};

export default async function CommandsPage() {
  const commands = await getAllCommands();

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Commands"
        title="The command encyclopedia"
        description="Every command, explained with real syntax, flags, and examples — not just a man page dump."
      />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {commands.map((c) => (
            <Link
              key={c.slug}
              href={`/commands/${c.slug}`}
              className="glass rounded-xl p-5 transition-colors hover:border-cyan/25"
            >
              <p className="font-mono text-base text-cyan">{c.name}</p>
              <p className="mt-1.5 text-sm text-white/50">{c.description}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-white/30">{c.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
