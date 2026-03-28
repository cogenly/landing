export default function ExportWordPage() {
  const variants = [
    { id: "blue-flat-no-dot", bg: "bg-primary", dotColor: "none", gloss: false, size: 215 },
    { id: "blue-gloss-no-dot", bg: "bg-primary", dotColor: "none", gloss: true, size: 215 },
    { id: "blue-gloss-white-dot", bg: "bg-primary", dotColor: "white", gloss: true, size: 195 },
  ];

  return (
    <div className="flex flex-col">
      {variants.map((v) => (
        <div
          key={v.id}
          id={v.id}
          className={`relative flex items-center justify-center ${v.bg}`}
          style={{ width: 1024, height: 1024 }}
        >
          <span
            className="relative font-black tracking-tighter text-white"
            style={{ fontSize: v.size }}
          >
            cogenly{v.dotColor !== "none" && <span style={{ color: v.dotColor }}>.</span>}
          </span>
          {v.gloss && (
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
      ))}
    </div>
  );
}
