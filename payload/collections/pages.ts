/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { CollectionConfig } from "payload";

import { admins, anyone } from "@/lib/access";
import { generatePreviewPath } from "@/lib/generate-preview-path";
import { hero } from "@/payload/fields/hero";
import { slug } from "@/payload/fields/slug";
import {
  revalidatePages,
  revalidatePagesAfterDelete,
} from "@/payload/hooks/revalidate-pages";
import { validateSlug } from "@/payload/hooks/validate-slug";
import { PageBlocks } from "@/payload-config/page-blocks";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  labels: {
    singular: {
      en: "Page",
      es: "Página",
    },
    plural: {
      en: "Pages",
      es: "Páginas",
    },
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "slug", "shownIn", "_status", "updatedAt"],
    hideAPIURL: process.env.NODE_ENV === "production",
    group: {
      en: "Pages",
      es: "Páginas",
    },
    livePreview: {
      url: ({ data }) => {
        const folder = data?.folder;
        const folderName =
          folder && typeof folder === "object" && "name" in folder
            ? (folder.name as string | undefined)
            : undefined;

        return generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          folderName,
          collection: "pages",
        });
      },
    },
    preview: (data) => {
      const folder = data?.folder;
      const folderName =
        folder && typeof folder === "object" && "name" in folder
          ? (folder.name as string | undefined)
          : undefined;

      return generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        folderName,
        collection: "pages",
      });
    },
  },
  hooks: {
    beforeValidate: [validateSlug],
    afterChange: [revalidatePages],
    afterDelete: [revalidatePagesAfterDelete],
  },
  defaultSort: "updatedAt",
  timestamps: true,
  folders: true,
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { es: "General", en: "General" },
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
              name: "shownIn",
              label: { es: "Mostrado en", en: "Shown in" },
              type: "select",
              hasMany: true,
              index: true,
              options: [
                { label: { en: "Header", es: "Encabezado" }, value: "header" },
                {
                  label: { en: "Footer", es: "Pie de página" },
                  value: "footer",
                },
              ],
              admin: {
                position: "sidebar",
              },
            },
            {
              ...slug({ targetField: "label" }),
            },
          ],
        },
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
