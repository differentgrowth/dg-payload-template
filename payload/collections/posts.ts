/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { CollectionConfig } from "payload";

import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

import { admins, anyone } from "@/lib/access";
import { generatePreviewPath } from "@/lib/generate-preview-path";
import { CallToAction } from "@/payload/blocks/call-to-action";
import { Media } from "@/payload/blocks/media";
import { slug } from "@/payload/fields/slug";
import {
  revalidateFeaturedPosts,
  revalidateFeaturedPostsAfterDelete,
  revalidatePosts,
  revalidatePostsAfterDelete,
} from "@/payload/hooks/revalidate-posts";
import { ADMIN_GROUPS } from "@/payload-config/groups";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: { es: "Publicación", en: "Post" },
    plural: { es: "Publicaciones", en: "Posts" },
  },
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "id",
      "title",
      "slug",
      "_status",
      "publishedAt",
      "updatedAt",
    ],
    hideAPIURL: process.env.NODE_ENV === "production",
    group: ADMIN_GROUPS.pages,
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "posts",
        }),
    },
    preview: (data) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "posts",
      }),
  },
  trash: true,
  defaultPopulate: {
    image: true,
    title: true,
    description: true,
    categories: true,
    slug: true,
    publishedAt: true,
    authors: true,
  },
  hooks: {
    afterChange: [revalidatePosts, revalidateFeaturedPosts],
    afterDelete: [
      revalidatePostsAfterDelete,
      revalidateFeaturedPostsAfterDelete,
    ],
  },
  timestamps: true,
  versions: {
    drafts: {
      schedulePublish: {
        timeIntervals: 60,
      },
    },
    maxPerDoc: 25,
  },
  defaultSort: "-publishedAt",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { es: "General", en: "General" },
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              label: { es: "Título", en: "Title" },
            },
            {
              name: "description",
              type: "richText",
              label: { es: "Descripción", en: "Description" },
              required: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [...rootFeatures],
              }),
            },
            {
              name: "image",
              type: "relationship",
              relationTo: "media",
              required: false,
              label: { es: "Imagen", en: "Image" },
              filterOptions: {
                mimeType: {
                  in: ["image/jpeg", "image/png", "image/webp"],
                },
              },
            },
            {
              name: "publishedAt",
              type: "date",
              label: { es: "Programado el:", en: "Scheduled on:" },
              admin: {
                date: {
                  pickerAppearance: "dayAndTime",
                },
                position: "sidebar",
              },
              hooks: {
                beforeChange: [
                  ({ siblingData, value }) => {
                    if (siblingData._status === "published" && !value) {
                      return new Date();
                    }
                    return value;
                  },
                ],
              },
            },
            {
              name: "authors",
              type: "relationship",
              label: { es: "Autores", en: "Authors" },
              admin: {
                position: "sidebar",
              },
              hasMany: true,
              relationTo: "users",
            },
            {
              name: "featured",
              type: "checkbox",
              label: { es: "Destacado", en: "Featured" },
              defaultValue: false,
              admin: {
                position: "sidebar",
                components: {
                  Cell: "@/components/admin/cells/boolean-cell#BooleanCell",
                },
              },
            },
            {
              ...slug({ targetField: "title" }),
            },
          ],
        },
        {
          label: { es: "Contenido", en: "Content" },
          fields: [
            {
              name: "categories",
              type: "relationship",
              label: { es: "Categorías", en: "Categories" },
              hasMany: true,
              relationTo: "categories",
              admin: {
                position: "sidebar",
              },
            },
            {
              name: "relatedPosts",
              type: "relationship",
              relationTo: "posts",
              hasMany: true,
              label: { es: "Posts relacionados", en: "Related posts" },
              admin: {
                position: "sidebar",
              },
              filterOptions: ({ id }) => ({
                id: {
                  not_in: id ? [id] : [],
                },
              }),
            },
            {
              name: "content",
              type: "richText",
              label: { es: "Contenido", en: "Content" },
              required: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  BlocksFeature({
                    blocks: [CallToAction, Media],
                  }),
                ],
              }),
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
