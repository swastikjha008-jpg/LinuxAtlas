import "server-only";
import type { SearchDocument } from "@/lib/types";
import { getAllDistros } from "@/lib/server/distro-service";
import { getAllCommands } from "@/lib/server/command-service";
import { getAllPackageManagers } from "@/lib/server/package-manager-service";
import { getAllGuides } from "@/lib/server/guide-service";

/**
 * Builds the full unified search index from every content type. Used both
 * by the local Fuse.js adapter (in-memory) and by scripts/sync as the
 * payload for a Meilisearch reindex — one function, two consumers.
 */
export async function buildSearchDocuments(): Promise<SearchDocument[]> {
  const [distros, commands, packageManagers, guides] = await Promise.all([
    getAllDistros(),
    getAllCommands(),
    getAllPackageManagers(),
    getAllGuides(),
  ]);

  const documents: SearchDocument[] = [
    ...distros.map((d) => ({
      id: `distro:${d.slug}`,
      type: "distro" as const,
      title: d.name,
      slug: d.slug,
      description: d.description,
      content: [d.family, d.basedOn, d.packageManager, d.releaseModel].filter(Boolean).join(" "),
      url: `/distros/${d.slug}`,
      tags: [d.family, d.packageManager, d.releaseModel, d.difficulty.toLowerCase()],
    })),
    ...commands.map((c) => ({
      id: `command:${c.slug}`,
      type: "command" as const,
      title: c.name,
      slug: c.slug,
      description: c.description,
      content: c.syntax,
      url: `/commands/${c.slug}`,
      tags: [c.category],
    })),
    ...packageManagers.map((p) => ({
      id: `package-manager:${p.slug}`,
      type: "package-manager" as const,
      title: p.name,
      slug: p.slug,
      description: p.description,
      content: p.distributionFamily,
      url: `/package-managers/${p.slug}`,
      tags: [p.distributionFamily],
    })),
    ...guides.map((g) => ({
      id: `guide:${g.slug}`,
      type: "guide" as const,
      title: g.title,
      slug: g.slug,
      description: g.description,
      content: g.category,
      url: `/guides/${g.slug}`,
      tags: [g.category, g.difficulty.toLowerCase()],
    })),
  ];

  return documents;
}
