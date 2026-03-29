import { Badge } from "@/components/ui/badge";

const clientStatusColors: Record<string, string> = {
  partial: "bg-orange-100 text-orange-700",
  lead: "bg-blue-100 text-blue-700",
  call_scheduled: "bg-yellow-100 text-yellow-700",
  proposal: "bg-purple-100 text-purple-700",
  client: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-700",
  lost: "bg-red-100 text-red-700",
};

const clientStatusLabels: Record<string, string> = {
  partial: "Partial",
  lead: "Lead",
  call_scheduled: "Call Scheduled",
  proposal: "Proposal",
  client: "Client",
  completed: "Completed",
  lost: "Lost",
};

const projectStatusColors: Record<string, string> = {
  scoping: "bg-blue-100 text-blue-700",
  building: "bg-yellow-100 text-yellow-700",
  delivered: "bg-green-100 text-green-700",
  retainer: "bg-purple-100 text-purple-700",
};

const projectStatusLabels: Record<string, string> = {
  scoping: "Scoping",
  building: "Building",
  delivered: "Delivered",
  retainer: "Retainer",
};

const callTypeColors: Record<string, string> = {
  discovery: "bg-blue-100 text-blue-700",
  followup: "bg-yellow-100 text-yellow-700",
  checkin: "bg-green-100 text-green-700",
};

const callTypeLabels: Record<string, string> = {
  discovery: "Discovery",
  followup: "Follow-up",
  checkin: "Check-in",
};

const colorsByType = {
  client: clientStatusColors,
  project: projectStatusColors,
  call: callTypeColors,
} as const;

const labelsByType = {
  client: clientStatusLabels,
  project: projectStatusLabels,
  call: callTypeLabels,
} as const;

export function StatusBadge({
  type,
  status,
}: {
  type: "client" | "project" | "call";
  status: string;
}) {
  const colors = colorsByType[type];
  const labels = labelsByType[type];

  return (
    <Badge variant="secondary" className={colors[status] ?? ""}>
      {labels[status] ?? status}
    </Badge>
  );
}
