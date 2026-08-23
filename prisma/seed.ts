/**
 * Seeds Postgres from lib/content/seed-data.ts — the same dataset verified
 * by scripts/verify-seed-integrity.ts and scripts/verify-full-load.ts.
 *
 * Safe to rerun: every insert is an upsert keyed on the stable slug, so
 * running this twice updates existing rows instead of duplicating them.
 *
 *   npx prisma db seed
 */
import { PrismaClient, ContentType } from "@prisma/client";
import { distributions, commands, packageManagers, guides } from "../lib/content/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${distributions.length} distributions...`);
  const distroIdBySlug = new Map<string, string>();
  for (const d of distributions) {
    const row = await prisma.distribution.upsert({
      where: { slug: d.slug },
      update: {
        name: d.name, description: d.description, family: d.family, basedOn: d.basedOn,
        packageManager: d.packageManager, initSystem: d.initSystem, releaseModel: d.releaseModel,
        architectures: d.architectures, desktopEnvironments: d.desktopEnvironments, difficulty: d.difficulty,
        website: d.website, documentationUrl: d.documentationUrl, logo: d.logo,
        sourceUrl: d.sourceUrl, sourceName: d.sourceName, lastVerifiedAt: new Date(),
      },
      create: {
        slug: d.slug, name: d.name, description: d.description, family: d.family, basedOn: d.basedOn,
        packageManager: d.packageManager, initSystem: d.initSystem, releaseModel: d.releaseModel,
        architectures: d.architectures, desktopEnvironments: d.desktopEnvironments, difficulty: d.difficulty,
        website: d.website, documentationUrl: d.documentationUrl, logo: d.logo,
        sourceUrl: d.sourceUrl, sourceName: d.sourceName, lastVerifiedAt: new Date(),
      },
    });
    distroIdBySlug.set(d.slug, row.id);
  }

  console.log(`Seeding ${commands.length} commands (with examples + options)...`);
  const commandIdBySlug = new Map<string, string>();
  for (const c of commands) {
    const row = await prisma.command.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description, syntax: c.syntax, category: c.category },
      create: { slug: c.slug, name: c.name, description: c.description, syntax: c.syntax, category: c.category },
    });
    commandIdBySlug.set(c.slug, row.id);

    // examples/options don't have natural unique keys — replace wholesale on
    // reseed rather than trying to diff them individually.
    await prisma.commandExample.deleteMany({ where: { commandId: row.id } });
    await prisma.commandOption.deleteMany({ where: { commandId: row.id } });

    await prisma.commandExample.createMany({
      data: c.examples.map((ex, order) => ({
        commandId: row.id,
        code: ex.code,
        description: ex.description,
        distributionId: ex.distributionSlug ? distroIdBySlug.get(ex.distributionSlug) : null,
        order,
      })),
    });
    await prisma.commandOption.createMany({
      data: c.options.map((opt, order) => ({ commandId: row.id, flag: opt.flag, description: opt.description, order })),
    });
  }

  console.log(`Seeding ${packageManagers.length} package managers...`);
  for (const p of packageManagers) {
    await prisma.packageManager.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name, command: p.command, description: p.description, distributionFamily: p.distributionFamily,
        installCmd: p.installCmd, updateCmd: p.updateCmd, searchCmd: p.searchCmd, removeCmd: p.removeCmd,
        sourceUrl: p.sourceUrl, sourceName: p.sourceName,
      },
      create: {
        slug: p.slug, name: p.name, command: p.command, description: p.description, distributionFamily: p.distributionFamily,
        installCmd: p.installCmd, updateCmd: p.updateCmd, searchCmd: p.searchCmd, removeCmd: p.removeCmd,
        sourceUrl: p.sourceUrl, sourceName: p.sourceName,
      },
    });
  }

  console.log(`Seeding ${guides.length} guides...`);
  for (const g of guides) {
    await prisma.guide.upsert({
      where: { slug: g.slug },
      update: { title: g.title, description: g.description, category: g.category, difficulty: g.difficulty, readMinutes: g.readMinutes },
      create: { slug: g.slug, title: g.title, description: g.description, category: g.category, difficulty: g.difficulty, readMinutes: g.readMinutes },
    });
  }

  console.log("Seeding related-content edges...");
  await prisma.relatedContent.deleteMany({});
  type Source = { type: ContentType; slug: string; related: { targetType: ContentType; targetSlug: string }[] };
  const allSources: Source[] = [
    ...distributions.map((d) => ({ type: ContentType.DISTRIBUTION, slug: d.slug, related: d.related as any })),
    ...commands.map((c) => ({ type: ContentType.COMMAND, slug: c.slug, related: c.related as any })),
    ...packageManagers.map((p) => ({ type: ContentType.PACKAGE_MANAGER, slug: p.slug, related: p.related as any })),
    ...guides.map((g) => ({ type: ContentType.GUIDE, slug: g.slug, related: g.related as any })),
  ];
  let edgeCount = 0;
  for (const src of allSources) {
    for (const r of src.related) {
      await prisma.relatedContent.create({
        data: { sourceType: src.type, sourceSlug: src.slug, targetType: r.targetType, targetSlug: r.targetSlug },
      });
      edgeCount++;
    }
  }

  console.log(`\nDone: ${distributions.length} distros, ${commands.length} commands, ${packageManagers.length} package managers, ${guides.length} guides, ${edgeCount} related-content edges.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
