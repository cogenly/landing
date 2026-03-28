@AGENTS.md

# Cogenly Landing Page

## What This Is
Landing page for Cogenly, an AI systems implementation company. Cogenly builds AI systems that replace manual, repetitive work for businesses. Voice agents, workflow automation, document processing, internal tools.

This is NOT a SaaS product page. This is a services company page. The goal is to get business owners to book a discovery call.

## The Business
- **What we do:** Build and deploy custom AI systems for businesses (voice agents, workflow automation, document processing, internal tools)
- **Who we serve:** Any business with manual processes that need to die. Law firms, medical practices, agencies, e-commerce, professional services. Generalist for now, niching down later.
- **Pricing:** $5-15k setup + $1.5-3k/month retainer
- **Founder:** Alex Flekkas (CS @ UChicago, built MediaMaxxing platform, Claude Code content creator)
- **Domain:** cogenly.com (not yet live)

## Positioning & Vibe
- Clean, confident, slightly cheeky. Same energy as the Relay v1 site (mpcs-51238 project)
- NOT corporate. NOT meme-y. Somewhere in between: professional but human
- Direct copy that sounds like a person, not a brochure
- "Your team is doing work a machine should be doing. We fix that." energy
- The site should make a business owner think: "these people get it, I want to talk to them"
- **No em dashes. Ever.** Use commas, periods, colons, or parentheses instead.

## Tech Stack
- Next.js 16 (App Router) / React 19 / TypeScript
- Tailwind CSS v4 / shadcn/ui v4 / MagicUI
- Font: Open Sauce Sans (local, `src/app/fonts/`) + Geist Mono (Google)
- Package manager: **bun** (never npm)
- Primary color: blue (`oklch(0.55 0.2 250)`)
- Hosting: Vercel (planned)

## Architecture
- `src/app/page.tsx` -- main landing page, composes all section components
- `src/app/components/` -- section components (navbar, hero, services, how-it-works, stats, faq, cta, footer)
- `src/lib/data.ts` -- all copy, FAQ content, service descriptions, nav links, footer links. Edit copy here, not in components.
- `src/components/ui/` -- shadcn + magic-ui primitives (don't edit these directly)

## Design Reference
The v1 Relay site (`mpcs-51238-website.vercel.app/v1`) is the design reference. Same component patterns:
- Floating glass navbar with backdrop blur
- DotPattern backgrounds on hero and CTA sections
- BlurFade entrance animations on all sections
- MagicCard for service cards
- AnimatedBeam connecting how-it-works steps
- ShimmerButton for primary CTAs
- NumberTicker for stats
- Accordion for FAQ
- Marquee for testimonials (placeholder for now, will populate with real case studies)

## Current State
- All sections built and working
- Copy is first draft from brainstorming session
- Testimonials section intentionally minimal (one placeholder). Will populate after first client engagements.
- Stats are aspirational/projected, not yet backed by real data. Update as real case studies come in.
- CTAs link to mailto:alex@cogenly.com for now. Will switch to Calendly or Typeform once set up.

## What Comes Next
- [ ] Buy cogenly.com domain
- [ ] Deploy to Vercel
- [ ] Set up Calendly and swap CTA links
- [ ] Add real testimonials after Parsa and Jon engagements
- [ ] Update stats with real numbers from first clients
- [ ] Potentially add a "Case Studies" section once we have 2-3
- [ ] Add og:image and social meta tags
- [ ] Consider adding a "The Problem" section between hero and services
