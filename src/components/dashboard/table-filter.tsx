"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FilterOption = {
  value: string;
  label: string;
};

export function TableFilter({
  options,
  value,
  onValueChange,
  placeholder,
  className,
}: {
  options: FilterOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <Select
      value={value === "all" ? undefined : value}
      onValueChange={(v) => onValueChange(v || "all")}
    >
      <SelectTrigger className={className ?? "w-[160px]"} size="default">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
