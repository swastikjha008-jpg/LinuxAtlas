/**
 * Exercises the ACTUAL LocalSearchAdapter class the app ships with —
 * against documents built directly from lib/content/seed-data.ts instead of
 * through Prisma (which needs `prisma generate`, blocked in this sandbox).
 * This proves the ranking/matching logic itself is correct; wiring it to
 * live Postgres data is a one-line swap (buildSearchDocuments() in
 * lib/server/search-index.ts already does exactly that in production).
 *
 * Run with: npx tsx scripts/verify-search.ts
 */
import { LocalSearchAdapter } from "../lib/search/local-adapter";
import { distributions, commands, packageManagers, guides } from "../lib/content/seed-data";
import type { SearchDocument } from "../lib/types";

const documents: SearchDocument[] = [
  ...distributions.map((d) => ({
    id: `distro:${d.slug}`, type: "distro" as const, title: d.name, slug: d.slug,
    description: d.description, content: [d.family, d.basedOn, d.packageManager, d.releaseModel].filter(Boolean).join(" "),
    url: `/distros/${d.slug}`, tags: [d.family, d.packageManager, d.releaseModel, d.difficulty.toLowerCase()],
  })),
  ...commands.map((c) => ({
    id: `command:${c.slug}`, type: "command" as const, title: c.name, slug: c.slug,
    description: c.description, content: c.syntax, url: `/commands/${c.slug}`, tags: [c.category],
  })),
  ...packageManagers.map((p) => ({
    id: `package-manager:${p.slug}`, type: "package-manager" as const, title: p.name, slug: p.slug,
    description: p.description, content: p.distributionFamily, url: `/package-managers/${p.slug}`, tags: [p.distributionFamily],
  })),
  ...guides.map((g) => ({
    id: `guide:${g.slug}`, type: "guide" as const, title: g.title, slug: g.slug,
    description: g.description, content: g.category, url: `/guides/${g.slug}`, tags: [g.category, g.difficulty.toLowerCase()],
  })),
];

const adapter = new LocalSearchAdapter(documents);
let failures = 0;

async function expectTopResult(query: string, expectedSlug: string, expectedType: string) {
  const results = await adapter.search(query, 10);
  const top = results[0];
  const ok = top && top.slug === expectedSlug && top.type === expectedType;
  console.log(`${ok ? "  PASS" : "  FAIL"}  search("${query}") -> top result: ${top ? `${top.type}/${top.slug}` : "(none)"}  [expected ${expectedType}/${expectedSlug}]`);
  if (!ok) failures++;
}

async function expectAnyResult(query: string, expectedSlug: string, expectedType: string, label: string) {
  const results = await adapter.search(query, 20);
  const found = results.some((r) => r.slug === expectedSlug && r.type === expectedType);
  console.log(`${found ? "  PASS" : "  FAIL"}  ${label}: search("${query}") includes ${expectedType}/${expectedSlug} -> ${found}`);
  if (!found) failures++;
}

async function expectEmpty(query: string, label: string) {
  const results = await adapter.search(query, 10);
  const ok = results.length === 0;
  console.log(`${ok ? "  PASS" : "  FAIL"}  ${label}: search("${query}") -> ${results.length} results (expected 0)`);
  if (!ok) failures++;
}

async function main() {
  console.log(`Indexed ${documents.length} documents (${adapter.size} in Fuse index).\n`);

  console.log("Exact title matches:");
  await expectTopResult("Arch Linux", "arch-linux", "distro");
  await expectTopResult("systemctl", "systemctl", "command");
  await expectTopResult("pacman", "pacman", "package-manager");

  console.log("\nPartial / fuzzy matches:");
  await expectAnyResult("arch", "arch-linux", "distro", "partial name");
  await expectAnyResult("filesystem", "linux-filesystem-explained", "guide", "partial guide title");
  await expectAnyResult("systemctl", "systemd-basics", "guide", "cross-type: command query surfaces related guide via tags/content");

  console.log("\nTypo tolerance:");
  await expectAnyResult("systemclt", "systemctl", "command", "one-letter transposition");
  await expectAnyResult("ubunto", "ubuntu", "distro", "common misspelling");

  console.log("\nEmpty/no-signal query:");
  await expectEmpty("   ", "whitespace-only query returns nothing");

  console.log(`\n${failures === 0 ? "ALL SEARCH CHECKS PASSED" : `${failures} SEARCH CHECK(S) FAILED`}`);
  process.exit(failures === 0 ? 0 : 1);
}

main();
