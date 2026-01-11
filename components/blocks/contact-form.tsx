"use client";

import type { z } from "zod/v4";
import type { ContactFormBlock as ContactFormBlockProps } from "@/payload-types";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loading03Icon, SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { contactEmailSchema } from "@/lib/zod";

type Props = ContactFormBlockProps & {
  className?: string;
};

export function ContactForm({ title, subtitle, className }: Props) {
  const form = useForm<z.infer<typeof contactEmailSchema>>({
    resolver: zodResolver(contactEmailSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
      email2: "",
      privacyCheck: false,
    },
  });

  async function onSubmit(values: z.infer<typeof contactEmailSchema>) {
    const result = await fetch("/api/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (result.ok) {
      form.reset();
      toast.success("Mensaje enviado", {
        description: "Gracias por contactarnos",
      });
    } else {
      toast.error("Algo ha ido mal", {
        description:
          "Vuelve a intentarlo más tarde o prueba otros medios de contacto",
      });
    }
  }

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container max-w-7xl">
        {(title || subtitle) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title ? (
              <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            ) : null}
          </div>
        )}

        <div className="mx-auto max-w-xl">
          <Form {...form}>
            <form
              className="space-y-6 rounded-2xl border border-border/50 bg-card p-6 shadow-sm sm:p-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="name"
                        placeholder="Tu nombre"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="email"
                        placeholder="tu@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="612 345 678"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field: { value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="¿En qué podemos ayudarte?"
                        rows={4}
                        value={value || ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="privacyCheck"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          className="mt-0.5"
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="font-normal leading-snug">
                          He leído y acepto la política de privacidad.
                        </FormLabel>
                        <FormDescription>
                          Necesitas aceptar los términos para continuar.
                        </FormDescription>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <input className="sr-only" name="email2" type="email" />

              <Button
                className="w-full"
                disabled={form.formState.isSubmitting}
                size="lg"
                type="submit"
              >
                {form.formState.isSubmitting ? (
                  <>
                    Enviando
                    <HugeiconsIcon
                      className="ml-2 size-4 animate-spin"
                      icon={Loading03Icon}
                    />
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <HugeiconsIcon className="ml-2 size-4" icon={SentIcon} />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
