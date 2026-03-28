-- Cogenly: Initial Schema

-- Clients (leads through retained clients)
create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  company text,
  industry text,
  team_size int,
  monthly_revenue text,
  status text not null default 'lead'
    check (status in ('lead', 'call_scheduled', 'proposal', 'client', 'completed', 'lost')),
  source text
    check (source in ('linkedin', 'website', 'referral', 'skool')),
  preferred_contact text
    check (preferred_contact in ('imessage', 'whatsapp', 'email')),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Calls (discovery, followup, check-in)
create table calls (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  call_date timestamptz not null,
  call_type text not null
    check (call_type in ('discovery', 'followup', 'checkin')),
  duration_min int,
  transcript_path text,  -- path to transcript file in git (clients/<name>/transcripts/...)
  notes text,
  outcome text,
  created_at timestamptz default now()
);

-- Diagnoses (client system audit)
create table diagnoses (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  current_tools text[],
  current_process text,
  hours_spent_weekly numeric,
  labor_cost_monthly numeric,
  pain_points text,
  desired_outcome text,
  systems_used text[],
  additional_notes text,
  created_at timestamptz default now()
);

-- Projects (active deliverables)
create table projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  name text not null,
  status text not null default 'scoping'
    check (status in ('scoping', 'building', 'delivered', 'retainer')),
  description text,
  tech_stack text[],
  setup_fee numeric,
  monthly_retainer numeric,
  repo_url text,
  start_date date,
  delivery_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Decisions (architecture decisions, training data for future AI)
create table decisions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  reasoning text,
  alternatives_considered text,
  outcome text,
  created_at timestamptz default now()
);

-- Patterns (repeating solutions across clients/verticals)
create table patterns (
  id uuid primary key default gen_random_uuid(),
  vertical text,
  problem text not null,
  solution text,
  frequency int default 1,
  linked_project_ids uuid[],
  created_at timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger clients_updated_at
  before update on clients
  for each row execute function update_updated_at();

create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

-- RLS policies (enable row level security)
alter table clients enable row level security;
alter table calls enable row level security;
alter table diagnoses enable row level security;
alter table projects enable row level security;
alter table decisions enable row level security;
alter table patterns enable row level security;

-- Allow authenticated access (you + your site's service role)
create policy "Full access" on clients for all using (true);
create policy "Full access" on calls for all using (true);
create policy "Full access" on diagnoses for all using (true);
create policy "Full access" on projects for all using (true);
create policy "Full access" on decisions for all using (true);
create policy "Full access" on patterns for all using (true);
