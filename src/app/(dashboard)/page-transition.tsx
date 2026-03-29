"use client";

import { usePathname } from "next/navigation";
import { BlurFade } from "@/components/ui/blur-fade";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return <BlurFade key={pathname}>{children}</BlurFade>;
}
