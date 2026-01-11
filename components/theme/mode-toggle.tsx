"use client";

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className={className}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon"
      variant="outline"
    >
      <HugeiconsIcon
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        icon={Sun03Icon}
      />
      <HugeiconsIcon
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        icon={Moon02Icon}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
