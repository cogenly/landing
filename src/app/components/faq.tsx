"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";
import { faqs } from "@/lib/data";

export function FAQ() {
  return (
    <section id="faq" className="bg-secondary/50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        <BlurFade delay={0.1} inView>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Common{" "}
              <span className="text-primary">Questions.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No fluff. No runaround.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <Accordion className="mt-12">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </div>
    </section>
  );
}
