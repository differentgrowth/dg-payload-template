import type { Block } from "payload";

export const Stats: Block = {
  slug: "stats",
  interfaceName: "StatsBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/stats.jpg",
  labels: {
    singular: { es: "Estadísticas", en: "Stats" },
    plural: { es: "Estadísticas", en: "Stats" },
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
      name: "items",
      label: { es: "Estadísticas", en: "Stats" },
      type: "array",
      minRows: 2,
      maxRows: 6,
      fields: [
        {
          name: "value",
          label: { es: "Valor", en: "Value" },
          type: "text",
          required: true,
          admin: {
            description: {
              es: 'El número o valor a mostrar (ej: "100k+", "99.9%", "$2M")',
              en: 'The number or value to display (e.g., "100k+", "99.9%", "$2M")',
            },
          },
        },
        {
          name: "label",
          label: { es: "Etiqueta", en: "Label" },
          type: "text",
          required: true,
          admin: {
            description: {
              es: 'Descripción del valor (ej: "Usuarios activos", "Tiempo de actividad")',
              en: 'Description of the value (e.g., "Active users", "Uptime")',
            },
          },
        },
        {
          name: "description",
          label: { es: "Descripción", en: "Description" },
          type: "text",
          required: false,
          admin: {
            description: {
              es: "Texto adicional opcional",
              en: "Optional additional text",
            },
          },
        },
      ],
    },
  ],
};
