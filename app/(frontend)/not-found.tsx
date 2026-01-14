import Link from "next/link";

import { Home01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { BackButton } from "@/components/shared/back-button";
import { Mark } from "@/components/shared/mark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Branded logo mark */}
        <div className="mb-8 flex justify-center">
          <Mark className="h-12 w-auto opacity-20" />
        </div>

        {/* Error code with gradient */}
        <p className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text font-bold text-8xl text-transparent sm:text-9xl">
          404
        </p>

        {/* Error message */}
        <h1 className="mt-4 font-semibold text-2xl tracking-tight sm:text-3xl">
          Página no encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground leading-relaxed">
          Lo sentimos, no pudimos encontrar la página que estás buscando. Es
          posible que haya sido movida o eliminada.
        </p>

        {/* Action buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button render={<Link href="/" />} size="lg" variant="default">
            <HugeiconsIcon className="mr-2 size-4" icon={Home01Icon} />
            Ir al inicio
          </Button>
          <BackButton />
        </div>

        {/* Helpful suggestion */}
        <p className="mt-8 text-muted-foreground text-sm">
          <HugeiconsIcon
            className="mr-1 inline-block size-4 align-text-bottom"
            icon={Search01Icon}
          />
          Comprueba que la URL sea correcta o explora nuestro contenido
        </p>
      </div>
    </main>
  );
}
