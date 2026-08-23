import { getAllCommands } from "@/lib/server/command-service";
import { apiList, apiInternalError } from "@/lib/api-response";

export async function GET() {
  try {
    const data = await getAllCommands();
    return apiList(data);
  } catch (err) {
    console.error("[GET /api/commands]", err);
    return apiInternalError();
  }
}
