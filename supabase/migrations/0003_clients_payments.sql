-- ============================================================================
-- Tony Sameh Portfolio — Clients & Payments (admin-only CRM + revenue)
-- Run in Supabase SQL Editor. Creates:
--   * clients      — private customer records (admin only)
--   * client_notes — per-client timeline / notes
--   * payments     — income/payments ledger (admin only)
-- RLS: no public access. Only authenticated users (admin) can read/write.
-- ============================================================================

-- ------------------------------------------------------------
-- CLIENTS
-- ------------------------------------------------------------
create table if not exists public.clients (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  phone       text,
  email       text,
  location    text default 'القاهرة، مصر',
  status      text not null default 'active'
              check (status in ('active','won','prospect','archived')),
  tags        text[] default '{}',
  notes       text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
create index if not exists clients_status_idx on public.clients (status);
create index if not exists clients_created_idx on public.clients (created_at desc);

-- ------------------------------------------------------------
-- CLIENT NOTES (timeline)
-- ------------------------------------------------------------
create table if not exists public.client_notes (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references public.clients (id) on delete cascade,
  body        text not null,
  created_at  timestamptz default now()
);
create index if not exists client_notes_client_idx on public.client_notes (client_id, created_at desc);

-- ------------------------------------------------------------
-- PAYMENTS (revenue ledger)
-- ------------------------------------------------------------
create table if not exists public.payments (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid references public.clients (id) on delete set null,
  project_id  uuid references public.projects (id) on delete set null,
  amount      numeric(12,2) not null check (amount >= 0),
  currency    text not null default 'EGP',
  date        date not null default current_date,
  status      text not null default 'paid'
              check (status in ('paid','pending','partial')),
  method      text default 'cash'
              check (method in ('cash','bank_transfer','instapay','vodafone_cash','other')),
  note        text,
  created_at  timestamptz default now()
);
create index if not exists payments_date_idx on public.payments (date desc);
create index if not exists payments_client_idx on public.payments (client_id);
create index if not exists payments_status_idx on public.payments (status);

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY — admin only, no public access
-- ------------------------------------------------------------
alter table public.clients enable row level security;
alter table public.client_notes enable row level security;
alter table public.payments enable row level security;

-- Authenticated (admin) full access
drop policy if exists "auth all clients" on public.clients;
create policy "auth all clients" on public.clients
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth all client_notes" on public.client_notes;
create policy "auth all client_notes" on public.client_notes
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth all payments" on public.payments;
create policy "auth all payments" on public.payments
  for all using (auth.role() = 'authenticated');