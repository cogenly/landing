import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  prefix?: string;
  className?: string;
}

export function Stat({
  icon: Icon,
  label,
  value,
  prefix,
  className,
}: StatProps) {
  const formatted =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div className={cn("flex flex-col gap-3 p-4", className)}>
      <div className="flex items-center gap-1.5">
        <Icon className="size-3.5 text-muted-foreground shrink-0" />
        <span className="text-sm font-medium leading-none tracking-tight">
          {label}
        </span>
      </div>
      <div className="text-[22px] font-medium leading-none tracking-tight">
        {prefix && (
          <span className="text-muted-foreground">{prefix}</span>
        )}
        <span>{formatted}</span>
      </div>
    </div>
  );
}

const columnClasses: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
};

export function StatGroup({
  children,
  columns = 4,
  className,
}: {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2",
        columnClasses[columns],
        "rounded-xl ring-1 ring-foreground/10 overflow-hidden [&>*+*]:border-l [&>*]:border-b [&>:nth-last-child(-n+2)]:border-b-0 sm:[&>*]:border-b-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
