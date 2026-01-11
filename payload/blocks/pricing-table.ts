import type { Block } from "payload";

export const PricingTable: Block = {
  slug: "pricingTable",
  interfaceName: "PricingTableBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/pricing-table.jpg",
  labels: {
    singular: { es: "Tabla de precios", en: "Pricing Table" },
    plural: { es: "Tablas de precios", en: "Pricing Tables" },
  },
  fields: [
    {
      name: "title",
      label: { es: "Título", en: "Title" },
      type: "text",
      required: false,
    },
    {
      name: "subtitle",
      label: { es: "Subtítulo", en: "Subtitle" },
      type: "text",
      required: false,
    },
    {
      name: "plans",
      label: { es: "Planes", en: "Plans" },
      type: "array",
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: "name",
          label: { es: "Nombre del plan", en: "Plan Name" },
          type: "text",
          required: true,
        },
        {
          name: "price",
          label: { es: "Precio", en: "Price" },
          type: "text",
          required: true,
          admin: {
            description: {
              es: 'Precio a mostrar (ej: "$29/mes", "Gratis", "Personalizado")',
              en: 'Price to display (e.g., "$29/mo", "Free", "Custom")',
            },
          },
        },
        {
          name: "description",
          label: { es: "Descripción", en: "Description" },
          type: "text",
          required: false,
        },
        {
          name: "highlighted",
          label: { es: "Destacado", en: "Highlighted" },
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: {
              es: "Marcar este plan como recomendado",
              en: "Mark this plan as recommended",
            },
          },
        },
        {
          name: "features",
          label: { es: "Características", en: "Features" },
          type: "array",
          fields: [
            {
              name: "text",
              label: { es: "Texto", en: "Text" },
              type: "text",
              required: true,
            },
            {
              name: "included",
              label: { es: "Incluido", en: "Included" },
              type: "checkbox",
              defaultValue: true,
            },
          ],
        },
        {
          name: "button",
          label: { es: "Botón", en: "Button" },
          type: "group",
          fields: [
            {
              name: "label",
              label: { es: "Texto del botón", en: "Button Text" },
              type: "text",
              required: true,
              defaultValue: "Get Started",
            },
            {
              name: "path",
              label: { es: "Enlace", en: "Link" },
              type: "text",
              required: true,
              defaultValue: "/signup",
            },
          ],
        },
      ],
    },
  ],
};
