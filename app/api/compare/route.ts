import { NextRequest } from "next/server";
import { compareDistros } from "@/lib/server/compare-service";
import { compareQuerySchema } from "@/lib/validation";
import { apiItem, apiBadRequest, apiInternalError, formatZodError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("distros") ?? "";

  const parsed = compareQuerySchema.safeParse(raw);
  if (!parsed.success) return apiBadRequest(formatZodError(parsed.error));

  try {
    const result = await compareDistros(parsed.data);
    return apiItem(result);
  } catch (err) {
    console.error("[GET /api/compare]", err);
    return apiInternalError();
  }
}
