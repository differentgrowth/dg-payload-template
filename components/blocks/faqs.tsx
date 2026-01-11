import type { FaqsBlock as FaqsBlockProps } from "@/payload-types";

import { RichText } from "@/components/shared/rich-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type Props = FaqsBlockProps & {
  className?: string;
};

export function Faqs({ title, subtitle, items, className }: Props) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container max-w-7xl">
        {(title || subtitle) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          <Accordion className="space-y-4 py-6">
            {items.map((item) => (
              <AccordionItem
                className={cn(
                  "rounded-2xl border border-border/50 bg-card px-6 transition-all duration-300",
                  "data-[state=open]:border-border data-[state=open]:shadow-black/5 data-[state=open]:shadow-lg"
                )}
                key={item.id}
                value={`faq-${item.id}`}
              >
                <AccordionTrigger className="py-5 text-left font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="text-muted-foreground leading-relaxed">
                    <RichText data={item.answer} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
