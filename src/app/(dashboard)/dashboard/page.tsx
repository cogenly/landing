import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Phone, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Stat, StatGroup } from "@/components/dashboard/stat-card";
import { formatDate, formatDateTime } from "@/lib/format";
import type { UpcomingCall } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    { count: clientCount },
    { count: leadCount },
    { count: callCount },
    { data: recentLeads },
    { data: rawUpcomingCalls },
  ] = await Promise.all([
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("status", "client"),
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("status", "lead"),
    supabase
      .from("calls")
      .select("*", { count: "exact", head: true })
      .gte("call_date", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    supabase
      .from("clients")
      .select("id, name, company, email, status, lead_score, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("calls")
      .select("id, call_date, title, clients(name, company)")
      .gte("call_date", new Date().toISOString())
      .order("call_date", { ascending: true })
      .limit(5),
  ]);

  const upcomingCalls: UpcomingCall[] | null =
    rawUpcomingCalls as UpcomingCall[] | null;

  return (
    <div className="space-y-5">
      <PageHeader
          title="Dashboard"
          description={
            <>
              Welcome back
              {user?.user_metadata?.full_name
                ? `, ${user.user_metadata.full_name}`
                : ""}
              .
            </>
          }
        />

      <StatGroup columns={4}>
        <Stat icon={Users} label="Active Clients" value={clientCount ?? 0} />
        <Stat icon={TrendingUp} label="Open Leads" value={leadCount ?? 0} />
        <Stat icon={Phone} label="Calls This Month" value={callCount ?? 0} />
        <Stat
          icon={DollarSign}
          label="Pipeline"
          value={`${(clientCount ?? 0) + (leadCount ?? 0)}`}
        />
      </StatGroup>

      <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <p className="text-sm text-muted-foreground">
                Latest form submissions
              </p>
            </CardHeader>
            <CardContent>
              {recentLeads && recentLeads.length > 0 ? (
                <div className="space-y-3">
                  {recentLeads.map((lead) => (
                    <Link
                      key={lead.id}
                      href="/dashboard/clients"
                      className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {lead.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {lead.company
                            ? `${lead.company} · ${lead.email ?? ""}`
                            : (lead.email ?? "")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(lead.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {lead.lead_score != null && (
                          <span className="text-xs text-muted-foreground">
                            {lead.lead_score}
                          </span>
                        )}
                        <StatusBadge type="client" status={lead.status} />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No leads yet.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Calls</CardTitle>
              <p className="text-sm text-muted-foreground">
                Scheduled discovery and check-in calls
              </p>
            </CardHeader>
            <CardContent>
              {upcomingCalls && upcomingCalls.length > 0 ? (
                <div className="space-y-3">
                  {upcomingCalls.map((call) => {
                    const client = call.clients;
                    return (
                      <div
                        key={call.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {client?.name ?? "Unknown"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {client?.company}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm">
                            {formatDateTime(call.call_date)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {call.title || "Untitled"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No upcoming calls.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
