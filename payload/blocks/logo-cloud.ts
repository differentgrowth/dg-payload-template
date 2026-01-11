import type { Block } from "payload";

export const LogoCloud: Block = {
  slug: "logoCloud",
  interfaceName: "LogoCloudBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/logo-cloud.jpg",
  labels: {
    singular: { es: "Logos de clientes", en: "Logo Cloud" },
    plural: { es: "Logos de clientes", en: "Logo Clouds" },
  },
  fields: [
    {
      name: "title",
      label: { es: "Título", en: "Title" },
      type: "text",
      required: false,
      admin: {
        description: {
          es: 'Ej: "Empresas que confían en nosotros"',
          en: 'E.g., "Trusted by leading companies"',
        },
      },
    },
    {
      name: "style",
      label: { es: "Estilo", en: "Style" },
      type: "radio",
      required: true,
      defaultValue: "grid",
      options: [
        { label: { es: "Cuadrícula", en: "Grid" }, value: "grid" },
        { label: { es: "Carrusel", en: "Carousel" }, value: "carousel" },
      ],
    },
    {
      name: "logos",
      label: { es: "Logos", en: "Logos" },
      type: "array",
      minRows: 3,
      maxRows: 12,
      fields: [
        {
          name: "name",
          label: { es: "Nombre de la empresa", en: "Company Name" },
          type: "text",
          required: true,
        },
        {
          name: "logo",
          label: { es: "Logo", en: "Logo" },
          type: "upload",
          relationTo: "media",
          required: true,
          filterOptions: {
            mimeType: {
              in: ["image/svg+xml", "image/png", "image/webp"],
            },
          },
        },
        {
          name: "url",
          label: { es: "Enlace", en: "URL" },
          type: "text",
          required: false,
          admin: {
            description: {
              es: "Enlace opcional al sitio web de la empresa",
              en: "Optional link to company website",
            },
          },
        },
      ],
    },
  ],
};
