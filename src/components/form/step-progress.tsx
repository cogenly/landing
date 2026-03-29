"use client";

import { cn } from "@/lib/utils";

export function StepProgress({
  current,
  total,
  className,
}: {
  current: number;
  total: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-1 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-primary transition-all duration-500"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}
