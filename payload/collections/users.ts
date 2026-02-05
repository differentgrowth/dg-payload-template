/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { CollectionConfig } from "payload";

import { admins, adminsAndUser, anyone, checkRole } from "@/lib/access";
import { ADMIN_GROUPS } from "@/payload-config/groups";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: { es: "Usuario", en: "User" },
    plural: { es: "Usuarios", en: "Users" },
  },
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: adminsAndUser,
    unlock: admins,
    admin: ({ req: { user } }) => checkRole("admin", user),
  },
  auth: true,
  admin: {
    defaultColumns: ["name", "email", "role"],
    useAsTitle: "name",
    hideAPIURL: process.env.NODE_ENV === "production",
    group: ADMIN_GROUPS.settings,
  },
  defaultSort: "email",
  timestamps: true,
  fields: [
    {
      name: "name",
      type: "text",
      label: { es: "Nombre", en: "Name" },
    },
    {
      name: "role",
      label: { es: "Rol", en: "Role" },
      type: "select",
      options: [
        { label: { es: "Admin", en: "Admin" }, value: "admin" },
        { label: { es: "Editor", en: "Editor" }, value: "editor" },
        { label: { es: "Usuario", en: "User" }, value: "user" },
      ],
      required: true,
      defaultValue: "user",
      access: {
        read: () => true,
        update: ({ req: { user } }) => checkRole("admin", user),
      },
    },
  ],
};
