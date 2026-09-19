import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Public site URL resolution (build-time):
 *   1. NEXT_PUBLIC_SITE_URL — set this to the real domain in production
 *   2. VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL — provided by Vercel automatically
 *   3. http://localhost:3000
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const inferredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

/**
 * Type-safe environment access. Fails the build early on missing/invalid vars.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.url(),
    NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: inferredSiteUrl,
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
