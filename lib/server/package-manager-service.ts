import "server-only";
import { prisma } from "@/lib/db";
import type { PackageManagerDTO } from "@/lib/types";
import type { PackageManager } from "@prisma/client";

function toDTO(p: PackageManager): PackageManagerDTO {
  return {
    slug: p.slug,
    name: p.name,
    command: p.command,
    description: p.description,
    distributionFamily: p.distributionFamily,
    installCmd: p.installCmd,
    updateCmd: p.updateCmd,
    searchCmd: p.searchCmd,
    removeCmd: p.removeCmd,
    sourceUrl: p.sourceUrl,
    sourceName: p.sourceName,
  };
}

export async function getAllPackageManagers(): Promise<PackageManagerDTO[]> {
  const rows = await prisma.packageManager.findMany({ orderBy: { name: "asc" } });
  return rows.map(toDTO);
}

export async function getPackageManagerBySlug(slug: string): Promise<PackageManagerDTO | null> {
  const row = await prisma.packageManager.findUnique({ where: { slug } });
  return row ? toDTO(row) : null;
}

export async function getPackageManagerSlugs(): Promise<string[]> {
  const rows = await prisma.packageManager.findMany({ select: { slug: true } });
  return rows.map((r: { slug: string }) => r.slug);
}
