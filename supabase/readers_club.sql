-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.readers_club (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  created_at timestamptz not null default now(),
  constraint readers_club_email_unique unique (email)
);

create index if not exists readers_club_created_at_idx
  on public.readers_club (created_at desc);

alter table public.readers_club enable row level security;

drop policy if exists "Allow public insert on readers_club" on public.readers_club;
create policy "Allow public insert on readers_club"
  on public.readers_club
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow authenticated select on readers_club" on public.readers_club;
create policy "Allow authenticated select on readers_club"
  on public.readers_club
  for select
  to authenticated
  using (true);

drop policy if exists "Allow authenticated delete on readers_club" on public.readers_club;
create policy "Allow authenticated delete on readers_club"
  on public.readers_club
  for delete
  to authenticated
  using (true);
