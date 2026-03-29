import type { ReactNode } from "react";
import { HeaderActions } from "@/app/(dashboard)/header-actions";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {action && <HeaderActions>{action}</HeaderActions>}
    </div>
  );
}
