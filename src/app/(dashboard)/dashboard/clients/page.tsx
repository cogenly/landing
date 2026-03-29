import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { EmptyState } from "@/components/dashboard/empty-state";
import { NewClientButton } from "./client-form";
import { RowActions } from "./row-actions";
import { ClientFilters } from "./filters";

export const metadata: Metadata = {
  title: "Clients",
  robots: { index: false, follow: false },
};

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; industry?: string }>;
}) {
  const params = await searchParams;
  const search = params.search?.trim() || "";
  const status = params.status || "";
  const industry = params.industry || "";

  const supabase = await createClient();

  let query = supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,company.ilike.%${search}%,email.ilike.%${search}%`,
    );
  }
  if (status && status !== "all") {
    query = query.eq("status", status);
  } else {
    query = query.neq("status", "partial");
  }
  if (industry && industry !== "all") {
    query = query.eq("industry", industry);
  }

  const { data: clients } = await query;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Clients"
        description={`${clients?.length ?? 0} total clients in the pipeline.`}
        action={<NewClientButton />}
      />

      <Suspense>
        <ClientFilters />
      </Suspense>

      {clients && clients.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Company</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Score</th>
                    <th className="px-6 py-3 font-medium">Industry</th>
                    <th className="px-6 py-3 font-medium">Revenue</th>
                    <th className="px-6 py-3 font-medium">Source</th>
                    <th className="px-6 py-3 font-medium">Added</th>
                    <th className="px-6 py-3 font-medium sr-only">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr
                      key={client.id}
                      className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/clients/${client.id}`}
                          className="block hover:underline underline-offset-2"
                        >
                          <p className="font-medium">{client.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {client.email}
                          </p>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {client.company ?? "-"}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge type="client" status={client.status} />
                      </td>
                      <td className="px-6 py-4">
                        {client.lead_score != null ? (
                          <span
                            className={
                              client.lead_score >= 70
                                ? "font-semibold text-green-600"
                                : client.lead_score >= 40
                                  ? "text-yellow-600"
                                  : "text-muted-foreground"
                            }
                          >
                            {client.lead_score}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {client.industry ?? "-"}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {client.revenue ?? "-"}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {client.source ?? "-"}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                        {new Date(client.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-2 py-4">
                        <RowActions
                          client={{
                            id: client.id,
                            name: client.name,
                            email: client.email,
                            phone: client.phone,
                            company: client.company,
                            website: client.website,
                            industry: client.industry,
                            team_size: client.team_size,
                            revenue: client.revenue,
                            status: client.status,
                            lead_score: client.lead_score,
                            source: client.source,
                            preferred_contact: client.preferred_contact,
                            notes: client.notes,
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <EmptyState message="No clients yet." />
      )}
    </div>
  );
}
