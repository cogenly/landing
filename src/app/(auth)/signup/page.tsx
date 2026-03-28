import { redirect } from "next/navigation";

// Signup is disabled. Only admins can log in, created via Supabase dashboard.
export default function SignupPage() {
  redirect("/login");
}
