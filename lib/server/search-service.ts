import "server-only";
import type { SearchResult } from "@/lib/types";
import type { SearchAdapter } from "@/lib/search/types";
import { LocalSearchAdapter } from "@/lib/search/local-adapter";
import { MeilisearchAdapter } from "@/lib/search/meilisearch-adapter";
import { buildSearchDocuments } from "@/lib/server/search-index";

// In-memory cache for the local adapter's document set. Content changes
// infrequently (a distro/command/guide edit, not per-request), so rebuilding
// on every keystroke would be wasted DB load — see docs/backend.md "Caching".
let cachedAdapter: LocalSearchAdapter | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 60_000;

async function getLocalAdapter(): Promise<LocalSearchAdapter> {
  const stale = Date.now() - cachedAt > CACHE_TTL_MS;
  if (!cachedAdapter || stale) {
    const documents = await buildSearchDocuments();
    cachedAdapter = new LocalSearchAdapter(documents);
    cachedAt = Date.now();
  }
  return cachedAdapter;
}

function getMeilisearchAdapter(): SearchAdapter | null {
  const host = process.env.MEILISEARCH_HOST;
  const apiKey = process.env.MEILISEARCH_API_KEY;
  if (!host || !apiKey || apiKey === "YOUR_MEILISEARCH_API_KEY") return null;
  return new MeilisearchAdapter(host, apiKey);
}

/**
 * The one function the rest of the app calls. Picks Meilisearch when it's
 * configured for real, otherwise falls back to the local Fuse.js index —
 * callers never need to know which is active.
 */
export async function search(query: string, limit = 20): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const meili = getMeilisearchAdapter();
  if (meili) {
    return meili.search(trimmed, limit);
  }

  const local = await getLocalAdapter();
  return local.search(trimmed, limit);
}

/** Popular/example queries for the search palette's empty state. */
export const POPULAR_SEARCHES = [
  "Arch Linux",
  "systemctl",
  "pacman",
  "Linux filesystem",
  "install docker",
  "permissions",
];
