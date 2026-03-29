import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-5">
      <PageHeader title="Settings" description="Manage your account." />

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your login details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium">Name</p>
            <p className="text-sm text-muted-foreground">
              {user?.user_metadata?.full_name ?? "-"}
            </p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">
              {user?.email ?? "-"}
            </p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium">Provider</p>
            <p className="text-sm text-muted-foreground">
              {user?.app_metadata?.provider ?? "-"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
