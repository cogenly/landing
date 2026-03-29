"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

export async function createCall(formData: FormData) {
  const auth = await requireAuth();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { error } = await supabase.from("calls").insert({
    client_id: formData.get("client_id") as string,
    call_date: formData.get("call_date") as string,
    title: (formData.get("title") as string) || null,
    notes: (formData.get("notes") as string) || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/calls");
  return { success: true };
}

export async function updateCall(id: string, formData: FormData) {
  const auth = await requireAuth();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { error } = await supabase
    .from("calls")
    .update({
      client_id: formData.get("client_id") as string,
      call_date: formData.get("call_date") as string,
      title: (formData.get("title") as string) || null,
      notes: (formData.get("notes") as string) || null,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/calls");
  return { success: true };
}

export async function deleteCall(id: string) {
  const auth = await requireAuth();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { error } = await supabase.from("calls").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/calls");
  return { success: true };
}
