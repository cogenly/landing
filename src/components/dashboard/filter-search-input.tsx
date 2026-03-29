"use client";

import { useState, useCallback } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useFilterParams } from "./use-filter-params";

export function FilterSearchInput({
  placeholder = "Search...",
  paramName = "search",
  className,
}: {
  placeholder?: string;
  paramName?: string;
  className?: string;
}) {
  const { updateParams, searchParams } = useFilterParams();
  const [value, setValue] = useState(searchParams.get(paramName) || "");

  const commit = useCallback(() => {
    updateParams({ [paramName]: value });
  }, [paramName, value, updateParams]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        commit();
      }}
      className={className ?? "flex-1 min-w-[200px]"}
    >
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={commit}
          className="pl-9 h-9"
        />
      </div>
    </form>
  );
}
