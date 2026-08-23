/**
 * Loads the ENTIRE seed dataset into a live Postgres instance using the raw
 * `pg` driver against a hand-written DDL that mirrors prisma/schema.prisma.
 *
 * This is a REFERENCE/DIAGNOSTIC script, not part of the normal workflow —
 * normally you'd just run `npm run prisma:migrate && npm run prisma:seed`.
 * It exists because this project's original dev sandbox couldn't reach
 * binaries.prisma.sh (network policy) to run the Prisma CLI at all, so this
 * was how the full schema + full dataset got proven end-to-end there.
 * Kept in case you ever hit the same kind of restricted-network problem.
 *
 * Run with: DATABASE_URL="postgresql://..." npx tsx scripts/verify-full-load.ts
 */
import { Client } from "pg";
import { distributions, commands, packageManagers, guides } from "../lib/content/seed-data";

const DDL = `
DROP TABLE IF EXISTS "RelatedContent" CASCADE;
DROP TABLE IF EXISTS "CommandExample" CASCADE;
DROP TABLE IF EXISTS "CommandOption" CASCADE;
DROP TABLE IF EXISTS "Command" CASCADE;
DROP TABLE IF EXISTS "PackageManager" CASCADE;
DROP TABLE IF EXISTS "Guide" CASCADE;
DROP TABLE IF EXISTS "DistributionSection" CASCADE;
DROP TABLE IF EXISTS "Distribution" CASCADE;
DROP TYPE IF EXISTS "Difficulty" CASCADE;
DROP TYPE IF EXISTS "ContentType" CASCADE;

CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
CREATE TYPE "ContentType" AS ENUM ('DISTRIBUTION', 'COMMAND', 'PACKAGE_MANAGER', 'GUIDE');

CREATE TABLE "Distribution" (
  id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL,
  family TEXT NOT NULL, "basedOn" TEXT, "packageManager" TEXT NOT NULL, "initSystem" TEXT NOT NULL,
  "releaseModel" TEXT NOT NULL, architectures TEXT[] NOT NULL, "desktopEnvironments" TEXT[] NOT NULL,
  difficulty "Difficulty" NOT NULL, website TEXT, "documentationUrl" TEXT, logo TEXT,
  "sourceUrl" TEXT, "sourceName" TEXT
);
CREATE INDEX ON "Distribution" (family);
CREATE INDEX ON "Distribution" ("packageManager");
CREATE INDEX ON "Distribution" (difficulty);

CREATE TABLE "Command" (
  id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL,
  syntax TEXT NOT NULL, category TEXT NOT NULL
);
CREATE INDEX ON "Command" (category);

CREATE TABLE "CommandExample" (
  id TEXT PRIMARY KEY, "commandId" TEXT NOT NULL REFERENCES "Command"(id) ON DELETE CASCADE,
  code TEXT NOT NULL, description TEXT NOT NULL,
  "distributionId" TEXT REFERENCES "Distribution"(id) ON DELETE SET NULL, "order" INT NOT NULL DEFAULT 0
);

CREATE TABLE "CommandOption" (
  id TEXT PRIMARY KEY, "commandId" TEXT NOT NULL REFERENCES "Command"(id) ON DELETE CASCADE,
  flag TEXT NOT NULL, description TEXT NOT NULL, "order" INT NOT NULL DEFAULT 0
);

CREATE TABLE "PackageManager" (
  id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL, command TEXT NOT NULL,
  description TEXT NOT NULL, "distributionFamily" TEXT NOT NULL, "installCmd" TEXT NOT NULL,
  "updateCmd" TEXT NOT NULL, "searchCmd" TEXT NOT NULL, "removeCmd" TEXT NOT NULL,
  "sourceUrl" TEXT, "sourceName" TEXT
);

CREATE TABLE "Guide" (
  id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL,
  category TEXT NOT NULL, difficulty "Difficulty" NOT NULL, "readMinutes" INT NOT NULL
);
CREATE INDEX ON "Guide" (category);
CREATE INDEX ON "Guide" (difficulty);

CREATE TABLE "RelatedContent" (
  id TEXT PRIMARY KEY, "sourceType" "ContentType" NOT NULL, "sourceSlug" TEXT NOT NULL,
  "targetType" "ContentType" NOT NULL, "targetSlug" TEXT NOT NULL,
  UNIQUE ("sourceType", "sourceSlug", "targetType", "targetSlug")
);
CREATE INDEX ON "RelatedContent" ("sourceType", "sourceSlug");
`;

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("Set DATABASE_URL before running this script, e.g.:");
    console.error('  DATABASE_URL="postgresql://user:pass@localhost:5432/linuxatlas" npx tsx scripts/verify-full-load.ts');
    process.exit(1);
  }
  const client = new Client({ connectionString });
  await client.connect();
  console.log("Connected. Applying hand-derived DDL...");
  await client.query(DDL);

  let idCounter = 0;
  const nextId = (prefix: string) => `${prefix}_${(idCounter++).toString(36)}`;

  console.log(`Inserting ${distributions.length} distributions...`);
  const distroIds = new Map<string, string>();
  for (const d of distributions) {
    const id = nextId("dist");
    distroIds.set(d.slug, id);
    await client.query(
      `INSERT INTO "Distribution" (id, slug, name, description, family, "basedOn", "packageManager", "initSystem", "releaseModel", architectures, "desktopEnvironments", difficulty, website, "documentationUrl", logo, "sourceUrl", "sourceName")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [id, d.slug, d.name, d.description, d.family, d.basedOn, d.packageManager, d.initSystem, d.releaseModel, d.architectures, d.desktopEnvironments, d.difficulty, d.website, d.documentationUrl, d.logo, d.sourceUrl, d.sourceName]
    );
  }

  console.log(`Inserting ${commands.length} commands (with examples + options)...`);
  const commandIds = new Map<string, string>();
  for (const c of commands) {
    const id = nextId("cmd");
    commandIds.set(c.slug, id);
    await client.query(
      `INSERT INTO "Command" (id, slug, name, description, syntax, category) VALUES ($1,$2,$3,$4,$5,$6)`,
      [id, c.slug, c.name, c.description, c.syntax, c.category]
    );
    for (const [i, ex] of c.examples.entries()) {
      await client.query(
        `INSERT INTO "CommandExample" (id, "commandId", code, description, "distributionId", "order") VALUES ($1,$2,$3,$4,$5,$6)`,
        [nextId("ex"), id, ex.code, ex.description, ex.distributionSlug ? distroIds.get(ex.distributionSlug) : null, i]
      );
    }
    for (const [i, opt] of c.options.entries()) {
      await client.query(
        `INSERT INTO "CommandOption" (id, "commandId", flag, description, "order") VALUES ($1,$2,$3,$4,$5)`,
        [nextId("opt"), id, opt.flag, opt.description, i]
      );
    }
  }

  console.log(`Inserting ${packageManagers.length} package managers...`);
  for (const p of packageManagers) {
    await client.query(
      `INSERT INTO "PackageManager" (id, slug, name, command, description, "distributionFamily", "installCmd", "updateCmd", "searchCmd", "removeCmd", "sourceUrl", "sourceName")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [nextId("pm"), p.slug, p.name, p.command, p.description, p.distributionFamily, p.installCmd, p.updateCmd, p.searchCmd, p.removeCmd, p.sourceUrl, p.sourceName]
    );
  }

  console.log(`Inserting ${guides.length} guides...`);
  for (const g of guides) {
    await client.query(
      `INSERT INTO "Guide" (id, slug, title, description, category, difficulty, "readMinutes") VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [nextId("guide"), g.slug, g.title, g.description, g.category, g.difficulty, g.readMinutes]
    );
  }

  console.log("Inserting related-content edges...");
  let edgeCount = 0;
  const allSources: { type: string; slug: string; related: { targetType: string; targetSlug: string }[] }[] = [
    ...distributions.map((d) => ({ type: "DISTRIBUTION", slug: d.slug, related: d.related })),
    ...commands.map((c) => ({ type: "COMMAND", slug: c.slug, related: c.related })),
    ...packageManagers.map((p) => ({ type: "PACKAGE_MANAGER", slug: p.slug, related: p.related })),
    ...guides.map((g) => ({ type: "GUIDE", slug: g.slug, related: g.related })),
  ];
  for (const src of allSources) {
    for (const r of src.related) {
      await client.query(
        `INSERT INTO "RelatedContent" (id, "sourceType", "sourceSlug", "targetType", "targetSlug") VALUES ($1,$2,$3,$4,$5)`,
        [nextId("rel"), src.type, src.slug, r.targetType, r.targetSlug]
      );
      edgeCount++;
    }
  }
  console.log(`  -> ${edgeCount} edges inserted`);

  console.log("\n--- Sanity queries ---\n");

  const totalRows = await client.query(`
    SELECT
      (SELECT count(*) FROM "Distribution") AS distros,
      (SELECT count(*) FROM "Command") AS commands,
      (SELECT count(*) FROM "PackageManager") AS package_managers,
      (SELECT count(*) FROM "Guide") AS guides,
      (SELECT count(*) FROM "RelatedContent") AS related_edges
  `);
  console.table(totalRows.rows);

  const archFamily = await client.query(`SELECT slug, name, difficulty FROM "Distribution" WHERE family = 'Arch' ORDER BY name`);
  console.log("Arch-family distros:");
  console.table(archFamily.rows);

  const relatedToArch = await client.query(`
    SELECT rc."targetSlug", d.name FROM "RelatedContent" rc
    JOIN "Distribution" d ON d.slug = rc."targetSlug" AND rc."targetType" = 'DISTRIBUTION'
    WHERE rc."sourceType" = 'DISTRIBUTION' AND rc."sourceSlug" = 'arch-linux'
  `);
  console.log("Related to arch-linux:");
  console.table(relatedToArch.rows);

  const systemctlExamples = await client.query(`
    SELECT ce.code, ce.description FROM "CommandExample" ce
    JOIN "Command" c ON c.id = ce."commandId"
    WHERE c.slug = 'systemctl' ORDER BY ce."order"
  `);
  console.log("systemctl examples:");
  console.table(systemctlExamples.rows);

  await client.end();
  console.log("\nFull dataset loaded and queried successfully against live Postgres.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
