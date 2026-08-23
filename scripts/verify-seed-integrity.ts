/**
 * Verifies lib/content/seed-data.ts is internally consistent, with zero
 * dependency on Prisma or a live database:
 *   - no duplicate slugs within any content type
 *   - every `related` reference points to a slug that actually exists
 *   - every distro/guide with MDX-backed prose has a matching content/*.mdx file
 *
 * Run with: npx tsx scripts/verify-seed-integrity.ts
 */
import fs from "node:fs";
import path from "node:path";
import { distributions, commands, packageManagers, guides } from "../lib/content/seed-data";

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.error(`  FAIL  ${msg}`);
};
const pass = (msg: string) => console.log(`  PASS  ${msg}`);

function checkUniqueSlugs(label: string, items: { slug: string }[]) {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const item of items) {
    if (seen.has(item.slug)) dupes.add(item.slug);
    seen.add(item.slug);
  }
  if (dupes.size > 0) {
    fail(`${label}: duplicate slugs found: ${[...dupes].join(", ")}`);
  } else {
    pass(`${label}: all ${items.length} slugs unique`);
  }
}

console.log("Checking for duplicate slugs...");
checkUniqueSlugs("distributions", distributions);
checkUniqueSlugs("commands", commands);
checkUniqueSlugs("packageManagers", packageManagers);
checkUniqueSlugs("guides", guides);

console.log("\nChecking related-content references resolve...");
const slugsByType = {
  DISTRIBUTION: new Set(distributions.map((d) => d.slug)),
  COMMAND: new Set(commands.map((c) => c.slug)),
  PACKAGE_MANAGER: new Set(packageManagers.map((p) => p.slug)),
  GUIDE: new Set(guides.map((g) => g.slug)),
};

type Related = { targetType: keyof typeof slugsByType; targetSlug: string };
function checkRelated(label: string, sourceSlug: string, related: Related[]) {
  for (const r of related) {
    if (!slugsByType[r.targetType].has(r.targetSlug)) {
      fail(`${label} "${sourceSlug}" -> ${r.targetType} "${r.targetSlug}" does not exist`);
    }
  }
}
for (const d of distributions) checkRelated("distribution", d.slug, d.related as Related[]);
for (const c of commands) checkRelated("command", c.slug, c.related as Related[]);
for (const p of packageManagers) checkRelated("package manager", p.slug, p.related as Related[]);
for (const g of guides) checkRelated("guide", g.slug, g.related as Related[]);
if (failures === 0) pass("every related-content edge resolves to a real slug");

console.log("\nChecking MDX coverage for distros and guides...");
const contentRoot = path.join(process.cwd(), "content");
for (const d of distributions) {
  const p = path.join(contentRoot, "distros", `${d.slug}.mdx`);
  if (!fs.existsSync(p)) fail(`distro "${d.slug}" has no content/distros/${d.slug}.mdx`);
}
for (const g of guides) {
  const p = path.join(contentRoot, "guides", `${g.slug}.mdx`);
  if (!fs.existsSync(p)) fail(`guide "${g.slug}" has no content/guides/${g.slug}.mdx`);
}
if (failures === 0) pass(`all ${distributions.length} distros and ${guides.length} guides have matching MDX files`);

console.log("\nChecking command examples reference valid distros (when set)...");
for (const c of commands) {
  for (const ex of c.examples) {
    if (ex.distributionSlug && !slugsByType.DISTRIBUTION.has(ex.distributionSlug)) {
      fail(`command "${c.slug}" example references unknown distro "${ex.distributionSlug}"`);
    }
  }
}
if (failures === 0) pass("all command examples reference valid distros (or none)");

console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
