import type { Metadata, Viewport } from "next";

import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { TailwindIndicator } from "@/components/shared/tailwind-indicator";
import { ThemeProvider } from "@/components/theme/provider";
import { Toaster } from "@/components/ui/sonner";
import { getServerSideURL } from "@/lib/get-url";
import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "ACME | Potenciando tu marca con estrategias digitales",
    template: "%s | ACME",
  },
  description:
    "En ACME, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
  metadataBase: new URL(getServerSideURL()),
  alternates: {
    canonical: getServerSideURL(),
  },
  openGraph: {
    title: "ACME",
    description:
      "En ACME, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
    url: `${getServerSideURL()}/`,
    siteName: "ACME",
    locale: "es_ES",
    type: "website",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  colorScheme: "light dark",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#fafaf9",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0c0a09",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={cn(
        fontSans.variable,
        fontMono.variable,
        fontSerif.variable,
        "text-base antialiased"
      )}
      data-scroll-behavior="smooth"
      lang="es-ES"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
          <Toaster
            closeButton
            richColors
            toastOptions={{
              classNames: {
                error: "bg-destructive-foreground text-destructive",
                success: "bg-success-foreground text-success",
                warning: "bg-warning-foreground text-warning",
                info: "bg-info-foreground text-info",
              },
            }}
          />
          <TailwindIndicator position="right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
