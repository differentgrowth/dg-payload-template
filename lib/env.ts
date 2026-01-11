import {
  literal,
  object,
  optional,
  safeParse,
  string,
  union,
  url,
} from "zod/v4";

/**
 * Environment variables schema with validation
 * @see https://zod.dev for schema documentation
 */
const envSchema = object({
  // Database
  DATABASE_URI: url("DATABASE_URI must be a valid URL"),

  // Payload CMS
  PAYLOAD_SECRET: string().min(
    32,
    "PAYLOAD_SECRET must be at least 32 characters for security"
  ),

  // Preview
  PREVIEW_SECRET: string().min(1, "PREVIEW_SECRET is required for previews"),

  // Storage
  BLOB_READ_WRITE_TOKEN: optional(string()),

  // Email (Resend)
  RESEND_API_KEY: optional(string().startsWith("re_")),

  // Cron jobs
  CRON_SECRET: optional(string()),

  // Vercel auto-injected (optional)
  VERCEL_PROJECT_PRODUCTION_URL: optional(string()),

  // Development
  AUTOLOGIN: optional(union([literal("true"), literal("false")])),
  ADMIN_EMAIL: optional(string()),
  ADMIN_PASSWORD: optional(string()),

  // Node environment
  NODE_ENV: optional(
    union([literal("development"), literal("production"), literal("test")])
  ),
});

/**
 * Validated environment variables
 * Throws detailed errors at build time if validation fails
 */
function validateEnv() {
  const result = safeParse(envSchema, process.env);

  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`Environment validation failed:\n${errors}`);
  }

  return result.data;
}

export const env = validateEnv();

/**
 * Type-safe environment variable access
 */
export type Env = typeof env;
