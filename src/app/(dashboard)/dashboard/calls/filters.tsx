"use client";

import { FilterSearchInput } from "@/components/dashboard/filter-search-input";
import { TableFilter } from "@/components/dashboard/table-filter";
import { useFilterParams } from "@/components/dashboard/use-filter-params";

type ClientOption = { id: string; name: string; company: string };

export function CallFilters({ clients }: { clients: ClientOption[] }) {
  const { updateParams, searchParams } = useFilterParams();

  const clientId = searchParams.get("client") || "all";

  const clientOptions = clients.map((c) => ({
    value: c.id,
    label: c.company ? `${c.company} - ${c.name}` : c.name,
  }));

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <FilterSearchInput placeholder="Search calls..." />
      <div className="hidden h-5 w-px bg-border sm:block" />
      <div className="flex flex-wrap items-center gap-2">
        <TableFilter
          options={clientOptions}
          value={clientId}
          onValueChange={(v) => updateParams({ client: v })}
          placeholder="All Clients"
          className="w-[200px]"
        />
      </div>
    </div>
  );
}
