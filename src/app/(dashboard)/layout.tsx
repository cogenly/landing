import { redirect } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { AppSidebar } from "./app-sidebar";
import { DashboardBreadcrumb } from "./breadcrumb";
import {
  HeaderActionsProvider,
} from "./header-actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }
  return (
    <HeaderActionsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 backdrop-blur-sm px-5 rounded-t-[inherit]">
            <SidebarTrigger className="-ml-1" />
            <DashboardBreadcrumb />
          </header>
          <main className="flex-1 overflow-y-auto p-5">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </HeaderActionsProvider>
  );
}
