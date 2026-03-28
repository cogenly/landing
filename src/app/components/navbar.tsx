"use client";

import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Logo } from "./logo";
import Link from "next/link";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [open, setOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const handleScroll = useCallback(() => {
    const progress = Math.min(1, Math.max(0, window.scrollY / 80));
    setScrollProgress(progress);

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

  // Close menu on scroll
  useEffect(() => {
    if (!open) return;
    const close = () => toggleMenu();
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [open]);

  const toggleMenu = useCallback(() => {
    setTransitioning(true);
    setOpen((v) => !v);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => setTransitioning(false), 350);
  }, []);

  // When menu is open, treat as fully scrolled
  const sp = open ? 1 : scrollProgress;

  const headerStyle: CSSProperties = {
    paddingLeft: lerp(0, 16, sp) + "px",
    paddingRight: lerp(0, 16, sp) + "px",
    paddingTop:
      sp > 0.01
        ? `max(${lerp(0, 12, sp)}px, env(safe-area-inset-top, 0px))`
        : "0px",
    // Smooth transition when menu toggles, instant during scroll
    transition: transitioning
      ? "padding 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)"
      : "none",
  };

  const navStyle: CSSProperties = {
    maxWidth: lerp(80, 48, sp) + "rem",
    borderRadius: lerp(0, 24, sp) + "px",
    backgroundColor: `rgba(255, 255, 255, ${lerp(0, 0.7, sp)})`,
    backdropFilter: `blur(${lerp(0, 40, sp)}px) saturate(${lerp(100, 150, sp)}%)`,
    WebkitBackdropFilter: `blur(${lerp(0, 40, sp)}px) saturate(${lerp(100, 150, sp)}%)`,
    boxShadow: `0 10px 15px -3px rgba(0, 0, 0, ${lerp(0, 0.03, sp)})`,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: `rgba(255, 255, 255, ${lerp(0, 0.2, sp)})`,
    paddingInline: lerp(24, 12, sp) + "px",
    paddingBlock: lerp(20, 8, sp) + "px",
    // Smooth transition when menu toggles, instant during scroll
    transition: transitioning
      ? "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)"
      : "none",
  };

  // Hamburger button border opacity: fades out as you scroll
  const buttonBorderOpacity = open ? 0 : Math.max(0, 1 - sp * 10);

  return (
    <header className="fixed top-0 z-50 w-full" style={headerStyle}>
      <nav className="relative mx-auto" style={navStyle}>
        {/* Subtle blue glow on bottom edge */}
        {sp > 0.8 && !open && (
          <div
            className="pointer-events-none absolute inset-x-0 -bottom-px h-px"
            style={{ opacity: (sp - 0.8) / 0.2 }}
          >
            <div className="mx-auto h-full w-2/3 bg-gradient-to-r from-transparent via-[oklch(0.62_0.18_250/0.4)] to-transparent" />
          </div>
        )}

        {/* Top bar */}
        <div className="flex items-center justify-between">
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
              className="hidden origin-right md:inline-flex"
              style={{ transform: `scale(${lerp(1, 0.9, sp)})` }}
            >
              <ShimmerButton
                className="group/cta h-9 px-5 py-1.5 text-sm font-semibold"
                background="oklch(0.62 0.18 250)"
              >
                Get Started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
              </ShimmerButton>
            </Link>

            {/* Mobile hamburger / close */}
            <motion.button
              onClick={toggleMenu}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", damping: 15, stiffness: 400 }}
              className="relative rounded-full p-2.5 md:hidden"
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: `var(--border-color, oklch(0.922 0 0 / ${buttonBorderOpacity}))`,
                transition: "border-color 0.3s ease",
              }}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-5 w-5">
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{ rotate: open ? 0 : -90, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              </span>
            </motion.button>
          </div>
        </div>

        {/* Mobile dropdown - expands from the pill */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
              }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col pb-3 pt-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={toggleMenu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{
                      delay: 0.04 * i,
                      type: "spring",
                      damping: 22,
                      stiffness: 350,
                    }}
                    className="rounded-xl px-4 py-3 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.div
                  className="px-3 pt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    delay: 0.04 * navLinks.length,
                    type: "spring",
                    damping: 22,
                    stiffness: 350,
                  }}
                >
                  <Link href="/book-a-call" onClick={toggleMenu}>
                    <ShimmerButton
                      className="group/cta h-11 w-full text-sm font-semibold"
                      background="oklch(0.62 0.18 250)"
                    >
                      Get Started
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
                    </ShimmerButton>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
