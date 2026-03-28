"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/lib/data";

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <BlurFade delay={0.1} inView>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Work We Have{" "}
              <span className="text-primary">Shipped.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real systems. Real results.
            </p>
          </div>
        </BlurFade>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <BlurFade
              key={study.slug}
              delay={0.2 + index * 0.15}
              inView
              className="h-full"
            >
              <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                <MagicCard
                  className="h-full rounded-xl p-0"
                  gradientColor="#eff6ff"
                  gradientOpacity={0.6}
                  gradientFrom="#3b82f6"
                  gradientTo="#93c5fd"
                >
                  <div className="relative h-full">
                    {/* Banner */}
                    <div
                      className={`flex h-36 items-end rounded-t-[inherit] bg-gradient-to-br ${study.bannerGradient} p-6 sm:p-8`}
                    >
                      <div>
                        <Badge className="bg-white/20 text-white border-0 text-xs">
                          {study.industry}
                        </Badge>
                        <h3 className="mt-2 text-xl font-bold text-white">
                          {study.client}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                      <p className="text-sm font-medium text-foreground">
                        {study.headline}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {study.description}
                      </p>

                      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-foreground">
                        Read case study
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
