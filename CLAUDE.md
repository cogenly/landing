@AGENTS.md

# Cogenly Platform

## Agents

- **supabase** (green) - all database work, migrations, server actions, queries
- **frontend** (blue) - Next.js pages, components, UI, forms
- **git** (white) - commits, branches, PRs
- **playwright** (cyan) - screenshots, visual verification (only when explicitly asked)

Everything Cogenly lives here. Marketing site, client operations, integrations, automations. Run `claude` from this directory to operate the business.

## Architecture

### Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Platform | Next.js (this repo) | Marketing site + admin dashboard |
| Data | Supabase | Clients, calls, projects, intake submissions |
| Code | GitHub (`cogenly` org) | This repo + per-client repos |
| Domain | Namecheap | cogenly.com |
| Banking | Mercury | Business account + invoicing |
| Acquisition | LinkedIn | Outreach + content |
| Playbooks | Notion | Sales framework, offer stack, call prep |
| AI Brain | Claude Code | Orchestration, automation, glue |

### Repo Structure

```
platform/
  CLAUDE.md
  proxy.ts                 # Next.js 16 proxy (auth route protection)
  src/                     # Next.js app
    app/
      (auth)/              # login/signup pages (admin-only, no public signup)
      (dashboard)/         # admin dashboard (sidebar layout, protected)
      auth/callback/       # Supabase auth callback handler
      components/          # page sections (navbar, hero, services, etc.)
      fonts/               # Open Sauce Sans (local)
      page.tsx             # main landing page
    components/ui/         # shadcn + magic-ui primitives
    lib/
      auth/actions.ts      # server actions: login, signup, logout
      data.ts              # all marketing copy
      supabase/            # Supabase clients (browser + server)
  supabase/
    migrations/            # SQL schema migrations
  clients/                 # per-client docs
    <client-name>/
      README.md            # everything known about client
      transcripts/         # call transcripts (full text)
      architecture/        # system design, decisions
  templates/               # starters for client project repos
  patterns/                # reusable solutions by vertical
  scripts/                 # automation (onboarding, proposals)
  public/                  # static assets (logo, etc.)
```

### Supabase Schema

Tables: `clients`, `intake_submissions`, `calls`, `projects`, `decisions`, `profiles`

See `supabase/migrations/` for full schema. Key migrations:
- `001_initial_schema.sql` - core business tables
- `002_profiles.sql` - user profiles linked to Supabase Auth, auto-created on signup

### What Lives Where

| Data | Where | Why |
|------|-------|-----|
| Client info, status, pipeline | Supabase | Queryable, intake form writes here |
| Call transcripts (full text) | Git `clients/<name>/transcripts/` | Long docs, Claude reads directly |
| Call metadata (date, outcome) | Supabase `calls` table | Queryable |
| Intake form submissions | Supabase `intake_submissions` table | Full form responses in JSONB |
| Architecture decisions | Git `clients/<name>/architecture/` + Supabase | Detail in git, metadata in db |
| Project status | Supabase `projects` table | Pipeline tracking |
| Offers, sales framework | Notion | Low volume, already exists |
| Marketing copy | `src/lib/data.ts` | Edit copy here, not in components |

## The Business

- **What we do:** Build and deploy custom AI systems for businesses (voice agents, workflow automation, document processing, internal tools)
- **Who we serve:** Any business with manual processes. Law firms, medical practices, agencies, e-commerce, professional services.
- **Pricing:** $5-15k setup + $1.5-3k/month retainer
- **Founder:** Alex Flekkas (CS @ UChicago)

## Client Lifecycle

```
1. INTAKE
   Prospect fills form on cogenly.com
   > Writes to Supabase clients table (status: lead)
   > Notification sent

2. DISCOVERY CALL
   > Record and transcribe call
   > Save transcript: clients/<name>/transcripts/discovery_YYYYMMDD.md
   > Log metadata to Supabase calls table
   > Update client status: call_scheduled

3. DIAGNOSIS
   Client fills diagnosis form
   > Writes to Supabase diagnoses table
   > Claude reads diagnosis + transcript, generates proposal
   > Update client status: proposal

4. CLOSE & ONBOARD
   > Create client dir in clients/
   > Create cogenly/client-<name> repo from template
   > Update Supabase status: client
   > Send Mercury invoice (setup fee)

5. BUILD & DELIVER
   > Work in cogenly/client-<name> repo
   > Log decisions in clients/<name>/architecture/
   > Track project in Supabase

6. RETAIN
   > Monthly Mercury invoice (retainer)
   > Check-in calls logged
   > Patterns extracted to patterns/
```

## Auth

- Supabase Auth (email/password)
- Admin-only login. No public signup. Create admin users via Supabase dashboard.
- `profiles` table auto-created on signup with `role: 'client'` default. Set to `'admin'` manually.
- `proxy.ts` protects `/dashboard/*` routes, redirects to `/login`
- Logged-in users on `/login` get redirected to `/dashboard`

## Tech Stack (Site)

- Next.js 16 (App Router) / React 19 / TypeScript
- Tailwind CSS v4 / shadcn/ui v4 / MagicUI
- Supabase (Auth + Postgres)
- Font: Open Sauce Sans (local, `src/app/fonts/`) + Geist Mono (Google)
- Package manager: **bun** (never npm)
- Primary color: blue (`oklch(0.55 0.2 250)`)
- Hosting: Netlify

## Design

- Clean, confident, slightly cheeky. Professional but human.
- NOT corporate. NOT meme-y.
- Direct copy that sounds like a person, not a brochure.
- **No em dashes. Ever.** Use commas, periods, colons, or parentheses instead.

### Design Reference
- Floating glass navbar with backdrop blur
- DotPattern backgrounds on hero and CTA sections
- BlurFade entrance animations on all sections
- MagicCard for service cards
- AnimatedBeam connecting how-it-works steps
- ShimmerButton for primary CTAs
- NumberTicker for stats
- Accordion for FAQ

## Conventions

- Client dirs: lowercase, hyphenated (`clients/parsa/`)
- Client repos: `client-<company-name>` in cogenly org (private)
- Supabase is source of truth for structured data
- Git is source of truth for documents
- Notion only for personal playbooks (sales framework, offers). NOT for client data.
- Mercury for all invoicing
- Every call recorded and transcribed
- Every architecture decision documented with reasoning
