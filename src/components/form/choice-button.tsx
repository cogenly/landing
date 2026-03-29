"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChoiceButton({
  selected,
  onClick,
  children,
  shortcut,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  shortcut?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border px-5 py-3.5 text-left text-sm transition-all",
        selected
          ? "border-primary bg-primary/5 text-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      {shortcut && (
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded border text-xs font-medium",
            selected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border"
          )}
        >
          {shortcut}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {selected && <Check className="h-4 w-4 shrink-0 text-primary" />}
    </button>
  );
}
