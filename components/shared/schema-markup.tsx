type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [k: string]: unknown }
  | unknown[];

interface Props {
  data?: JsonValue;
}

/**
 * Renders JSON-LD structured data for SEO
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */
export function SchemaMarkup({ data }: Props) {
  // Only render if data is a non-empty object
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return null;
  }

  if (Object.keys(data).length === 0) {
    return null;
  }

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires dangerouslySetInnerHTML
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
