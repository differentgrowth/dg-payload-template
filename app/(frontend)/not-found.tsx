"use client";

import Link from "next/link";

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid place-items-center py-24 sm:py-32">
      <div className="container text-balance text-center">
        <p className="text-base text-primary">404</p>
        <h1 className="mt-4">Página no encontrada</h1>
        <p className="mt-6 text-muted-foreground">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Button render={<Link href="/" />} variant="ghost">
            Volver al inicio
            <HugeiconsIcon className="ml-1 size-4" icon={ArrowLeft01Icon} />
          </Button>
        </div>
      </div>
    </main>
  );
}
