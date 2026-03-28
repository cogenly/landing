"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Logo } from "./logo";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [open, setOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = navLinks
      .map((link) => link.href.replace("#", ""))
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    let current = "";
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200) {
        current = section.id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled ? "px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6" : "px-0 pt-0"
      )}
    >
      <nav
        className={cn(
          "relative mx-auto flex items-center justify-between transition-all duration-500",
          scrolled
            ? "max-w-3xl rounded-full border border-white/20 bg-white/70 px-3 py-2 shadow-lg shadow-black/[0.03] backdrop-blur-2xl backdrop-saturate-150"
            : "max-w-7xl border-b border-transparent bg-transparent px-6 py-5 sm:px-8 lg:px-12"
        )}
      >
        {/* Subtle blue glow on bottom edge when scrolled */}
        {scrolled && (
          <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px">
            <div className="mx-auto h-full w-2/3 bg-gradient-to-r from-transparent via-[oklch(0.62_0.18_250/0.4)] to-transparent" />
          </div>
        )}

        {/* Logo */}
        <a href="#" className="relative z-10 shrink-0">
          <Logo />
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-[oklch(0.62_0.18_250)] transition-all duration-300",
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-60"
                  )}
                />
              </a>
            );
          })}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="relative z-10 flex items-center gap-2">
          <Link
            href="/book-a-call"
            className={cn(
              "hidden origin-right transition-transform duration-500 md:inline-flex",
              scrolled ? "scale-90" : "scale-100"
            )}
          >
            <ShimmerButton
              className="group/cta h-9 px-5 py-1.5 text-sm font-semibold"
              background="oklch(0.62 0.18 250)"
            >
              Get Started
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
            </ShimmerButton>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                "rounded-full p-2.5 transition-colors hover:bg-black/5 md:hidden",
                !scrolled && "border border-border"
              )}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l-0 bg-white p-0"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center border-b border-border/50 px-6 py-4">
                  <Logo size="sm" />
                </div>

                <div className="flex flex-1 flex-col gap-1 px-4 pt-6">
                  {navLinks.map((link, i) => (
                    <BlurFade key={link.href} delay={0.05 * (i + 1)} inView>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground transition-all hover:bg-[oklch(0.62_0.18_250/0.05)] hover:text-foreground"
                      >
                        <span className="h-1 w-1 rounded-full bg-[oklch(0.62_0.18_250)] opacity-0 transition-opacity group-hover:opacity-100" />
                        {link.label}
                      </a>
                    </BlurFade>
                  ))}
                </div>

                <div className="p-6">
                  <BlurFade delay={0.25} inView>
                    <Link href="/book-a-call" onClick={() => setOpen(false)}>
                      <ShimmerButton
                        className="group/cta h-12 w-full text-base font-semibold"
                        background="oklch(0.62 0.18 250)"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                      </ShimmerButton>
                    </Link>
                  </BlurFade>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
