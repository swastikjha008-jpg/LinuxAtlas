import "server-only";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Singleton Prisma client, using the `pg` driver adapter rather than
// Prisma's bundled query-engine binary. Two reasons:
//   1. Faster cold starts on serverless (Vercel) — no binary to load.
//   2. This project's dev sandbox couldn't reach Prisma's engine-binary CDN
//      (network policy), so keeping the runtime path binary-free avoided a
//      second point of failure. `prisma generate` and `prisma migrate` are
//      unaffected — they're schema/tooling steps, this only changes how the
//      client talks to Postgres once generated.
//
// Next.js dev mode hot-reloads modules, which would otherwise create a
// fresh PrismaClient (and pool) on every save — stash it on `globalThis` so
// dev reuses one instance. Production gets exactly one per server instance.

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and point it at your Postgres instance."
    );
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
