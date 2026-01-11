import type { Config } from "payload";

import { BlogPage } from "@/payload/globals/blog-page";
import { ContactMethods } from "@/payload/globals/contact-methods";
import { ContactPage } from "@/payload/globals/contact-page";
import { HomePage } from "@/payload/globals/home-page";
import { Links } from "@/payload/globals/links";
import { SocialMedia } from "@/payload/globals/social-media";

export const globals: NonNullable<Config["globals"]> = [
  BlogPage,
  ContactMethods,
  ContactPage,
  HomePage,
  Links,
  SocialMedia,
];
