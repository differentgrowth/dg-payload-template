import type { TextFieldValidation } from "payload";

export type LinkType = "internal" | "external" | "any";

const INTERNAL_PREFIXES = ["/", "#"];
const EXTERNAL_PREFIXES = ["https://", "http://"];

const isInternalLink = (value: string): boolean =>
  INTERNAL_PREFIXES.some((prefix) => value.startsWith(prefix));

const isExternalLink = (value: string): boolean =>
  EXTERNAL_PREFIXES.some((prefix) => value.startsWith(prefix));

const errorMessages: Record<LinkType, { es: string; en: string }> = {
  internal: {
    es: 'El enlace interno debe comenzar con "/" o "#"',
    en: 'Internal link must start with "/" or "#"',
  },
  external: {
    es: 'El enlace externo debe comenzar con "https://"',
    en: 'External link must start with "https://"',
  },
  any: {
    es: 'El enlace debe comenzar con "/", "#" o "https://"',
    en: 'Link must start with "/", "#" or "https://"',
  },
};

export const validateLink =
  (type: LinkType = "any"): TextFieldValidation =>
  (value) => {
    if (!value || typeof value !== "string") {
      return true;
    }

    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      return true;
    }

    switch (type) {
      case "internal":
        if (!isInternalLink(trimmedValue)) {
          return errorMessages.internal.es;
        }
        break;

      case "external":
        if (!isExternalLink(trimmedValue)) {
          return errorMessages.external.es;
        }
        break;

      case "any":
        if (!(isInternalLink(trimmedValue) || isExternalLink(trimmedValue))) {
          return errorMessages.any.es;
        }
        break;

      default:
        return true;
    }

    return true;
  };
