/** biome-ignore-all lint/style/useNamingConvention: payloadcms convention */
import type { GlobalConfig } from "payload";

import { admins, anyone } from "@/lib/access";
import { revalidateContactMethods } from "@/payload/hooks/revalidate-contact-methods";
import { ADMIN_GROUPS } from "@/payload-config/groups";

export const ContactMethods: GlobalConfig = {
  slug: "contact-methods",
  access: {
    read: anyone,
    update: admins,
  },
  admin: {
    description: {
      es: "Métodos de contacto disponibles",
      en: "Available contact methods",
    },
    hideAPIURL: process.env.NODE_ENV === "production",
    group: ADMIN_GROUPS.connectAndShare,
  },
  label: { es: "Métodos de contacto", en: "Contact Methods" },
  hooks: {
    afterChange: [revalidateContactMethods],
  },
  fields: [
    {
      name: "phone",
      type: "text",
      label: { es: "Teléfono", en: "Phone" },
    },
    {
      name: "whatsapp",
      type: "group",
      label: { es: "WhatsApp", en: "WhatsApp" },
      fields: [
        {
          name: "label",
          type: "text",
          label: {
            es: "Texto. (Cuando mostrado)",
            en: "Text. (When displayed)",
          },
          required: true,
        },
        {
          name: "link",
          type: "text",
          label: { es: "Link", en: "Link" },
          required: true,
        },
        {
          name: "message",
          type: "text",
          label: { es: "Mensaje por defecto", en: "Default message" },
          required: false,
        },
      ],
    },
    {
      name: "email",
      type: "email",
      label: { es: "Email", en: "Email" },
      admin: {
        description: {
          es: "Además aquí recibirás los emails del formulario",
          en: "Additionally, you will receive emails from the form here",
        },
      },
    },
    {
      name: "address",
      type: "group",
      label: { es: "Dirección", en: "Address" },
      fields: [
        {
          name: "text",
          type: "text",
          label: { es: "Texto", en: "Text" },
        },
        {
          name: "url",
          label: {
            es: "URL de Google o Apple Maps",
            en: "URL of Google or Apple Maps",
          },
          type: "text",
        },
      ],
    },
    {
      name: "emailForNotifications",
      type: "email",
      label: { es: "Email para notificaciones", en: "Email for notifications" },
      admin: {
        description: {
          es: "Además aquí recibirás los emails de notificaciones",
          en: "You will also receive notification emails here",
        },
      },
    },
  ],
};
