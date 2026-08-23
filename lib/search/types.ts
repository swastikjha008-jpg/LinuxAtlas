import type { SearchDocument, SearchResult } from "@/lib/types";

/**
 * The one contract the rest of the app depends on. lib/server/search-service.ts
 * picks an implementation at runtime (local Fuse.js index vs. Meilisearch)
 * based on whether MEILISEARCH_HOST is configured — nothing above this
 * interface needs to know or care which one is active.
 */
export interface SearchAdapter {
  search(query: string, limit?: number): Promise<SearchResult[]>;
}

export function toSearchResult(doc: SearchDocument): SearchResult {
  return {
    id: doc.id,
    type: doc.type,
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    url: doc.url,
    tags: doc.tags,
  };
}
