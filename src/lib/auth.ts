"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Verify the current user is authenticated.
 * Returns the Supabase client and user, or an error object.
 */
export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" } as const;

  return { supabase, user } as const;
}
