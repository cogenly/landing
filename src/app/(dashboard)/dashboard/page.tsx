import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FolderOpen, Phone, TrendingUp } from "lucide-react";
import Link from "next/link";

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
    { count: projectCount },
    { count: callCount },
    { data: projects },
    { data: recentClients },
    { data: upcomingCalls },
  ] = await Promise.all([
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("status", "client"),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .in("status", ["scoping", "building"]),
    supabase
      .from("calls")
      .select("*", { count: "exact", head: true })
      .gte("call_date", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    supabase
      .from("projects")
      .select("monthly_retainer")
      .eq("status", "retainer"),
    supabase
      .from("clients")
      .select("id, name, company, status, lead_score, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("calls")
      .select("id, call_date, call_type, clients(name, company)")
      .gte("call_date", new Date().toISOString())
      .order("call_date", { ascending: true })
      .limit(5),
  ]);

  const mrr = (projects ?? []).reduce(
    (sum, p) => sum + (p.monthly_retainer ?? 0),
    0,
  );

  const statusColors: Record<string, string> = {
    lead: "bg-blue-100 text-blue-700",
    call_scheduled: "bg-yellow-100 text-yellow-700",
    proposal: "bg-purple-100 text-purple-700",
    client: "bg-green-100 text-green-700",
    completed: "bg-gray-100 text-gray-700",
    lost: "bg-red-100 text-red-700",
  };

  const cards = [
    {
      title: "Clients",
      value: String(clientCount ?? 0),
      description: "Active clients",
      icon: Users,
    },
    {
      title: "Projects",
      value: String(projectCount ?? 0),
      description: "In progress",
      icon: FolderOpen,
    },
    {
      title: "Calls",
      value: String(callCount ?? 0),
      description: "This month",
      icon: Phone,
    },
    {
      title: "Revenue",
      value: `$${mrr.toLocaleString()}`,
      description: "Monthly recurring",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back
          {user?.user_metadata?.full_name
            ? `, ${user.user_metadata.full_name}`
            : ""}
          .
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>
              Latest clients in the pipeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentClients && recentClients.length > 0 ? (
              <div className="space-y-3">
                {recentClients.map((client) => (
                  <Link
                    key={client.id}
                    href={`/dashboard/clients`}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {client.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {client.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {client.lead_score != null && (
                        <span className="text-xs text-muted-foreground">
                          {client.lead_score}
                        </span>
                      )}
                      <Badge
                        variant="secondary"
                        className={statusColors[client.status] ?? ""}
                      >
                        {client.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No clients yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Calls</CardTitle>
            <CardDescription>
              Scheduled discovery and check-in calls
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingCalls && upcomingCalls.length > 0 ? (
              <div className="space-y-3">
                {upcomingCalls.map((call) => {
                  const client = call.clients as unknown as {
                    name: string;
                    company: string;
                  } | null;
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
                          {new Date(call.call_date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {call.call_type}
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
