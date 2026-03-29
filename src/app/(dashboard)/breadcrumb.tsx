"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbLabels } from "./breadcrumb-context";

const labels: Record<string, string> = {
  dashboard: "Dashboard",
  clients: "Clients",
  calls: "Calls",
  settings: "Settings",
};

function isUUID(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
}

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const { labels: dynamicLabels } = useBreadcrumbLabels();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold tracking-tight">
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Build crumbs from segments: ["dashboard", "clients", "uuid"]
  const crumbs = segments.slice(1); // skip "dashboard"

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink
            render={<Link href="/dashboard" />}
            className="text-muted-foreground/70"
          >
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        {crumbs.map((segment, i) => {
          const isLast = i === crumbs.length - 1;
          const href = "/dashboard/" + crumbs.slice(0, i + 1).join("/");

          // Resolve label: static map → dynamic context → fallback
          let label = labels[segment] ?? dynamicLabels[segment];
          if (!label && isUUID(segment)) {
            label = dynamicLabels[segment] ?? "...";
          }
          label = label ?? segment;

          return (
            <span key={segment} className="contents">
              <BreadcrumbSeparator className="hidden md:block text-muted-foreground/40" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-semibold tracking-tight">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={<Link href={href} />}
                    className="text-muted-foreground/70"
                  >
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
