export default function BrandPage() {
  const icons = [
    { label: "C. (white dot)", letter: "C", dot: true, dotColor: "white" },
    { label: "C. (light blue dot)", letter: "C", dot: true, dotColor: "oklch(0.75 0.15 250)" },
    { label: "C. (cyan dot)", letter: "C", dot: true, dotColor: "oklch(0.75 0.15 200)" },
    { label: "C (no dot)", letter: "C", dot: false, dotColor: "" },
    { label: "C. (inverted, primary dot)", letter: "C", dot: true, dotColor: "oklch(0.62 0.18 250)", inverted: true },
    { label: "C (inverted, no dot)", letter: "C", dot: false, dotColor: "", inverted: true },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center gap-20 bg-neutral-100 p-16">
      <h1 className="text-sm font-medium uppercase tracking-widest text-neutral-400">
        Cogenly Icon Options
      </h1>

      <div className="flex flex-wrap justify-center gap-12">
        {icons.map((icon) => (
          <div key={icon.label} className="flex flex-col items-center gap-4">
            <span className="text-xs text-neutral-400">{icon.label}</span>
            <div
              className={`relative flex h-[200px] w-[200px] items-center justify-center overflow-hidden ${icon.inverted ? "bg-white" : "bg-primary"}`}
              style={{
                boxShadow: icon.inverted
                  ? `0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08), inset 0 0 0 0.75px rgba(0,0,0,0.06)`
                  : `0 4px 16px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15), inset 0 0 0 0.75px rgba(0,0,0,0.12), inset 0 1.5px 0 rgba(255,255,255,0.18)`,
              }}
            >
              <div className="flex items-baseline">
                <span className={`relative z-10 text-[110px] font-black leading-none ${icon.inverted ? "text-foreground" : "text-white"}`}>
                  {icon.letter}
                </span>
                {icon.dot && (
                  <span
                    className="relative z-10 text-[110px] font-black leading-none"
                    style={{ color: icon.dotColor }}
                  >
                    .
                  </span>
                )}
              </div>
              {!icon.inverted && (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 z-20"
                    style={{
                      background: `radial-gradient(
                        ellipse at 50% -15%,
                        rgba(255,255,255,0.55) 0%,
                        rgba(255,255,255,0.18) 45%,
                        transparent 70%
                      )`,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-10"
                    style={{
                      background: `linear-gradient(
                        to bottom,
                        transparent 0%,
                        rgba(0,0,0,0.06) 70%,
                        rgba(0,0,0,0.15) 100%
                      )`,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Wordmark */}
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-neutral-400">Wordmark</span>
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <span className="text-5xl font-black tracking-tighter text-foreground">
            cogenly
          </span>
        </div>
      </div>

      {/* Wordmark on dark */}
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-neutral-400">Wordmark (dark)</span>
        <div className="rounded-xl bg-[#0F172A] px-12 py-8">
          <span className="text-5xl font-black tracking-tighter text-white">
            cogenly
          </span>
        </div>
      </div>
    </div>
  );
}
