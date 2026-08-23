import { getPackageManagerBySlug } from "@/lib/server/package-manager-service";
import { slugSchema } from "@/lib/validation";
import { apiItem, apiBadRequest, apiNotFound, apiInternalError, formatZodError } from "@/lib/api-response";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const parsed = slugSchema.safeParse(slug);
  if (!parsed.success) return apiBadRequest(formatZodError(parsed.error));

  try {
    const pm = await getPackageManagerBySlug(parsed.data);
    if (!pm) return apiNotFound("Package manager not found");
    return apiItem(pm);
  } catch (err) {
    console.error("[GET /api/package-managers/:slug]", err);
    return apiInternalError();
  }
}
