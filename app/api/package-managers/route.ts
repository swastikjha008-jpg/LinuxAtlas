import { getAllPackageManagers } from "@/lib/server/package-manager-service";
import { apiList, apiInternalError } from "@/lib/api-response";

export async function GET() {
  try {
    const data = await getAllPackageManagers();
    return apiList(data);
  } catch (err) {
    console.error("[GET /api/package-managers]", err);
    return apiInternalError();
  }
}
