/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { Config } from "payload";

import { ADMIN_GROUPS } from "@/payload-config/groups";

export const folders: NonNullable<Config["folders"]> = {
  browseByFolder: true,
  debug: process.env.NODE_ENV !== "production",
  collectionOverrides: [
    async ({ collection }) => ({
      ...collection,
      admin: {
        ...collection.admin,
        hideAPIURL: process.env.NODE_ENV === "production",
        group: ADMIN_GROUPS.settings,
      },
    }),
  ],
  fieldName: "folder",
  slug: "payload-folders",
};
