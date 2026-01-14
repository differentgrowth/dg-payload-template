"use client";

import { useEffect } from "react";

import {
  Alert02Icon,
  ArrowReloadHorizontalIcon,
  Home01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[GlobalError] Application error:", error);
  }, [error]);

  const handleGoHome = () => {
    // In global error boundary, router may not be available
    // Using window.location is acceptable here as a fallback
    window.location.href = "/";
  };

  return (
    <html lang="es-ES">
      <body className="bg-background text-foreground antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="text-center">
            {/* Error icon with subtle background */}
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
              <HugeiconsIcon
                className="size-10 text-destructive"
                icon={Alert02Icon}
              />
            </div>

            {/* Error message */}
            <h1 className="font-semibold text-2xl tracking-tight sm:text-3xl">
              Error crítico
            </h1>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground leading-relaxed">
              Ha ocurrido un error en la aplicación. Por favor, inténtalo de
              nuevo o vuelve a la página de inicio.
            </p>

            {/* Error code if available */}
            {error.digest ? (
              <p className="mt-3 font-mono text-muted-foreground/60 text-xs">
                Código: {error.digest}
              </p>
            ) : null}

            {/* Action buttons - using native buttons since components may not be available */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                onClick={reset}
                type="button"
              >
                <HugeiconsIcon
                  className="size-4"
                  icon={ArrowReloadHorizontalIcon}
                />
                Intentar de nuevo
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 font-medium text-sm transition-colors hover:bg-muted"
                onClick={handleGoHome}
                type="button"
              >
                <HugeiconsIcon className="size-4" icon={Home01Icon} />
                Ir al inicio
              </button>
            </div>

            {/* Help text */}
            <p className="mt-8 text-muted-foreground text-sm">
              Si el problema persiste, por favor contacta con nosotros
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
