"use client";

import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import Link from "next/link";

export function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <DotPattern
        className="[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_65%)] opacity-30"
        width={20}
        height={20}
        cr={1}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-8">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Your team's time is worth more than this.{" "}
            <span className="text-primary">Let's fix it.</span>
          </h2>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Tell us what's eating up your team's hours. We'll show you
            exactly how to get them back.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="mt-8">
            <Link href="/book-a-call">
              <ShimmerButton
                className="group/cta mx-auto h-12 px-8 text-base font-medium"
                background="oklch(0.62 0.18 250)"
              >
                Book a Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
              </ShimmerButton>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              We respond within 24 hours.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
