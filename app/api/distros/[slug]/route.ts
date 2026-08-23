import { getDistroBySlug } from "@/lib/server/distro-service";
import { slugSchema } from "@/lib/validation";
import { apiItem, apiBadRequest, apiNotFound, apiInternalError, formatZodError } from "@/lib/api-response";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const parsed = slugSchema.safeParse(slug);
  if (!parsed.success) return apiBadRequest(formatZodError(parsed.error));

  try {
    const distro = await getDistroBySlug(parsed.data);
    if (!distro) return apiNotFound("Distribution not found");
    return apiItem(distro);
  } catch (err) {
    console.error("[GET /api/distros/:slug]", err);
    return apiInternalError();
  }
}
