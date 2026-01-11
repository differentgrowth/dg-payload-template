"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Alert02Icon, Loading01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("[ErrorBoundary] Page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4">
      <HugeiconsIcon className="size-16 text-destructive" icon={Alert02Icon} />
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
        <Button onClick={reset} variant="default">
          <HugeiconsIcon className="size-4" icon={Loading01Icon} />
          Try again
        </Button>
        <Button onClick={() => router.push("/")} variant="outline">
          Go to home
        </Button>
      </div>
    </main>
  );
}
