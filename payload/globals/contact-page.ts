/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

import { admins, anyone } from "@/lib/access";
import { generateGlobalPreviewPath } from "@/lib/generate-preview-path";
import { hero } from "@/payload/fields/hero";
import { revalidateContactPage } from "@/payload/hooks/revalidate-contact-page";
import { PageBlocks } from "@/payload-config/page-blocks";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  access: {
    read: anyone,
    update: admins,
  },
  label: { es: "Página de contacto", en: "Contact Page" },
  admin: {
    hideAPIURL: process.env.NODE_ENV === "production",
    group: { es: "Páginas", en: "Pages" },
    livePreview: {
      url: () => generateGlobalPreviewPath({ global: "contact-page" }),
    },
    preview: () => generateGlobalPreviewPath({ global: "contact-page" }),
  },
  hooks: {
    afterChange: [revalidateContactPage],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { es: "Hero", en: "Hero" },
          fields: [hero],
        },
        {
          label: { es: "Bloques", en: "Blocks" },
          fields: [
            {
              name: "blocks",
              type: "blocks",
              label: { es: "Bloques", en: "Blocks" },
              admin: {
                initCollapsed: true,
              },
              blocks: PageBlocks,
            },
          ],
        },
        {
          label: { es: "Datos estructurados", en: "Structured data" },
          fields: [
            {
              name: "schemaMarkup",
              type: "json",
              label: { es: "Datos estructurados", en: "Structured data" },
              required: false,
              admin: {
                description: {
                  es: "Datos estructurados para motores de búsqueda y plataformas sociales.",
                  en: "Structured data for search engines and social platforms.",
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
