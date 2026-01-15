import type { Block } from "payload";

import { linkField } from "@/payload/fields/link";

export const CardLinks: Block = {
  slug: "cardLinks",
  interfaceName: "CardLinksBlock",
  imageURL:
    "https://www.differentgrowth.com/admin-api/thumbnails/file/card-links.jpg",
  labels: {
    singular: { es: "Enlaces destacados", en: "Featured Links" },
    plural: { es: "Enlaces destacados", en: "Featured Links" },
  },
  fields: [
    {
      name: "links",
      label: false,
      type: "array",
      fields: [
        {
          name: "title",
          label: { es: "Título", en: "Title" },
          type: "text",
          required: true,
        },
        {
          name: "label",
          label: { es: "Texto del botón", en: "Button text" },
          type: "text",
          required: true,
        },
        linkField({ type: "any", required: true }),
        {
          name: "image",
          label: { es: "Imagen", en: "Image" },
          type: "upload",
          relationTo: "media",
          required: false,
          admin: {
            description: {
              es: "Trabajarán mejor las imágenes de colores vivos. Si no se aporta, se utilizará el logo.",
              en: "Images with vivid colors will work better. If not provided, the logo will be used.",
            },
          },
        },
      ],
    },
  ],
};
