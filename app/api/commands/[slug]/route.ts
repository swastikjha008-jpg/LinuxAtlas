import { getCommandBySlug } from "@/lib/server/command-service";
import { slugSchema } from "@/lib/validation";
import { apiItem, apiBadRequest, apiNotFound, apiInternalError, formatZodError } from "@/lib/api-response";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const parsed = slugSchema.safeParse(slug);
  if (!parsed.success) return apiBadRequest(formatZodError(parsed.error));

  try {
    const command = await getCommandBySlug(parsed.data);
    if (!command) return apiNotFound("Command not found");
    return apiItem(command);
  } catch (err) {
    console.error("[GET /api/commands/:slug]", err);
    return apiInternalError();
  }
}
