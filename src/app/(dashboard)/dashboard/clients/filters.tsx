"use client";

import { FilterSearchInput } from "@/components/dashboard/filter-search-input";
import { TableFilter } from "@/components/dashboard/table-filter";
import { useFilterParams } from "@/components/dashboard/use-filter-params";

const statusOptions = [
  { value: "lead", label: "Lead" },
  { value: "client", label: "Client" },
  { value: "churned", label: "Churned" },
];

const industryOptions = [
  { value: "Legal", label: "Legal" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Agency", label: "Agency" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Professional Services", label: "Professional Services" },
  { value: "SaaS", label: "SaaS" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Other", label: "Other" },
];

export function ClientFilters() {
  const { updateParams, searchParams } = useFilterParams();

  const status = searchParams.get("status") || "all";
  const industry = searchParams.get("industry") || "all";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <FilterSearchInput placeholder="Search clients..." />
      <div className="hidden h-5 w-px bg-border sm:block" />
      <div className="flex flex-wrap items-center gap-2">
        <TableFilter
          options={statusOptions}
          value={status}
          onValueChange={(v) => updateParams({ status: v })}
          placeholder="All Statuses"
        />
        <TableFilter
          options={industryOptions}
          value={industry}
          onValueChange={(v) => updateParams({ industry: v })}
          placeholder="All Industries"
        />
      </div>
    </div>
  );
}
