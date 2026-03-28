"use client";

import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-16 sm:pt-20">
      <DotPattern
        className="[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] opacity-40"
        width={20}
        height={20}
        cr={1}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-left sm:px-8 sm:text-center">
        <BlurFade delay={0.1} inView>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
            Your team is doing work{" "}
            <span className="bg-gradient-to-r from-[oklch(0.55_0.2_250)] to-[oklch(0.65_0.22_270)] bg-clip-text text-transparent">
              a machine should do.
            </span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:mx-auto sm:mt-6 sm:text-xl">
            We automate the repetitive parts of your operation so your team can focus on what matters.
          </p>
        </BlurFade>

        <BlurFade delay={0.65} inView>
          <div className="mt-8 flex flex-row items-center gap-3 sm:mt-10 sm:justify-center sm:gap-4">
            <Link href="/book-a-call">
              <ShimmerButton
                className="group/cta h-12 px-6 text-sm font-medium sm:px-8 sm:text-base"
                background="oklch(0.62 0.18 250)"
              >
                Book a Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
              </ShimmerButton>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full px-6 sm:px-8"
            >
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
