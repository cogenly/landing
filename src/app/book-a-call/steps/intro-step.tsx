"use client";

export function IntroStep() {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <div className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 shadow-sm">
          <span className="text-sm font-medium text-muted-foreground">
            Limited availability
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Apply to Work With Us
        </h2>
      </div>
      <p className="mx-auto max-w-md text-[15px] leading-relaxed text-muted-foreground">
        We take on a limited number of clients so every project gets the
        attention it deserves. This application helps us understand your
        business and whether we're the right fit.
      </p>
      <div className="mx-auto max-w-sm rounded-lg bg-muted/60 px-5 py-3.5 text-sm text-muted-foreground">
        Takes about 5-10 minutes. We read every one.
      </div>
    </div>
  );
}
