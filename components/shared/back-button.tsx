"use client";

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export function BackButton({ children, className }: Props) {
  return (
    <Button
      className={className}
      onClick={() => window.history.back()}
      size="lg"
      variant="outline"
    >
      <HugeiconsIcon className="mr-2 size-4" icon={ArrowLeft01Icon} />
      {children ?? "Volver atrás"}
    </Button>
  );
}
