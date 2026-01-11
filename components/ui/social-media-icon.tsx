import type { ComponentProps } from "react";

import {
  AtIcon,
  DiscordIcon,
  Facebook01Icon,
  Github01Icon,
  InstagramIcon,
  Linkedin01Icon,
  MessageIcon,
  NewTwitterIcon,
  TiktokIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const platformIcons = {
  discord: DiscordIcon,
  facebook: Facebook01Icon,
  github: Github01Icon,
  instagram: InstagramIcon,
  linkedin: Linkedin01Icon,
  telegram: MessageIcon,
  threads: AtIcon,
  tiktok: TiktokIcon,
  whatsapp: WhatsappIcon,
  x: NewTwitterIcon,
  youtube: YoutubeIcon,
} as const;

type PlatformIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
  platform: keyof typeof platformIcons;
};

export const SocialMediaIcon = ({ platform, ...props }: PlatformIconProps) => {
  const icon = platformIcons[platform];

  if (!icon) {
    return null;
  }

  return <HugeiconsIcon icon={icon} {...props} />;
};
