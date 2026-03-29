import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { NewCallButton } from "./call-form";
import { RowActions } from "./row-actions";
import { formatDate } from "@/lib/format";
import type { CallWithClient } from "@/lib/types";

export const metadata: Metadata = {
  title: "Calls",
  robots: { index: false, follow: false },
};

export default async function CallsPage() {
  const supabase = await createClient();

  const [{ data: rawCalls }, { data: clients }] = await Promise.all([
    supabase
      .from("calls")
      .select("*, clients(id, name, company)")
      .order("call_date", { ascending: false }),
    supabase.from("clients").select("id, name, company").order("name"),
  ]);

  const calls: CallWithClient[] | null = rawCalls as CallWithClient[] | null;

  const safeClients = (clients ?? []).map((c) => ({
    id: c.id as string,
    name: (c.name as string) ?? "",
    company: (c.company as string) ?? "",
  }));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Calls"
        description={`${calls?.length ?? 0} call${calls?.length === 1 ? "" : "s"} logged.`}
        action={<NewCallButton clients={safeClients} />}
      />

      {calls && calls.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">Title</TableHead>
                  <TableHead className="px-4">Client</TableHead>
                  <TableHead className="px-4">Date</TableHead>
                  <TableHead className="px-4 w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {(calls ?? []).map((call) => {
                  const client = call.clients;
                  const clientLabel = client
                    ? client.company || client.name
                    : "Unknown";

                  return (
                    <TableRow key={call.id}>
                      <TableCell className="px-4 font-medium">
                        {call.title || "Untitled"}
                      </TableCell>
                      <TableCell className="px-4 text-muted-foreground">
                        {clientLabel}
                      </TableCell>
                      <TableCell className="px-4 text-muted-foreground whitespace-nowrap">
                        {formatDate(call.call_date)}
                      </TableCell>
                      <TableCell className="px-4">
                        <RowActions
                          call={{
                            id: call.id,
                            client_id: call.client_id,
                            call_date: call.call_date,
                            title: call.title,
                            notes: call.notes,
                          }}
                          clients={safeClients}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <EmptyState message="No calls logged yet." />
      )}
    </div>
  );
}
