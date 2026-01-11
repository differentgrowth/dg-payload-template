import type { CheckboxFieldClient, DefaultCellComponentProps } from "payload";

import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const BooleanCell = ({
  cellData,
}: DefaultCellComponentProps<CheckboxFieldClient>) => (
  <span>
    {cellData ? (
      <HugeiconsIcon
        className="size-6 text-(--theme-success-550)"
        icon={Tick02Icon}
      />
    ) : (
      <HugeiconsIcon
        className="size-6 text-(--theme-error-550)"
        icon={Cancel01Icon}
      />
    )}
  </span>
);
