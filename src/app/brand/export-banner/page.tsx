export default function ExportBannerPage() {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden bg-primary"
      style={{ width: 1500, height: 500 }}
    >
      <span
        className="relative font-black tracking-tighter text-white"
        style={{ fontSize: 160 }}
      >
        cogenly
      </span>
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: `radial-gradient(
            ellipse at 50% -30%,
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
    </div>
  );
}
