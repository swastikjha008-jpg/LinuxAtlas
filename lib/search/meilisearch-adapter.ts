import type { SearchDocument, SearchResult } from "@/lib/types";
import type { SearchAdapter } from "@/lib/search/types";

const INDEX_NAME = "linuxatlas";

/**
 * Talks to a real Meilisearch instance over its REST API. Not exercised
 * live in development for this project — see docs/backend.md for how to
 * bring one up locally (docker-compose) and flip MEILISEARCH_HOST on.
 * Until then, lib/server/search-service.ts falls back to LocalSearchAdapter
 * automatically; nothing else in the app needs to change either way.
 */
export class MeilisearchAdapter implements SearchAdapter {
  constructor(
    private host: string,
    private apiKey: string
  ) {}

  async search(query: string, limit = 20): Promise<SearchResult[]> {
    const res = await fetch(`${this.host}/indexes/${INDEX_NAME}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ q: query, limit }),
      // search results change with content updates, not per-request — a
      // short cache keeps repeat keystrokes from all hitting Meilisearch
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      throw new Error(`Meilisearch search failed: ${res.status} ${res.statusText}`);
    }

    const body = (await res.json()) as { hits: SearchDocument[] };
    return body.hits.map((doc) => ({
      id: doc.id,
      type: doc.type,
      title: doc.title,
      slug: doc.slug,
      description: doc.description,
      url: doc.url,
      tags: doc.tags,
    }));
  }

  /** Full reindex — called from scripts/sync or a future admin route, never from a request handler. */
  async reindex(documents: SearchDocument[]): Promise<void> {
    const res = await fetch(`${this.host}/indexes/${INDEX_NAME}/documents`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(documents),
    });
    if (!res.ok) {
      throw new Error(`Meilisearch reindex failed: ${res.status} ${res.statusText}`);
    }
  }
}
