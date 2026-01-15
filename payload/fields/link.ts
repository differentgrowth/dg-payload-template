import type { TextField } from "payload";

import { type LinkType, validateLink } from "@/payload/hooks/validate-link";

const descriptions: Record<LinkType, { es: string; en: string }> = {
  internal: {
    es: 'Enlace interno: debe comenzar con "/" o "#" (ej: /contacto, #seccion)',
    en: 'Internal link: must start with "/" or "#" (e.g., /contact, #section)',
  },
  external: {
    es: 'Enlace externo: debe comenzar con "https://" (ej: https://ejemplo.com)',
    en: 'External link: must start with "https://" (e.g., https://example.com)',
  },
  any: {
    es: "Enlace interno (/, #) o externo (https://)",
    en: "Internal link (/, #) or external link (https://)",
  },
};

interface LinkFieldOptions {
  name?: string;
  label?: { es: string; en: string };
  type?: LinkType;
  required?: boolean;
  defaultValue?: string;
}

export const linkField = ({
  name = "url",
  label = { es: "URL", en: "URL" },
  type = "any",
  required = false,
  defaultValue,
}: LinkFieldOptions = {}): TextField => ({
  name,
  label,
  type: "text",
  required,
  defaultValue,
  validate: validateLink(type),
  admin: {
    description: descriptions[type],
  },
});
