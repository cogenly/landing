@AGENTS.md

# Cogenly Platform

## Agents

- **notion** (green) - all Notion CRM ops: query clients, log calls, update pipeline, manage views
- **frontend** (blue) - Next.js pages, components, UI, forms
- **git** (white) - commits, branches, PRs
- **playwright** (cyan) - screenshots, visual verification (only when explicitly asked)
- **cloudflare** (cyan) - deploy status, build logs, env vars, site management

Everything Cogenly lives here. Marketing site, client operations, integrations, automations. Run `claude` from this directory to operate the business.

## Architecture

### Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Platform | Next.js (this repo) | Marketing site + intake form |
| CRM | Notion | Clients, calls, pipeline, playbooks |
| Code | GitHub (`cogenly` org) | This repo + per-client repos |
| Domain | Namecheap | cogenly.com |
| DNS | Cloudflare | DNS + Workers + Pages via OpenNext |
| Banking | Mercury | Business account + invoicing |
| Registered Agent | Northwest Registered Agent | LLC / business registration |
| Acquisition | LinkedIn | Outreach + content |
| AI Brain | Claude Code | Orchestration, automation, glue |

### Repo Structure

```
platform/
  CLAUDE.md
  src/                     # Next.js app
    app/
      api/intake/          # POST endpoint: intake form -> Notion
      book-a-call/         # multi-step intake form
      components/          # page sections (navbar, hero, services, etc.)
      fonts/               # Open Sauce Sans (local)
      page.tsx             # main landing page
    components/ui/         # shadcn + magic-ui primitives
    lib/
      data.ts              # all marketing copy
      notion.ts            # Notion client wrapper
      scoring.ts           # lead scoring logic
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

### Notion Schema

**Clients Database** (ID: `333f446900f28003ac7df27e0873695f`)

Properties: Name (title), Email, Phone, Company, Website (URL), Industry, Status (select: partial/lead/client/churned), Preferred Contact (select)

Client statuses: `partial` (started form), `lead` (completed form), `client` (active), `churned` (former client)

**Applications Database** (ID: `334f446900f280bfb18aee0490d05c7c`)

Properties: Name (title), Client (relation), Lead Score (number), Revenue (select), Team Size (select), Source (select), Timeline (select), Commitment (percent), Decision Maker (select), Hours Wasted (select), What to Build, Current Process, Why Work With Us, Success Criteria, Concerns, Anything Else, Score Breakdown, Metadata

**Calls Database** (ID: `333f446900f28044bec3d4efb517bdb2`)

Properties: Title, Client (relation), Date, Notes, Transcript

### What Lives Where

| Data | Where | Why |
|------|-------|-----|
| Client info, status, pipeline | Notion Clients DB | Lean CRM records |
| Intake form submissions | Notion Applications DB | All form data, scoring, linked to clients |
| Call log, transcripts | Notion Calls DB | Linked to clients |
| Offers, sales framework | Notion | Same workspace as CRM |
| Marketing copy | `src/lib/data.ts` | Edit copy here, not in components |

## The Business

- **What we do:** Build and deploy custom AI systems for businesses (voice agents, workflow automation, document processing, internal tools)
- **Who we serve:** Any business with manual processes. Law firms, medical practices, agencies, e-commerce, professional services.
- **Pricing:** $5-15k setup + $1.5-3k/month retainer
- **Founder:** Alex Flekkas (CS @ UChicago)

## Client Lifecycle

```
1. INTAKE
   Prospect fills form on cogenly.com/book-a-call
   > Contact step creates partial record in Notion (status: partial)
   > Full submission promotes to (status: lead) with lead score

2. DISCOVERY CALL
   > Log call in Notion Calls DB, linked to client

3. CLOSE & ONBOARD
   > Create client dir in clients/
   > Create cogenly/client-<name> repo from template
   > Update Notion status: client
   > Send Mercury invoice (setup fee)

4. BUILD & DELIVER
   > Work in cogenly/client-<name> repo

5. RETAIN
   > Monthly Mercury invoice (retainer)
   > Check-in calls logged in Notion
   > If client leaves: update status to churned
```

## Tech Stack (Site)

- Next.js 16 (App Router) / React 19 / TypeScript
- Tailwind CSS v4 / shadcn/ui v4 / MagicUI
- Notion API (local MCP via `@notionhq/notion-mcp-server`) for CRM
- Font: Open Sauce Sans (local, `src/app/fonts/`) + Geist Mono (Google)
- Package manager: **bun** (never npm)
- Primary color: blue (`oklch(0.55 0.2 250)`)
- Hosting: Cloudflare (Workers + Pages via OpenNext)

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
- Notion is source of truth for client/CRM data
- Git is source of truth for documents
- Mercury for all invoicing
