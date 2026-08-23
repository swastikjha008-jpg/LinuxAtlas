import Fuse from "fuse.js";
import type { SearchDocument, SearchResult } from "@/lib/types";
import type { SearchAdapter } from "@/lib/search/types";
import { toSearchResult } from "@/lib/search/types";

/**
 * Fuse.js-backed search, used until MEILISEARCH_HOST is configured (see
 * lib/server/search-service.ts). Deliberately takes its document set as a
 * constructor argument rather than fetching it — that's what lets this
 * class be exercised directly, with zero Prisma/DB dependency, in
 * scripts/verify-search.ts.
 */
export class LocalSearchAdapter implements SearchAdapter {
  private fuse: Fuse<SearchDocument>;

  constructor(private documents: SearchDocument[]) {
    this.fuse = new Fuse(documents, {
      keys: [
        { name: "title", weight: 0.5 },
        { name: "tags", weight: 0.25 },
        { name: "description", weight: 0.15 },
        { name: "content", weight: 0.1 },
      ],
      threshold: 0.35, // lower = stricter; 0.35 tolerates small typos without matching everything
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }

  async search(query: string, limit = 20): Promise<SearchResult[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];
    return this.fuse
      .search(trimmed, { limit })
      .map((r) => toSearchResult(r.item));
  }

  get size(): number {
    return this.documents.length;
  }
}
