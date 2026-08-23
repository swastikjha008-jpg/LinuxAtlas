import "server-only";
import { prisma } from "@/lib/db";
import type { CommandDTO, CommandDetailDTO } from "@/lib/types";
import { relatedContentToItems } from "@/lib/server/related-content";
import type { Command } from "@prisma/client";

function toDTO(c: Command): CommandDTO {
  return {
    slug: c.slug,
    name: c.name,
    description: c.description,
    syntax: c.syntax,
    category: c.category,
    sourceUrl: c.sourceUrl,
    sourceName: c.sourceName,
  };
}

export async function getAllCommands(): Promise<CommandDTO[]> {
  const rows = await prisma.command.findMany({ orderBy: { name: "asc" } });
  return rows.map(toDTO);
}

export async function getCommandBySlug(slug: string): Promise<CommandDetailDTO | null> {
  const row = await prisma.command.findUnique({
    where: { slug },
    include: {
      examples: { orderBy: { order: "asc" } },
      options: { orderBy: { order: "asc" } },
    },
  });
  if (!row) return null;

  const related = await relatedContentToItems("COMMAND", slug);

  return {
    ...toDTO(row),
    examples: row.examples.map((e: { code: string; description: string }) => ({
      code: e.code,
      description: e.description,
      distributionSlug: null,
    })),
    options: row.options.map((o: { flag: string; description: string }) => ({ flag: o.flag, description: o.description })),
    related,
  };
}

export async function getCommandSlugs(): Promise<string[]> {
  const rows = await prisma.command.findMany({ select: { slug: true } });
  return rows.map((r: { slug: string }) => r.slug);
}
