import { UserCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const AccountLink = () => (
  <span className="inline-flex size-8 items-center justify-center rounded-lg border border-(--theme-border-color) hover:bg-(--theme-elevation-200)">
    <HugeiconsIcon className="size-4.5" icon={UserCircle02Icon} />
  </span>
);
