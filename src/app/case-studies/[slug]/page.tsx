import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { caseStudies } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) return {};
  return {
    title: `${study.client} | Cogenly Case Study`,
    description: study.headline,
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) notFound();

  return (
    <main className="min-h-screen">
      {/* Banner */}
      <div
        className={`relative flex min-h-[280px] items-end bg-gradient-to-br ${study.bannerGradient} sm:min-h-[340px]`}
      >
        <div className="mx-auto w-full max-w-4xl px-6 pb-10 sm:px-8">
          <Link href="/#case-studies">
            <Button
              variant="ghost"
              className="mb-6 gap-1.5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Button>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/20"
            >
              {study.industry}
            </Badge>
            <Badge
              variant="outline"
              className="text-white/80 border-white/20 text-xs"
            >
              {study.duration}
            </Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {study.client}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">
            {study.headline}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-20">
        {/* Results grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {study.results.map((result) => (
            <div key={result.label} className="text-center">
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {result.value}
                </span>
                {result.suffix && (
                  <span className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    {result.suffix}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {result.label}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-12 border-border" />

        {/* Challenge */}
        <section>
          <h2 className="text-xl font-semibold">The Challenge</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {study.fullContent.challenge}
          </p>
        </section>

        {/* Approach */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Our Approach</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {study.fullContent.approach}
          </p>
        </section>

        {/* What We Built */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">What We Built</h2>
          <ul className="mt-4 space-y-3">
            {study.fullContent.whatWeBuilt.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-muted-foreground leading-relaxed"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Tech Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Outcome */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">The Outcome</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {study.fullContent.outcome}
          </p>
        </section>

        {/* CTA */}
        <hr className="my-12 border-border" />

        <div className="text-center">
          <h3 className="text-2xl font-bold">Want results like these?</h3>
          <p className="mt-2 text-muted-foreground">
            Tell us what you need built. We will scope it and give you an honest
            recommendation.
          </p>
          <div className="mt-6">
            <Link href="/#contact">
              <Button className="h-11 px-8">Book a Call</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
