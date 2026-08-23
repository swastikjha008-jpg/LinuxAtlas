import { NextRequest } from "next/server";
import { search } from "@/lib/server/search-service";
import { searchQuerySchema } from "@/lib/validation";
import { apiList, apiInternalError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  const parsed = searchQuerySchema.safeParse(q);
  if (!parsed.success) {
    // an empty/missing query isn't an error — it just means "no results yet"
    return apiList([], { query: q });
  }

  try {
    const results = await search(parsed.data);
    return apiList(results, { query: parsed.data });
  } catch (err) {
    console.error("[GET /api/search]", err);
    return apiInternalError();
  }
}
