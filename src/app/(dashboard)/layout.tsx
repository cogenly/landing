import Link from "next/link";
import { Logo } from "@/app/components/logo";
import { DashboardNav } from "./nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-sidebar lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-4">
            <Link href="/dashboard">
              <Logo />
            </Link>
          </div>
          <DashboardNav />
          <div className="mt-auto border-t px-6 py-4">
            <p className="text-xs text-muted-foreground">Cogenly Platform</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex items-center gap-4 border-b px-6 py-4 lg:hidden">
          <Link href="/dashboard">
            <Logo size="sm" />
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
