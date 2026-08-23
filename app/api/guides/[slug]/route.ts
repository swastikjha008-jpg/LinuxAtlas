import { getGuideBySlug } from "@/lib/server/guide-service";
import { slugSchema } from "@/lib/validation";
import { apiItem, apiBadRequest, apiNotFound, apiInternalError, formatZodError } from "@/lib/api-response";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const parsed = slugSchema.safeParse(slug);
  if (!parsed.success) return apiBadRequest(formatZodError(parsed.error));

  try {
    const guide = await getGuideBySlug(parsed.data);
    if (!guide) return apiNotFound("Guide not found");
    return apiItem(guide);
  } catch (err) {
    console.error("[GET /api/guides/:slug]", err);
    return apiInternalError();
  }
}
