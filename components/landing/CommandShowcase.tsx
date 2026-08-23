import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { getAllCommands } from "@/lib/server/command-service";

export async function CommandShowcase() {
  const commands = await getAllCommands();
  const featured = commands.slice(0, 6);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader eyebrow="Commands" title="Learn commands, not just syntax" />
          <Button href="/commands" variant="ghost" icon>
            Explore commands
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <div
              key={c.slug}
              className="glass rounded-xl p-5 transition-colors duration-200 hover:border-cyan/25"
            >
              <p className="font-mono text-base text-cyan">{c.name}</p>
              <p className="mt-1.5 text-sm text-white/50">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
