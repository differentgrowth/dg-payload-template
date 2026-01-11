"use client";

import { useEffect } from "react";

import { Alert02Icon, Loading01Icon } from "@hugeicons/core-free-icons";
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
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
          <HugeiconsIcon
            className="size-16 text-destructive"
            icon={Alert02Icon}
          />
          <div className="text-center">
            <h1 className="font-bold text-2xl">Something went wrong</h1>
            <p className="mt-2 text-muted-foreground">
              An unexpected error occurred. Please try again.
            </p>
            {error.digest ? (
              <p className="mt-1 font-mono text-muted-foreground text-xs">
                Code: {error.digest}
              </p>
            ) : null}
          </div>
          <div className="flex gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-primary/90"
              onClick={reset}
              type="button"
            >
              <HugeiconsIcon className="size-4" icon={Loading01Icon} />
              Try again
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-sm transition-colors hover:bg-gray-50"
              onClick={handleGoHome}
              type="button"
            >
              Go to home
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
