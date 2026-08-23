import "server-only";
import { prisma } from "@/lib/db";
import { getDistroMdx } from "@/lib/content/mdx";
import type { DistributionDTO, DistributionDetailDTO, RelatedItemDTO } from "@/lib/types";
import type { DistroFilter } from "@/lib/validation";
import { relatedContentToItems } from "@/lib/server/related-content";
import type { Distribution } from "@prisma/client";

function toDTO(d: Distribution): DistributionDTO {
  return {
    slug: d.slug,
    name: d.name,
    description: d.description,
    family: d.family,
    basedOn: d.basedOn,
    packageManager: d.packageManager,
    initSystem: d.initSystem,
    releaseModel: d.releaseModel,
    architectures: d.architectures,
    desktopEnvironments: d.desktopEnvironments,
    difficulty: d.difficulty,
    website: d.website,
    documentationUrl: d.documentationUrl,
    logo: d.logo,
    sourceUrl: d.sourceUrl,
    sourceName: d.sourceName,
  };
}

export async function getAllDistros(): Promise<DistributionDTO[]> {
  const rows = await prisma.distribution.findMany({ orderBy: { name: "asc" } });
  return rows.map(toDTO);
}

export async function filterDistros(filter: DistroFilter): Promise<DistributionDTO[]> {
  const difficultyMap = { beginner: "BEGINNER", intermediate: "INTERMEDIATE", advanced: "ADVANCED" } as const;
  const rows = await prisma.distribution.findMany({
    where: {
      family: filter.family ? { equals: filter.family, mode: "insensitive" } : undefined,
      packageManager: filter.packageManager ? { equals: filter.packageManager, mode: "insensitive" } : undefined,
      releaseModel: filter.releaseModel ? { contains: filter.releaseModel, mode: "insensitive" } : undefined,
      difficulty: filter.difficulty ? difficultyMap[filter.difficulty] : undefined,
    },
    orderBy: { name: "asc" },
  });
  return rows.map(toDTO);
}

export async function getDistroBySlug(slug: string): Promise<DistributionDetailDTO | null> {
  const row = await prisma.distribution.findUnique({
    where: { slug },
    include: {
      commandExamples: { include: { command: true }, orderBy: { order: "asc" } },
    },
  });
  if (!row) return null;

  const mdx = getDistroMdx(slug);
  const related = await getRelatedDistros(slug);

  return {
    ...toDTO(row),
    mdxSource: mdx?.content ?? null,
    tocSections: mdx?.sections ?? [],
    commandExamples: row.commandExamples.map((ex: { code: string; description: string }) => ({
      code: ex.code,
      description: ex.description,
    })),
    related,
  };
}

export async function getRelatedDistros(slug: string): Promise<RelatedItemDTO[]> {
  return relatedContentToItems("DISTRIBUTION", slug);
}

export async function getDistroSlugs(): Promise<string[]> {
  const rows = await prisma.distribution.findMany({ select: { slug: true } });
  return rows.map((r: { slug: string }) => r.slug);
}
