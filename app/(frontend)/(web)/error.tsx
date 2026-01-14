"use client";

import { useEffect } from "react";
import Link from "next/link";

import {
  Alert02Icon,
  ArrowReloadHorizontalIcon,
  Home01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Mark } from "@/components/shared/mark";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[ErrorBoundary] Page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Branded logo mark */}
        <div className="mb-8 flex justify-center">
          <Mark className="h-12 w-auto opacity-20" />
        </div>

        {/* Error icon with subtle background */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
          <HugeiconsIcon
            className="size-10 text-destructive"
            icon={Alert02Icon}
          />
        </div>

        {/* Error message */}
        <h1 className="font-semibold text-2xl tracking-tight sm:text-3xl">
          Algo salió mal
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground leading-relaxed">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo o
          vuelve a la página de inicio.
        </p>

        {/* Error code if available */}
        {error.digest ? (
          <p className="mt-3 font-mono text-muted-foreground/60 text-xs">
            Código de error: {error.digest}
          </p>
        ) : null}

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} size="lg" variant="default">
            <HugeiconsIcon
              className="mr-2 size-4"
              icon={ArrowReloadHorizontalIcon}
            />
            Intentar de nuevo
          </Button>
          <Button render={<Link href="/" />} size="lg" variant="outline">
            <HugeiconsIcon className="mr-2 size-4" icon={Home01Icon} />
            Ir al inicio
          </Button>
        </div>

        {/* Help text */}
        <p className="mt-8 text-muted-foreground text-sm">
          Si el problema persiste, por favor contacta con nosotros
        </p>
      </div>
    </main>
  );
}
