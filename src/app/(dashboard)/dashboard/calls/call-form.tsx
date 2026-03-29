"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { createCall, updateCall } from "./actions";

type Client = { id: string; name: string; company: string };

type CallFormValues = {
  id?: string;
  client_id?: string;
  call_date?: string;
  title?: string | null;
  notes?: string | null;
};

export function CallForm({
  open,
  onOpenChange,
  defaultValues,
  clients,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: CallFormValues;
  clients: Client[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [clientId, setClientId] = useState(
    defaultValues?.client_id ?? "",
  );
  const [callDate, setCallDate] = useState<Date | null>(
    defaultValues?.call_date ? new Date(defaultValues.call_date) : null,
  );

  const isEdit = !!defaultValues?.id;

  function handleOpenChange(next: boolean) {
    if (!isPending) onOpenChange(next);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("client_id", clientId);
    formData.set(
      "call_date",
      callDate ? format(callDate, "yyyy-MM-dd") : "",
    );

    startTransition(async () => {
      const result = isEdit
        ? await updateCall(defaultValues!.id!, formData)
        : await createCall(formData);

      if (result?.error) {
        setError(result.error);
        return;
      }

      onOpenChange(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Call" : "Log a Call"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Client</Label>
              <Select value={clientId || undefined} onValueChange={setClientId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.length === 0 ? (
                    <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                      No clients yet. Add a client first.
                    </div>
                  ) : (
                    clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.company ? `${c.company} - ${c.name}` : c.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Date</Label>
              <DatePicker
                value={callDate}
                onChange={(d) => setCallDate(d ?? null)}
                placeholder="Select date"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={defaultValues?.title ?? ""}
              placeholder="e.g. Discovery call with Marcus"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Transcript</Label>
            <Textarea
              id="notes"
              name="notes"
              rows={10}
              defaultValue={defaultValues?.notes ?? ""}
              placeholder="Paste the full call transcript here..."
              className="min-h-[200px] font-mono text-xs"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !clientId || !callDate}
            >
              {isPending
                ? isEdit
                  ? "Saving..."
                  : "Logging..."
                : isEdit
                  ? "Save Changes"
                  : "Log Call"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function NewCallButton({ clients }: { clients: Client[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Log Call
      </Button>
      <CallForm open={open} onOpenChange={setOpen} clients={clients} />
    </>
  );
}
