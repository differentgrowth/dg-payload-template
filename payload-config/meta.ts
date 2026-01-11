import type { Config } from "payload";

export const meta: NonNullable<Config["admin"]>["meta"] = {
  titleSuffix: "| ACME",
  title: "Creando algo diferente",
  description:
    "En ACME, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/icon.ico",
    },
  ],
  openGraph: {
    title: "Creando algo diferente",
    description:
      "En ACME, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
    images: [
      {
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
};
