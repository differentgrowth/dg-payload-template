interface I18nLabel {
  es: string;
  en: string;
}

export const ADMIN_GROUPS = {
  pages: { es: "Páginas", en: "Pages" } satisfies I18nLabel,
  media: { es: "Multimedia", en: "Media" } satisfies I18nLabel,
  connectAndShare: {
    es: "Conectar y Compartir",
    en: "Connect & Share",
  } satisfies I18nLabel,
  settings: { es: "Ajustes", en: "Settings" } satisfies I18nLabel,
} as const;
