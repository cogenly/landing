import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  MailIcon,
  PhoneIcon,
  GlobeIcon,
  MessageCircleIcon,
  BuildingIcon,
  UsersIcon,
  DollarSignIcon,
  MegaphoneIcon,
  CalendarIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  TIMELINES,
  COMMITMENT_LEVELS,
  AI_EXPERIENCE,
  TEAM_SIZES,
  HOURS_WASTED,
  DECISION_MAKERS,
} from "@/lib/questions";
import { SCORE_TABLES, type ScoreFactor } from "@/lib/scoring";
import { SetBreadcrumb } from "@/app/(dashboard)/breadcrumb-context";
import { EditClientButton } from "./edit-client-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: client } = await supabase
    .from("clients")
    .select("name")
    .eq("id", id)
    .single();

  return {
    title: client?.name ?? "Client",
    robots: { index: false, follow: false },
  };
}

const choiceLabels: Record<string, { label: string; key: string }[]> = {
  aiExperience: AI_EXPERIENCE,
  timeline: TIMELINES,
  commitment: COMMITMENT_LEVELS,
  teamSize: TEAM_SIZES,
  hoursWasted: HOURS_WASTED,
  decisionMaker: DECISION_MAKERS,
};

function resolveLabel(metadataKey: string, rawValue: string): string {
  const options = choiceLabels[metadataKey];
  if (!options) return rawValue;
  return options.find((o) => o.key === rawValue)?.label ?? rawValue;
}

const knownLabels: Record<string, string> = {
  whyWork: "Why they want to work with us",
  aiExperience: "AI experience",
  aiBranch: "AI experience detail",
  whatToBuild: "What they want to build",
  currentProcess: "Current process",
  currentTools: "Current tools",
  hoursWasted: "Hours wasted weekly",
  hoursWastedBranch: "Hours wasted detail",
  success: "What success looks like",
  decisionMaker: "Decision maker",
  decisionMakerBranch: "Decision maker detail",
  timeline: "Timeline",
  timelineBranch: "Timeline detail",
  commitment: "Commitment level",
  concerns: "Concerns",
  anythingElse: "Anything else",
  howFoundDetail: "How they found us",
  teamSizeBranch: "Team size detail",
  last_step: "Last step reached",
  startedAt: "Form started",
  biggestChallenge: "Biggest challenge",
  priorAI: "Prior AI experience",
  churnReason: "Churn reason",
  referredBy: "Referred by",
  budget: "Budget",
};

const hiddenKeys = new Set([
  "durationSeconds",
  "referrer",
  "userAgent",
  "language",
  "timezone",
  "screenWidth",
  "screenHeight",
  "url",
  "scoreBreakdown",
]);

function deriveScoreBreakdown(
  metadata: Record<string, unknown>,
  revenue: string | null,
  teamSize: string | null,
): ScoreFactor[] {
  const commitment = String(metadata.commitment ?? "");
  const timeline = String(metadata.timeline ?? "");
  const decisionMaker = String(metadata.decisionMaker ?? "");
  const hoursWasted = String(metadata.hoursWasted ?? "");

  return [
    {
      name: "Revenue",
      score: SCORE_TABLES.revenue.scores[revenue ?? ""] ?? 0,
      max: SCORE_TABLES.revenue.max,
      reason: revenue || "Not provided",
    },
    {
      name: "Commitment",
      score: SCORE_TABLES.commitment.scores[commitment] ?? 0,
      max: SCORE_TABLES.commitment.max,
      reason: commitment ? `${commitment}% confident` : "Not provided",
    },
    {
      name: "Timeline",
      score: SCORE_TABLES.timeline.scores[timeline] ?? 0,
      max: SCORE_TABLES.timeline.max,
      reason: resolveLabel("timeline", timeline) || "Not provided",
    },
    {
      name: "Decision maker",
      score: SCORE_TABLES.decisionMaker.scores[decisionMaker] ?? 0,
      max: SCORE_TABLES.decisionMaker.max,
      reason: resolveLabel("decisionMaker", decisionMaker) || "Not provided",
    },
    {
      name: "Pain level",
      score: SCORE_TABLES.hoursWasted.scores[hoursWasted] ?? 0,
      max: SCORE_TABLES.hoursWasted.max,
      reason: resolveLabel("hoursWasted", hoursWasted) || "Not provided",
    },
    {
      name: "Team size",
      score: SCORE_TABLES.teamSize.scores[teamSize ?? ""] ?? 0,
      max: SCORE_TABLES.teamSize.max,
      reason: resolveLabel("teamSize", teamSize ?? "") || "Not provided",
    },
  ];
}

function formatKey(key: string): string {
  if (knownLabels[key]) return knownLabels[key];
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function formatValue(key: string, val: unknown): string {
  if (Array.isArray(val)) return val.join(", ");
  const str = String(val);
  return resolveLabel(key, str);
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (!client) notFound();

  const breadcrumbLabel = client.company
    ? `${client.name} (${client.company})`
    : client.name;

  const metadata = (client.metadata ?? {}) as Record<string, unknown>;
  const metadataEntries = Object.entries(metadata).filter(
    ([key, val]) => !hiddenKeys.has(key) && val != null && val !== "",
  );

  const contactItems = [
    { icon: MailIcon, label: "Email", value: client.email },
    { icon: PhoneIcon, label: "Phone", value: client.phone },
    { icon: GlobeIcon, label: "Website", value: client.website },
    {
      icon: MessageCircleIcon,
      label: "Preferred",
      value: client.preferred_contact === "imessage"
        ? "iMessage"
        : client.preferred_contact === "whatsapp"
          ? "WhatsApp"
          : client.preferred_contact,
    },
  ].filter((item) => item.value);

  const businessItems = [
    { icon: BuildingIcon, label: "Industry", value: client.industry },
    { icon: UsersIcon, label: "Team", value: client.team_size },
    { icon: DollarSignIcon, label: "Revenue", value: client.revenue },
    { icon: MegaphoneIcon, label: "Source", value: client.source },
  ].filter((item) => item.value);

  return (
    <div className="space-y-5">
      <SetBreadcrumb segment={id} label={breadcrumbLabel} />
      {/* Top bar: back + edit */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          render={<Link href="/dashboard/clients" />}
        >
          <ArrowLeftIcon className="size-3.5" />
          Clients
        </Button>
        <EditClientButton client={client} />
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight truncate">
            {client.name}
          </h1>
          <StatusBadge type="client" status={client.status} />
        </div>
        {client.company && (
          <p className="text-muted-foreground text-sm mt-0.5">
            {client.company}
          </p>
        )}
      </div>

      {/* Main content */}
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="space-y-5">
          {/* Lead score breakdown */}
          {client.lead_score != null && (() => {
            const stored = metadata.scoreBreakdown as ScoreFactor[] | undefined;
            const factors = stored ?? deriveScoreBreakdown(metadata, client.revenue, client.team_size);
            const scoreColor = client.lead_score >= 70
              ? "text-emerald-600"
              : client.lead_score >= 40
                ? "text-amber-600"
                : "text-muted-foreground";
            const barColor = client.lead_score >= 70
              ? "bg-emerald-500"
              : client.lead_score >= 40
                ? "bg-amber-500"
                : "bg-muted-foreground/40";

            return (
              <div className="rounded-lg border p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Lead Score
                </p>
                <div className="flex items-end gap-1.5">
                  <span className={`text-3xl font-bold tabular-nums ${scoreColor}`}>
                    {client.lead_score}
                  </span>
                  <span className="text-sm text-muted-foreground mb-1">/ 100</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${client.lead_score}%` }}
                  />
                </div>

                {/* Factor breakdown */}
                <div className="mt-4 pt-4 border-t space-y-3">
                  {factors.map((factor) => {
                    const pct = factor.max > 0 ? (factor.score / factor.max) * 100 : 0;
                    const factorBarColor = pct >= 70
                      ? "bg-emerald-500"
                      : pct >= 40
                        ? "bg-amber-500"
                        : "bg-muted-foreground/30";

                    return (
                      <div key={factor.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">{factor.name}</span>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {factor.score}/{factor.max}
                          </span>
                        </div>
                        <div className="h-1 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${factorBarColor}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                          {factor.reason}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Contact */}
          {contactItems.length > 0 && (
            <div className="rounded-lg border p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Contact
              </p>
              <div className="space-y-1">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 py-1.5 text-sm"
                  >
                    <item.icon className="size-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business */}
          {businessItems.length > 0 && (
            <div className="rounded-lg border p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Business
              </p>
              <div className="space-y-1">
                {businessItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 py-1.5 text-sm"
                  >
                    <item.icon className="size-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2.5 pt-2 mt-2 border-t text-xs text-muted-foreground">
                <CalendarIcon className="size-3 shrink-0" />
                <span>Added {formatDate(client.created_at)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Main area */}
        <div className="space-y-5">
          {/* Notes */}
          {client.notes && (
            <div className="rounded-lg border p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Notes
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {client.notes}
              </p>
            </div>
          )}

          {/* Intake Responses */}
          {metadataEntries.length > 0 && (
            <div className="rounded-lg border p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-5">
                Form Responses
              </p>
              <div className="space-y-5">
                {metadataEntries.map(([key, val]) => (
                  <div key={key}>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {formatKey(key)}
                    </p>
                    <p className="text-sm leading-relaxed">
                      {formatValue(key, val)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
