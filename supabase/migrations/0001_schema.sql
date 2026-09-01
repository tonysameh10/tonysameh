-- Tony Sameh Portfolio — Database Schema
-- Run this in Supabase SQL Editor (or via CLI) to create all tables + RLS + storage.
-- This file is idempotent (drops and recreates types/tables safely for fresh setups).

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "pgcrypto";

-- ============================================================
-- PROJECTS
-- ============================================================
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title_ar      text not null,
  title_en      text,
  category      text not null check (category in ('cover','booklet','profile','book','catalog','identity','print','digital')),
  client        text,
  year          integer,
  summary_ar    text,
  cover_image   text not null,
  gallery       text[] default '{}',
  deliverables  text[] default '{}',
  behance_url   text,
  featured      boolean default false,
  published     boolean default false,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
create index if not exists projects_category_idx on public.projects (category);
create index if not exists projects_published_sort_idx on public.projects (published, sort_order);
create unique index if not exists services_title_ar_key on public.services (title_ar);
create unique index if not exists packages_name_ar_key on public.packages (name_ar);

-- ============================================================
-- SERVICES
-- ============================================================
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  title_ar    text not null,
  description text,
  icon        text,
  price_from  integer,
  features    text[] default '{}',
  sort_order  integer default 0,
  active      boolean default true
);

-- ============================================================
-- PACKAGES
-- ============================================================
create table if not exists public.packages (
  id           uuid primary key default gen_random_uuid(),
  name_ar      text not null,
  description  text,
  price        integer not null,
  old_price    integer,
  features     text[] default '{}',
  is_featured  boolean default false,
  sort_order   integer default 0,
  active       boolean default true
);

-- ============================================================
-- INQUIRIES
-- ============================================================
create table if not exists public.inquiries (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  phone        text not null,
  service_type text,
  message      text,
  file_url     text,
  status       text default 'new' check (status in ('new','contacted','won','lost')),
  notes        text,
  created_at   timestamptz default now()
);
create index if not exists inquiries_status_created_idx on public.inquiries (status, created_at desc);

-- ============================================================
-- SITE SETTINGS (single row, id = 1)
-- ============================================================
create table if not exists public.site_settings (
  id             integer primary key default 1,
  whatsapp       text default '+201016042072',
  email          text,
  facebook_url   text,
  instagram_url  text,
  behance_url    text,
  pinterest_url  text,
  hero_title_ar  text,
  hero_lead_ar   text,
  is_available   boolean default true,
  show_prices    boolean default false,
  constraint single_row check (id = 1)
);

-- ============================================================
-- CLIENTS (admin-only CRM)
-- ============================================================
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

-- ============================================================
-- CLIENT NOTES (timeline)
-- ============================================================
create table if not exists public.client_notes (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references public.clients (id) on delete cascade,
  body        text not null,
  created_at  timestamptz default now()
);
create index if not exists client_notes_client_idx on public.client_notes (client_id, created_at desc);

-- ============================================================
-- PAYMENTS (revenue ledger, admin only)
-- ============================================================
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

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.packages enable row level security;
alter table public.inquiries enable row level security;
alter table public.site_settings enable row level security;
alter table public.clients enable row level security;
alter table public.client_notes enable row level security;
alter table public.payments enable row level security;

-- Public read for published content
drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects" on public.projects
  for select using (published = true);

drop policy if exists "public read active services" on public.services;
create policy "public read active services" on public.services
  for select using (active = true);

drop policy if exists "public read active packages" on public.packages;
create policy "public read active packages" on public.packages
  for select using (active = true);

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings
  for select using (true);

-- Anyone can submit an inquiry
drop policy if exists "public insert inquiries" on public.inquiries;
create policy "public insert inquiries" on public.inquiries
  for insert with check (true);

-- Authenticated full access on everything
drop policy if exists "auth all projects" on public.projects;
create policy "auth all projects" on public.projects
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth all services" on public.services;
create policy "auth all services" on public.services
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth all packages" on public.packages;
create policy "auth all packages" on public.packages
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth all inquiries" on public.inquiries;
create policy "auth all inquiries" on public.inquiries
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth all settings" on public.site_settings;
create policy "auth all settings" on public.site_settings
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth all clients" on public.clients;
create policy "auth all clients" on public.clients
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth all client_notes" on public.client_notes;
create policy "auth all client_notes" on public.client_notes
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth all payments" on public.payments;
create policy "auth all payments" on public.payments
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('projects', 'projects', true, 5242880, array['image/png','image/jpeg','image/webp']),
  ('uploads',  'uploads',  false, 10485760, null)
on conflict (id) do nothing;

-- Public read for 'projects' bucket (images must be viewable)
drop policy if exists "public read projects bucket" on storage.objects;
create policy "public read projects bucket" on storage.objects
  for select using (bucket_id = 'projects');

-- Authenticated users can write to projects bucket
drop policy if exists "auth write projects bucket" on storage.objects;
create policy "auth write projects bucket" on storage.objects
  for insert with check (bucket_id = 'projects' and auth.role() = 'authenticated');

drop policy if exists "auth update projects bucket" on storage.objects;
create policy "auth update projects bucket" on storage.objects
  for update using (bucket_id = 'projects' and auth.role() = 'authenticated');

drop policy if exists "auth delete projects bucket" on storage.objects;
create policy "auth delete projects bucket" on storage.objects
  for delete using (bucket_id = 'projects' and auth.role() = 'authenticated');
