import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Loading() {
  return (
    <div className="my-24 flex items-center justify-center">
      {/* biome-ignore lint/a11y/useSemanticElements: I prefer this element */}
      <div role="status">
        <HugeiconsIcon
          aria-hidden
          className="inline size-24 animate-spin text-primary"
          icon={Loading03Icon}
        />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
