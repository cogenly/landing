"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { IntakeForm } from "./intake-form";
import { Logo } from "./logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 flex w-full justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex items-center gap-2 rounded-2xl border px-4 py-2.5 transition-all duration-500",
          scrolled
            ? "border-white/15 bg-white/60 shadow-lg shadow-black/5 backdrop-blur-2xl backdrop-saturate-150"
            : "border-transparent bg-white/40 backdrop-blur-md"
        )}
      >
        <a href="#" className="mr-4">
          <Logo />
        </a>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-black/5 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <IntakeForm>
          <ShimmerButton
            className="ml-2 hidden h-8 px-4 text-sm font-semibold md:inline-flex"
            background="oklch(0.62 0.18 250)"
          >
            Book a Call
          </ShimmerButton>
        </IntakeForm>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="ml-1 rounded-lg p-1.5 transition-colors hover:bg-black/5 md:hidden">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetTitle>
              <Logo size="sm" />
            </SheetTitle>
            <div className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <IntakeForm>
                <ShimmerButton
                  className="mt-4 h-11 w-full text-base font-semibold"
                  background="oklch(0.62 0.18 250)"
                >
                  Book a Call
                </ShimmerButton>
              </IntakeForm>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
