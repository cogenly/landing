"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";
import { stats } from "@/lib/data";

export function Stats() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <BlurFade delay={0.1} inView>
          <p className="mb-12 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Built and proven in production
          </p>
        </BlurFade>
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <BlurFade key={stat.label} delay={0.1 + index * 0.1} inView>
              <div className="text-center">
                <div className="flex items-baseline justify-center">
                  <NumberTicker
                    value={stat.value}
                    className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                  />
                  <span className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                    {stat.suffix}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
