import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  value?: string | null;
  children?: ReactNode;
}

export function Field({ label, value, children }: FieldProps) {
  if (!children && !value) return null;
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      {children ? (
        <div className="mt-1">{children}</div>
      ) : (
        <p className="mt-0.5 text-sm">{value}</p>
      )}
    </div>
  );
}
