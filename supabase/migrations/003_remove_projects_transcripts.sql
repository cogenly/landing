-- Migration 003: Remove decisions, projects tables and transcript_path column

-- Drop decisions RLS policy and table first (FK references projects)
drop policy if exists "Authenticated access" on decisions;
drop table if exists decisions;

-- Drop projects RLS policy, trigger, and table
drop policy if exists "Authenticated access" on projects;
drop trigger if exists projects_updated_at on projects;
drop table if exists projects;

-- Remove transcript_path column from calls
alter table calls drop column if exists transcript_path;
