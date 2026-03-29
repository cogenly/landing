import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Field } from "@/components/dashboard/field";
import { TIMELINES, COMMITMENT_LEVELS, AI_EXPERIENCE, TEAM_SIZES, HOURS_WASTED, DECISION_MAKERS } from "@/lib/questions";
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

const metadataLabels: Record<string, string> = {
  whyWork: "Why they want to work with us",
  aiExperience: "AI experience",
  aiBranch: "AI experience detail",
  whatToBuild: "What they want to build",
  currentProcess: "Current process",
  hoursWasted: "Hours wasted",
  hoursWastedBranch: "Hours wasted detail",
  success: "What success looks like",
  decisionMaker: "Decision maker",
  decisionMakerBranch: "Decision maker detail",
  timeline: "Timeline",
  timelineBranch: "Timeline detail",
  commitment: "Commitment level",
  concerns: "Concerns",
  anythingElse: "Anything else",
  howFoundDetail: "How they found us (detail)",
  teamSizeBranch: "Team size detail",
  last_step: "Last step reached",
  startedAt: "Form started",
};


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

  const metadata = (client.metadata ?? {}) as Record<string, string>;
  const metadataEntries = Object.entries(metadataLabels).filter(
    ([key]) => metadata[key],
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon-sm"
          render={<Link href="/dashboard/clients" />}
        >
          <ArrowLeftIcon />
          <span className="sr-only">Back to clients</span>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold tracking-tight truncate">
            {client.name}
          </h1>
          {client.company && (
            <p className="text-muted-foreground text-sm">{client.company}</p>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <StatusBadge type="client" status={client.status} />
          <EditClientButton client={client} />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Field label="Email" value={client.email} />
            <Field label="Phone" value={client.phone} />
            <Field label="Website" value={client.website} />
            <Field label="Preferred contact" value={client.preferred_contact} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Business</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Field label="Industry" value={client.industry} />
            <Field label="Team size" value={client.team_size} />
            <Field label="Revenue" value={client.revenue} />
            <Field label="Source" value={client.source} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Field label="Status">
              <StatusBadge type="client" status={client.status} />
            </Field>
            {client.lead_score != null && (
              <Field label="Lead Score">
                <p
                  className={`text-sm font-semibold ${
                    client.lead_score >= 70
                      ? "text-green-600"
                      : client.lead_score >= 40
                        ? "text-yellow-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {client.lead_score} / 100
                </p>
              </Field>
            )}
            <Field label="Added" value={formatDate(client.created_at)} />
          </CardContent>
        </Card>
      </div>

      {client.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{client.notes}</p>
          </CardContent>
        </Card>
      )}

      {metadataEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Intake Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {metadataEntries.map(([key, label]) => (
                <Field key={key} label={label} value={resolveLabel(key, metadata[key])} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
