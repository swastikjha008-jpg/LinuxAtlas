import Link from "next/link";
import type { Metadata } from "next";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { GlassCard } from "@/components/ui/GlassCard";
import { getAllDistros } from "@/lib/server/distro-service";
import { getAllCommands } from "@/lib/server/command-service";
import { getAllGuides } from "@/lib/server/guide-service";
import { search } from "@/lib/server/search-service";
import type { SearchResult, SearchResultType } from "@/lib/types";
import {
  HardDrive, Terminal, Package, BookOpen, GitCompare, ArrowUpRight, SearchX,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Explore — LinuxAtlas",
  description: "Search distributions, commands, package managers, and guides.",
};

const QUICK_NAV = [
  { label: "Distros", href: "/distros", icon: HardDrive },
  { label: "Commands", href: "/commands", icon: Terminal },
  { label: "Package Managers", href: "/package-managers", icon: Package },
  { label: "Guides", href: "/guides", icon: BookOpen },
  { label: "Compare", href: "/compare", icon: GitCompare },
];

const TYPE_META: Record<SearchResultType, { label: string; icon: typeof HardDrive }> = {
  distro: { label: "Distros", icon: HardDrive },
  command: { label: "Commands", icon: Terminal },
  "package-manager": { label: "Package Managers", icon: Package },
  guide: { label: "Guides", icon: BookOpen },
};

function groupResults(results: SearchResult[]) {
  const order: SearchResultType[] = ["distro", "command", "package-manager", "guide"];
  return order
    .map((type) => ({ type, items: results.filter((r) => r.type === type) }))
    .filter((g) => g.items.length > 0);
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim();

  return (
    <div className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">Explore Linux</h1>
        <p className="mx-auto mt-3 max-w-lg text-white/55">
          Search distributions, commands, package managers, guides...
        </p>
        <div className="mt-8">
          <SearchTrigger variant="bar" placeholder="Search distributions, commands, package managers, guides..." />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {QUICK_NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60 transition-colors hover:border-cyan/30 hover:text-cyan"
            >
              <n.icon className="h-3.5 w-3.5" />
              {n.label}
            </Link>
          ))}
        </div>
      </div>

      {query ? <SearchResultsSection query={query} /> : <DefaultSections />}
    </div>
  );
}

async function SearchResultsSection({ query }: { query: string }) {
  const results = await search(query, 40);
  const grouped = groupResults(results);

  return (
    <div className="mx-auto mt-16 max-w-6xl">
      <h2 className="font-display text-xl font-semibold text-white">
        Search results for <span className="text-cyan">&ldquo;{query}&rdquo;</span>
      </h2>
      <p className="mt-1 text-sm text-white/40">{results.length} result{results.length === 1 ? "" : "s"}</p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-14 text-center">
          <SearchX className="mx-auto h-8 w-8 text-white/20" />
          <p className="mt-3 text-white/55">
            No results found for <span className="text-white/85">&ldquo;{query}&rdquo;</span>
          </p>
          <p className="mt-2 text-sm text-white/35">
            Try another spelling, a distro name, a command, a package manager, or a guide topic.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {grouped.map((group) => {
            const meta = TYPE_META[group.type];
            return (
              <div key={group.type}>
                <p className="mb-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-white/35">
                  <meta.icon className="h-3.5 w-3.5" />
                  {meta.label}
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      className="glass rounded-xl p-4 transition-colors hover:border-cyan/25"
                    >
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-white/50">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

async function DefaultSections() {
  const [distros, commands, guides] = await Promise.all([getAllDistros(), getAllCommands(), getAllGuides()]);

  return (
    <>
      <div className="mx-auto mt-20 max-w-6xl">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold text-white">Popular Distributions</h2>
          <Link href="/distros" className="flex items-center gap-1 text-sm text-white/45 hover:text-cyan">
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {distros.slice(0, 4).map((d) => (
            <Link key={d.slug} href={`/distros/${d.slug}`}>
              <GlassCard glow className="h-full">
                <h3 className="font-display text-base font-semibold text-white">{d.name}</h3>
                <p className="mt-1.5 text-sm text-white/50">{d.description}</p>
                <p className="mt-3 font-mono text-xs text-cyan/80">{d.packageManager}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold text-white">Popular Commands</h2>
          <Link href="/commands" className="flex items-center gap-1 text-sm text-white/45 hover:text-cyan">
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {commands.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/commands/${c.slug}`}
              className="glass rounded-xl p-5 transition-colors hover:border-cyan/25"
            >
              <p className="font-mono text-base text-cyan">{c.name}</p>
              <p className="mt-1.5 text-sm text-white/50">{c.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold text-white">Latest Guides</h2>
          <Link href="/guides" className="flex items-center gap-1 text-sm text-white/45 hover:text-cyan">
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {guides.slice(0, 6).map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-5 py-4 transition-colors hover:border-cyan/25 hover:bg-cyan/[0.03]"
            >
              <div>
                <span className="text-sm text-white/70 group-hover:text-white">{g.title}</span>
                <p className="mt-0.5 text-xs text-white/35">{g.category} · {g.readMinutes} min read</p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25 transition-colors group-hover:text-cyan" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
