import "server-only";
import { prisma } from "@/lib/db";
import { getGuideMdx } from "@/lib/content/mdx";
import type { GuideDTO, GuideDetailDTO } from "@/lib/types";
import { relatedContentToItems } from "@/lib/server/related-content";
import type { Guide } from "@prisma/client";

function toDTO(g: Guide): GuideDTO {
  return {
    slug: g.slug,
    title: g.title,
    description: g.description,
    category: g.category,
    difficulty: g.difficulty,
    readMinutes: g.readMinutes,
  };
}

export async function getAllGuides(): Promise<GuideDTO[]> {
  const rows = await prisma.guide.findMany({ orderBy: { title: "asc" } });
  return rows.map(toDTO);
}

export async function getGuideBySlug(slug: string): Promise<GuideDetailDTO | null> {
  const row = await prisma.guide.findUnique({ where: { slug } });
  if (!row) return null;

  const mdx = getGuideMdx(slug);
  const related = await relatedContentToItems("GUIDE", slug);

  return {
    ...toDTO(row),
    mdxSource: mdx?.content ?? null,
    tocSections: mdx?.sections ?? [],
    related,
  };
}

export async function getGuideSlugs(): Promise<string[]> {
  const rows = await prisma.guide.findMany({ select: { slug: true } });
  return rows.map((r: { slug: string }) => r.slug);
}
