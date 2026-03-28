-- Cogenly: Initial Schema

-- Clients (leads through retained clients)
create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  company text,
  website text,
  industry text,
  team_size text,
  revenue text,
  status text not null default 'lead'
    check (status in ('lead', 'call_scheduled', 'proposal', 'client', 'completed', 'lost')),
  lead_score int,
  source text,
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
  transcript_path text,
  notes text,
  outcome text,
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

-- Decisions (architecture decisions per project)
create table decisions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  reasoning text,
  alternatives_considered text,
  outcome text,
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

-- RLS policies (authenticated users only)
alter table clients enable row level security;
alter table calls enable row level security;
alter table projects enable row level security;
alter table decisions enable row level security;

create policy "Authenticated access" on clients for all to authenticated using (true) with check (true);
create policy "Authenticated access" on calls for all to authenticated using (true) with check (true);
create policy "Authenticated access" on projects for all to authenticated using (true) with check (true);
create policy "Authenticated access" on decisions for all to authenticated using (true) with check (true);
