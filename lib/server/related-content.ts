import "server-only";
import { prisma } from "@/lib/db";
import type { ContentType, RelatedItemDTO } from "@/lib/types";

const URL_PREFIX: Record<ContentType, string> = {
  DISTRIBUTION: "/distros",
  COMMAND: "/commands",
  PACKAGE_MANAGER: "/package-managers",
  GUIDE: "/guides",
};

// Mirrors prisma.relatedContent.findMany()'s row shape — see
// lib/server/compare-service.ts's DistributionRow for why this is spelled
// out explicitly rather than inferred from the (currently ungenerated)
// Prisma client.
interface RelatedEdge {
  targetType: ContentType;
  targetSlug: string;
}

/**
 * Resolves the generic RelatedContent edges for one content item into
 * displayable {title, description, url} cards, batching one query per
 * target type rather than N+1-ing per edge.
 */
export async function relatedContentToItems(
  sourceType: ContentType,
  sourceSlug: string
): Promise<RelatedItemDTO[]> {
  const edges: RelatedEdge[] = await prisma.relatedContent.findMany({
    where: { sourceType, sourceSlug },
    orderBy: { order: "asc" },
  });
  if (edges.length === 0) return [];

  const slugsByType = new Map<ContentType, string[]>();
  for (const e of edges) {
    const list = slugsByType.get(e.targetType) ?? [];
    list.push(e.targetSlug);
    slugsByType.set(e.targetType, list);
  }

  const resolved = new Map<string, RelatedItemDTO>();

  const distroSlugs = slugsByType.get("DISTRIBUTION");
  if (distroSlugs?.length) {
    const rows = await prisma.distribution.findMany({ where: { slug: { in: distroSlugs } } });
    for (const r of rows) {
      resolved.set(`DISTRIBUTION:${r.slug}`, {
        type: "distro", slug: r.slug, title: r.name, description: r.description, url: `${URL_PREFIX.DISTRIBUTION}/${r.slug}`,
      });
    }
  }

  const commandSlugs = slugsByType.get("COMMAND");
  if (commandSlugs?.length) {
    const rows = await prisma.command.findMany({ where: { slug: { in: commandSlugs } } });
    for (const r of rows) {
      resolved.set(`COMMAND:${r.slug}`, {
        type: "command", slug: r.slug, title: r.name, description: r.description, url: `${URL_PREFIX.COMMAND}/${r.slug}`,
      });
    }
  }

  const pmSlugs = slugsByType.get("PACKAGE_MANAGER");
  if (pmSlugs?.length) {
    const rows = await prisma.packageManager.findMany({ where: { slug: { in: pmSlugs } } });
    for (const r of rows) {
      resolved.set(`PACKAGE_MANAGER:${r.slug}`, {
        type: "package-manager", slug: r.slug, title: r.name, description: r.description, url: `${URL_PREFIX.PACKAGE_MANAGER}/${r.slug}`,
      });
    }
  }

  const guideSlugs = slugsByType.get("GUIDE");
  if (guideSlugs?.length) {
    const rows = await prisma.guide.findMany({ where: { slug: { in: guideSlugs } } });
    for (const r of rows) {
      resolved.set(`GUIDE:${r.slug}`, {
        type: "guide", slug: r.slug, title: r.title, description: r.description, url: `${URL_PREFIX.GUIDE}/${r.slug}`,
      });
    }
  }

  // preserve the edges' own order rather than the batched-query order
  return edges
    .map((e) => resolved.get(`${e.targetType}:${e.targetSlug}`))
    .filter((x): x is RelatedItemDTO => Boolean(x));
}
