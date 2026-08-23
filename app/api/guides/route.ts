import { getAllGuides } from "@/lib/server/guide-service";
import { apiList, apiInternalError } from "@/lib/api-response";

export async function GET() {
  try {
    const data = await getAllGuides();
    return apiList(data);
  } catch (err) {
    console.error("[GET /api/guides]", err);
    return apiInternalError();
  }
}
