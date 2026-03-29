"use server";

import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createClient_(formData: FormData) {
  const auth = await requireAuth();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const leadScoreRaw = formData.get("lead_score") as string;

  const { error } = await supabase.from("clients").insert({
    name: formData.get("name") as string,
    email: (formData.get("email") as string) || null,
    phone: (formData.get("phone") as string) || null,
    company: (formData.get("company") as string) || null,
    website: (formData.get("website") as string) || null,
    industry: (formData.get("industry") as string) || null,
    team_size: (formData.get("team_size") as string) || null,
    revenue: (formData.get("revenue") as string) || null,
    status: (formData.get("status") as string) || "lead",
    lead_score: leadScoreRaw ? parseInt(leadScoreRaw, 10) : null,
    source: (formData.get("source") as string) || null,
    preferred_contact: (formData.get("preferred_contact") as string) || null,
    notes: (formData.get("notes") as string) || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/clients");
  return { success: true };
}

export async function updateClient(id: string, formData: FormData) {
  const auth = await requireAuth();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const leadScoreRaw = formData.get("lead_score") as string;

  const { error } = await supabase
    .from("clients")
    .update({
      name: formData.get("name") as string,
      email: (formData.get("email") as string) || null,
      phone: (formData.get("phone") as string) || null,
      company: (formData.get("company") as string) || null,
      website: (formData.get("website") as string) || null,
      industry: (formData.get("industry") as string) || null,
      team_size: (formData.get("team_size") as string) || null,
      revenue: (formData.get("revenue") as string) || null,
      status: (formData.get("status") as string) || "lead",
      lead_score: leadScoreRaw ? parseInt(leadScoreRaw, 10) : null,
      source: (formData.get("source") as string) || null,
      preferred_contact: (formData.get("preferred_contact") as string) || null,
      notes: (formData.get("notes") as string) || null,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${id}`);
  return { success: true };
}

export async function deleteClient(id: string) {
  const auth = await requireAuth();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${id}`);
  return { success: true };
}
