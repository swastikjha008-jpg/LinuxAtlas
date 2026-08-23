import "server-only";
import { prisma } from "@/lib/db";
import type { CompareResult, DistributionDTO, Difficulty } from "@/lib/types";

// Mirrors the fields prisma.distribution.findMany() returns — spelled out
// explicitly so this file type-checks correctly whether or not `prisma
// generate` has run yet (see docs/backend.md). Once generated, Prisma's own
// `Distribution` type satisfies this shape structurally; nothing to change.
interface DistributionRow {
  slug: string; name: string; description: string; family: string; basedOn: string | null;
  packageManager: string; initSystem: string; releaseModel: string; architectures: string[];
  desktopEnvironments: string[]; difficulty: Difficulty; website: string | null;
  documentationUrl: string | null; logo: string | null; sourceUrl: string | null; sourceName: string | null;
}

function toDTO(d: DistributionRow): DistributionDTO {
  return { ...d };
}

/**
 * Returns the given distros (in the order requested) plus a set of
 * comparison rows already pivoted for a table: one row per attribute, one
 * column per distro slug. Missing slugs are silently dropped rather than
 * erroring — the UI shows whatever resolved.
 */
export async function compareDistros(slugs: string[]): Promise<CompareResult> {
  const rows: DistributionRow[] = await prisma.distribution.findMany({ where: { slug: { in: slugs } } });
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const ordered = slugs.map((s) => bySlug.get(s)).filter((d): d is DistributionRow => Boolean(d));

  const distros = ordered.map(toDTO);

  const attributeRows: { label: string; get: (d: DistributionRow) => string }[] = [
    { label: "Base", get: (d) => d.basedOn ?? d.family },
    { label: "Package Manager", get: (d) => d.packageManager },
    { label: "Release Model", get: (d) => d.releaseModel },
    { label: "Init System", get: (d) => d.initSystem },
    { label: "Architecture", get: (d) => d.architectures.join(", ") },
    { label: "Desktop Environments", get: (d) => (d.desktopEnvironments.length ? d.desktopEnvironments.join(", ") : "—") },
    { label: "Difficulty", get: (d) => d.difficulty.charAt(0) + d.difficulty.slice(1).toLowerCase() },
  ];

  const compareRows = attributeRows.map((row) => ({
    label: row.label,
    values: Object.fromEntries(ordered.map((d) => [d.slug, row.get(d)])),
  }));

  return { distros, rows: compareRows };
}
