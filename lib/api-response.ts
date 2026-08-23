import { NextResponse } from "next/server";
import { ZodError } from "zod";
import type { ApiErrorResponse, ApiItemResponse, ApiListResponse } from "@/lib/types";

export function apiList<T>(data: T[], meta: { query?: string } = {}): NextResponse<ApiListResponse<T>> {
  return NextResponse.json({ data, meta: { total: data.length, ...meta } });
}

export function apiItem<T>(data: T): NextResponse<ApiItemResponse<T>> {
  return NextResponse.json({ data });
}

export function apiError(code: string, message: string, status: number): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ error: { code, message } }, { status });
}

export function apiNotFound(message = "Resource not found"): NextResponse<ApiErrorResponse> {
  return apiError("NOT_FOUND", message, 404);
}

export function apiBadRequest(message: string): NextResponse<ApiErrorResponse> {
  return apiError("BAD_REQUEST", message, 400);
}

export function apiInternalError(): NextResponse<ApiErrorResponse> {
  // Deliberately generic — never leak a raw Prisma/Postgres error message
  // to the client. The real error still gets logged server-side by callers.
  return apiError("INTERNAL_ERROR", "Something went wrong", 500);
}

export function formatZodError(err: ZodError): string {
  return err.issues.map((i) => `${i.path.join(".") || "value"}: ${i.message}`).join("; ");
}
