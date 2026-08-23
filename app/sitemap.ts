import type { MetadataRoute } from "next";
import { getAllDistros } from "@/lib/server/distro-service";
import { getAllCommands } from "@/lib/server/command-service";
import { getAllPackageManagers } from "@/lib/server/package-manager-service";
import { getAllGuides } from "@/lib/server/guide-service";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [distros, commands, packageManagers, guides] = await Promise.all([
    getAllDistros(),
    getAllCommands(),
    getAllPackageManagers(),
    getAllGuides(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/explore`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/distros`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/commands`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/package-managers`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/guides`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/compare`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...distros.map((d) => ({ url: `${BASE_URL}/distros/${d.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...commands.map((c) => ({ url: `${BASE_URL}/commands/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...packageManagers.map((p) => ({ url: `${BASE_URL}/package-managers/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...guides.map((g) => ({ url: `${BASE_URL}/guides/${g.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
