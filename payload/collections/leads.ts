/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { CollectionConfig } from "payload";

import { admins, anyone } from "@/lib/access";
import { sendEmailAfterLeadCreation } from "@/payload/hooks/send-email-after-lead-creation";
import { ADMIN_GROUPS } from "@/payload-config/groups";

export const Leads: CollectionConfig = {
  slug: "leads",
  labels: {
    singular: { es: "Contacto", en: "Lead" },
    plural: { es: "Contactos", en: "Leads" },
  },
  access: {
    create: anyone,
    read: admins,
    update: admins,
    delete: admins,
  },
  admin: {
    useAsTitle: "name",
    hideAPIURL: process.env.NODE_ENV === "production",
    defaultColumns: ["name", "email", "phone", "createdAt"],
    group: ADMIN_GROUPS.connectAndShare,
  },
  timestamps: true,
  hooks: {
    afterChange: [sendEmailAfterLeadCreation],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: { es: "Nombre", en: "Name" },
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: { es: "Correo electrónico", en: "Email" },
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "phone",
      type: "text",
      label: { es: "Teléfono", en: "Phone" },
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "message",
      type: "textarea",
      label: { es: "Mensaje", en: "Message" },
      admin: {
        readOnly: true,
      },
    },
  ],
};
