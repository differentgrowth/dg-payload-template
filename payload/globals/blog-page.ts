/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

import { admins, anyone } from "@/lib/access";
import { generateGlobalPreviewPath } from "@/lib/generate-preview-path";
import { hero } from "@/payload/fields/hero";
import { revalidateBlogPage } from "@/payload/hooks/revalidate-blog-page";
import { ADMIN_GROUPS } from "@/payload-config/groups";

export const BlogPage: GlobalConfig = {
  slug: "blog-page",
  access: {
    read: anyone,
    update: admins,
  },
  label: { es: "Directorio de Blog", en: "Blog directory" },
  admin: {
    hideAPIURL: process.env.NODE_ENV === "production",
    group: ADMIN_GROUPS.pages,
    livePreview: {
      url: () => generateGlobalPreviewPath({ global: "blog-page" }),
    },
    preview: () => generateGlobalPreviewPath({ global: "blog-page" }),
  },
  hooks: {
    afterChange: [revalidateBlogPage],
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      label: { es: "Texto identificativo", en: "Label" },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "showOnHeader",
      type: "checkbox",
      defaultValue: true,
      label: { es: "Mostrar en el encabezado", en: "Show in header" },
      admin: {
        position: "sidebar",
        components: {
          Cell: "@/components/admin/cells/boolean-cell#BooleanCell",
        },
      },
    },
    {
      name: "showOnFooter",
      type: "checkbox",
      defaultValue: false,
      label: { es: "Mostrar en el pie de página", en: "Show in footer" },
      admin: {
        position: "sidebar",
        components: {
          Cell: "@/components/admin/cells/boolean-cell#BooleanCell",
        },
      },
    },
    hero,
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
};
