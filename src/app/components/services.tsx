"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <BlurFade delay={0.1} inView>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              What{" "}
              <span className="text-primary">Changes.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every system we build is tied to a number. Hours saved, revenue
              gained, or problems eliminated.
            </p>
          </div>
        </BlurFade>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <BlurFade
              key={service.title}
              delay={0.1 + index * 0.1}
              inView
              className="h-full"
            >
              <MagicCard
                className="h-full rounded-xl p-0"
                gradientColor="#eff6ff"
                gradientOpacity={0.6}
                gradientFrom="#3b82f6"
                gradientTo="#93c5fd"
              >
                <div className="relative h-full p-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {service.title}
                  </span>
                  <service.icon className="mt-4 h-10 w-10 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">
                    {service.outcome}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
