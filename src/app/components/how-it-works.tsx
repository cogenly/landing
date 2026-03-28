"use client";

import { useRef } from "react";
import { Search, Wrench, Rocket } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description:
      "We find where AI saves you the most time and money. Not where it sounds cool. Where it actually matters.",
  },
  {
    icon: Wrench,
    title: "Build",
    description:
      "We design, build, and deploy the system. Whatever the problem needs. Typically live within 2-4 weeks.",
  },
  {
    icon: Rocket,
    title: "Maintain",
    description:
      "We don't build and disappear. When something breaks at 2am, that's our problem, not yours.",
  },
];

function StepCircle({
  ref,
  icon: Icon,
  className,
}: {
  ref: React.Ref<HTMLDivElement>;
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-white shadow-sm",
        className
      )}
    >
      <Icon className="h-7 w-7 text-primary" />
    </div>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  const stepRefs = [step1Ref, step2Ref, step3Ref];

  return (
    <section
      id="how-it-works"
      className="bg-secondary/50 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <BlurFade delay={0.1} inView>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How It{" "}
              <span className="text-primary">Works.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              You tell us the problem. We handle everything else.
            </p>
          </div>
        </BlurFade>

        <div
          ref={containerRef}
          className="relative mt-16 flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-0"
        >
          {steps.map((step, index) => (
            <BlurFade
              key={step.title}
              delay={0.2 + index * 0.15}
              inView
              className="relative z-10 flex flex-col items-center text-center lg:flex-1"
            >
              <StepCircle ref={stepRefs[index]} icon={step.icon} />
              <span className="mt-4 text-sm font-medium text-primary">
                Step {index + 1}
              </span>
              <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-[260px] text-sm text-muted-foreground">
                {step.description}
              </p>
            </BlurFade>
          ))}

          <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step1Ref}
              toRef={step2Ref}
              gradientStartColor="#2563eb"
              gradientStopColor="#60a5fa"
              pathColor="#e5e7eb"
              duration={4}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step2Ref}
              toRef={step3Ref}
              gradientStartColor="#60a5fa"
              gradientStopColor="#2563eb"
              pathColor="#e5e7eb"
              duration={4}
              delay={2}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
