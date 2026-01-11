import type { EmbedMapBlock as EmbedMapBlockProps } from "@/payload-types";

import { AppleIcon, GoogleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

type Props = EmbedMapBlockProps & {
  className?: string;
};

export const EmbedMap = ({
  title,
  description,
  hasBackground,
  className,
  googleMapsEmbedCode,
  googleMapsUrl,
  appleMapsUrl,
}: Props) => {
  if (!(googleMapsEmbedCode || googleMapsUrl || appleMapsUrl)) {
    return null;
  }

  return (
    <div
      className={cn(
        "py-12 lg:py-20",
        { "bg-primary": hasBackground },
        className
      )}
    >
      <div className="container flex flex-col items-center">
        {title ? (
          <h2
            className={cn(
              "mb-2 border-b pb-1 font-bold text-3xl tracking-tight sm:text-4xl",
              hasBackground
                ? "border-primary-50 text-primary-50"
                : "border-primary-600 text-primary-600"
            )}
          >
            {title}
          </h2>
        ) : null}
        {description ? (
          <p
            className={cn(
              "mx-auto max-w-3xl text-lg",
              hasBackground ? "text-primary-100" : "text-default-600"
            )}
          >
            {description}
          </p>
        ) : null}

        {googleMapsEmbedCode ? (
          <iframe
            allowFullScreen
            className="my-12 aspect-video w-full max-w-3xl rounded-xl border-none shadow-large"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={googleMapsEmbedCode}
            title={title || "Google Maps"}
          />
        ) : null}
        <div className="flex w-full max-w-3xl flex-wrap justify-center gap-6">
          {appleMapsUrl ? (
            <a
              aria-label="Ver en Apple Maps"
              className={buttonVariants({ variant: "outline" })}
              href={appleMapsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <HugeiconsIcon className="size-4" icon={AppleIcon} />
              Ver en Apple Maps
            </a>
          ) : null}
          {googleMapsUrl ? (
            <a
              aria-label="Ver en Apple Maps"
              className={buttonVariants({ variant: "outline" })}
              href={googleMapsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <HugeiconsIcon className="size-4" icon={GoogleIcon} />
              Ver en Google Maps
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};
