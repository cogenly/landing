"use client";

import { ArrowRight } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Button } from "@/components/ui/button";
import { IntakeForm } from "./intake-form";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20">
      <DotPattern
        className="[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] opacity-40"
        width={20}
        height={20}
        cr={1}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-8">
        <BlurFade delay={0.1} inView>
          <div className="mb-8 inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 shadow-sm">
            <AnimatedShinyText className="text-sm">
              AI systems that work on Monday morning.
            </AnimatedShinyText>
            <ArrowRight className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </BlurFade>

        <TextAnimate
          as="h1"
          by="word"
          animation="blurInUp"
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          once
        >
          Your Team Is Doing Work a Machine Should Handle.
        </TextAnimate>

        <BlurFade delay={0.4} inView>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Cogenly builds custom AI systems for your business. Voice agents,
            workflow automation, document processing, internal tools. We handle
            the build, the deployment, and the maintenance.
          </p>
        </BlurFade>

        <BlurFade delay={0.6} inView>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <IntakeForm>
              <ShimmerButton
                className="h-12 px-8 text-base font-medium"
                background="oklch(0.62 0.18 250)"
              >
                Book a Call
              </ShimmerButton>
            </IntakeForm>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full px-8"
            >
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
