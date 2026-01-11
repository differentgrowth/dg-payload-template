import type { Config } from "payload";

import { Categories } from "@/payload/collections/categories";
import { Leads } from "@/payload/collections/leads";
import { Media } from "@/payload/collections/media";
import { Pages } from "@/payload/collections/pages";
import { Posts } from "@/payload/collections/posts";
import { Users } from "@/payload/collections/users";

export const collections: NonNullable<Config["collections"]> = [
  Pages,
  Posts,
  Categories,
  Leads,
  Media,
  Users,
];
