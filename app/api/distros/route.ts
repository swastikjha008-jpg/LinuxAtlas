import { NextRequest } from "next/server";
import { getAllDistros, filterDistros } from "@/lib/server/distro-service";
import { distroFilterSchema } from "@/lib/validation";
import { apiList, apiBadRequest, apiInternalError, formatZodError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawFilter = {
    family: searchParams.get("family") ?? undefined,
    packageManager: searchParams.get("packageManager") ?? undefined,
    releaseModel: searchParams.get("releaseModel") ?? undefined,
    difficulty: searchParams.get("difficulty") ?? undefined,
  };

  const parsed = distroFilterSchema.safeParse(rawFilter);
  if (!parsed.success) {
    return apiBadRequest(formatZodError(parsed.error));
  }

  const hasFilter = Object.values(parsed.data).some(Boolean);

  try {
    const data = hasFilter ? await filterDistros(parsed.data) : await getAllDistros();
    return apiList(data);
  } catch (err) {
    console.error("[GET /api/distros]", err);
    return apiInternalError();
  }
}
