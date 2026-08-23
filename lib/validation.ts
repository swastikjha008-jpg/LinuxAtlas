import { z } from "zod";

// Every value that reaches Prisma from a request goes through one of these
// first. Slugs are constrained to the exact shape we generate them in, so a
// malformed slug 404s before it ever touches the database.

export const slugSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "must be a lowercase, hyphenated slug");

export const searchQuerySchema = z
  .string()
  .trim()
  .min(1)
  .max(200);

export const difficultySchema = z.enum(["beginner", "intermediate", "advanced"]);

export const distroFilterSchema = z.object({
  family: z.string().max(100).optional(),
  packageManager: z.string().max(100).optional(),
  releaseModel: z.string().max(100).optional(),
  difficulty: difficultySchema.optional(),
});

export const compareQuerySchema = z
  .string()
  .max(300)
  .transform((s) => s.split(",").map((v) => v.trim()).filter(Boolean))
  .pipe(z.array(slugSchema).min(2, "compare needs at least 2 distros").max(4, "compare supports at most 4 distros"));

export type DistroFilter = z.infer<typeof distroFilterSchema>;
