"use client";

import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

// Extracted to constant to prevent recreation on every render
const TOAST_ICONS = {
  success: <HugeiconsIcon className="size-4" icon={CheckmarkCircle02Icon} />,
  info: <HugeiconsIcon className="size-4" icon={InformationCircleIcon} />,
  warning: <HugeiconsIcon className="size-4" icon={Alert02Icon} />,
  error: <HugeiconsIcon className="size-4" icon={Alert02Icon} />,
  loading: (
    <HugeiconsIcon className="size-4 animate-spin" icon={Loading03Icon} />
  ),
};

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      icons={TOAST_ICONS}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      theme={theme as ToasterProps["theme"]}
      {...props}
    />
  );
};

export { Toaster };
