"use client";

import type { Ref } from "react";
import type { Media as MediaType } from "@/payload-types";

import { getClientSideURL } from "@/lib/get-url";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  videoClassName?: string;
  onClick?: () => void;
  onLoad?: () => void;
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>;
  resource?: MediaType | string | number; // for Payload media
}

export const MediaVideo = ({ onClick, resource, videoClassName }: Props) => {
  if (!resource || typeof resource !== "object") {
    return null;
  }

  const src = `${getClientSideURL()}${resource.url}`;
  const poster =
    resource.poster && typeof resource.poster.value === "object"
      ? `${getClientSideURL()}${resource.poster.value.url}`
      : undefined;

  return (
    <video
      autoPlay
      className={cn(
        "w-full bg-muted-foreground",
        "rounded-sm shadow-primary shadow-sm",
        videoClassName
      )}
      controls={false}
      loop
      muted
      onClick={onClick}
      playsInline
      poster={poster}
    >
      <source src={src} />
    </video>
  );
};
