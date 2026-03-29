import type { LucideIcon } from "lucide-react";
import {
  CircleDot,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  UserX,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StatusConfig = {
  icon: LucideIcon;
  iconClassName: string;
  label: string;
};

const CLIENT_STATUS_CONFIG: Record<string, StatusConfig> = {
  partial: { icon: Clock, iconClassName: "text-amber-500", label: "Partial" },
  lead: { icon: CircleDot, iconClassName: "text-blue-500", label: "Lead" },
  client: {
    icon: CheckCircle2,
    iconClassName: "text-emerald-500",
    label: "Client",
  },
  churned: {
    icon: UserX,
    iconClassName: "text-muted-foreground",
    label: "Churned",
  },
};

function getStatusConfig(
  configMap: Record<string, StatusConfig>,
  status: string,
): StatusConfig {
  return (
    configMap[status] ?? {
      icon: CircleDot,
      iconClassName: "text-muted-foreground",
      label: status,
    }
  );
}

export function StatusBadge({
  type,
  status,
}: {
  type: "client";
  status: string;
}) {
  const configMap = type === "client" ? CLIENT_STATUS_CONFIG : CLIENT_STATUS_CONFIG;
  const config = getStatusConfig(configMap, status);
  const Icon = config.icon;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium">
      <Icon className={cn("size-3", config.iconClassName)} />
      {config.label}
    </span>
  );
}
