"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientForm } from "../client-form";
import type { Client } from "@/lib/types";

export function EditClientButton({ client }: { client: Client }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <PencilIcon />
        Edit
      </Button>
      <ClientForm open={open} onOpenChange={setOpen} defaultValues={client} />
    </>
  );
}
