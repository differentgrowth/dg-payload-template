/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

import { admins, anyone } from "@/lib/access";
import { linkField } from "@/payload/fields/link";
import { revalidateLinks } from "@/payload/hooks/revalidate-links";
import { ADMIN_GROUPS } from "@/payload-config/groups";

export const Links: GlobalConfig = {
  slug: "links",
  access: {
    read: anyone,
    update: admins,
  },
  label: { es: "Enlaces", en: "Links" },
  admin: {
    hideAPIURL: process.env.NODE_ENV === "production",
    group: ADMIN_GROUPS.connectAndShare,
  },
  hooks: {
    afterChange: [revalidateLinks],
  },
  fields: [
    {
      name: "items",
      label: { es: "Elementos", en: "Items" },
      type: "array",
      required: true,
      labels: {
        singular: { es: "Enlace", en: "Link" },
        plural: { es: "Enlaces", en: "Links" },
      },
      fields: [
        {
          name: "label",
          label: { es: "Texto mostrado", en: "Display text" },
          type: "text",
          required: true,
        },
        linkField({ type: "any", required: true }),
      ],
    },
  ],
};
