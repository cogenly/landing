"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled,
}: {
  value?: Date | null;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "border-input data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 bg-transparent flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap shadow-none transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9",
              !value && "text-muted-foreground",
              className,
            )}
          />
        }
      >
        <CalendarIcon className="size-4 shrink-0" />
        {value ? format(value, "PPP") : <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
