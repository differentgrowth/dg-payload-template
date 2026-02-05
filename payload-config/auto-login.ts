/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { Config } from "payload";

export const autoLogin: NonNullable<Config["admin"]>["autoLogin"] | undefined =
  process.env.NODE_ENV === "development" &&
  process.env.AUTOLOGIN === "true" &&
  process.env.ADMIN_EMAIL &&
  process.env.ADMIN_PASSWORD
    ? {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      }
    : undefined;
