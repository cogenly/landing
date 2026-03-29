---
name: audit
description: Run a multi-step codebase audit that finds refactoring opportunities, duplicate patterns, inconsistencies, and code quality issues. Use this skill whenever the user says "/audit", "audit the codebase", "check for duplicates", "find things to refactor", "what needs cleanup", or asks about code quality, repeated patterns, or standardization opportunities. Also trigger when the user asks to review the codebase health or find technical debt.
---

# Codebase Audit

A structured, multi-step audit that combines programmatic checks (fast, deterministic) with AI-driven analysis (deeper pattern recognition). The goal is to surface concrete, actionable refactoring opportunities, not vague suggestions.

## How to Run

Run all steps in order. Present findings as a single report at the end, grouped by severity.

### Phase 1: Programmatic Checks

Run the audit script to get fast, deterministic signals:

```bash
bash <project-root>/.claude/skills/audit/scripts/audit.sh <project-root>/src
```

The script checks:
1. **Large files** (>200 lines) that may need splitting
2. **Duplicate imports** (same import in 3+ files, signals missing shared module)
3. **Repeated className strings** (identical Tailwind classes in 3+ places)
4. **Duplicate object literals** (Record/map definitions that appear in multiple files)
5. **TODO/FIXME markers** (unresolved work)
6. **Inline type assertions** (`as unknown as`) that suggest missing types

Capture the output. These are leads, not verdicts. Some will be false positives (e.g., a large file that's genuinely complex). Your job in Phase 2 is to investigate.

### Phase 2: AI-Driven Analysis

Using the programmatic signals as starting points, plus your own reading of the code, check for these patterns. Read the actual files before making claims.

#### 2a. Repeated UI Patterns
Look for JSX blocks that appear in similar form across 2+ files. These are extraction candidates. Focus on:
- Identical wrapper structures (same Card/div layout copy-pasted)
- Lists with the same item template
- Form field groups with the same label/input/error pattern
- Empty states, loading states, error boundaries

#### 2b. Inconsistent Data Patterns
Check whether similar operations use different approaches:
- Supabase queries: are they structured consistently? Same error handling?
- Date formatting: same approach everywhere or ad-hoc?
- Number formatting (currency, percentages): consistent?
- Null/undefined handling: `?? "-"` vs `|| "-"` vs ternaries

#### 2c. Missing Shared Types
Look for inline type definitions or `as unknown as { ... }` casts that repeat. These should be in a shared types file.

#### 2d. Component Boundaries
Flag components that:
- Do data fetching AND complex rendering (could split into container/presenter)
- Accept more than 8 props (might need composition instead)
- Have deeply nested ternaries or conditionals (extract sub-components)

#### 2e. Naming Consistency
Check for:
- Mixed naming conventions (camelCase vs kebab-case in file names)
- Inconsistent prop names across similar components
- Status/enum values that don't follow the same pattern

### Phase 3: Report

Present findings as a structured report. Group by severity:

**Critical** (duplicate code, actual bugs, type safety holes)
- What: specific description
- Where: file paths + line numbers
- Fix: concrete suggestion

**Recommended** (inconsistencies, missing abstractions, cleanup)
- What / Where / Fix (same format)

**Optional** (nice-to-haves, minor style issues)
- What / Where / Fix (same format)

At the end, provide a summary line count: "Found X critical, Y recommended, Z optional issues."

### What NOT to flag

- Working code that's simply "not how I'd write it" without a concrete improvement
- Single-use patterns (don't suggest extracting something used only once)
- Third-party code or generated files
- Test files (unless they have obvious bugs)
- Formatting issues that a linter should handle
