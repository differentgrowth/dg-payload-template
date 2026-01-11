import Link from "next/link";

import { Logout01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const LogoutLink = () => (
  <Link
    className="inline-flex size-8 items-center justify-center rounded-lg border border-(--theme-border-color) hover:bg-(--theme-elevation-200)"
    href="/admin/logout"
  >
    <HugeiconsIcon className="size-4" icon={Logout01Icon} />
  </Link>
);
