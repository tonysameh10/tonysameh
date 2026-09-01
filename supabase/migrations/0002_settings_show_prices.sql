-- Tony Sameh Portfolio — Settings: price visibility
-- Run in Supabase SQL Editor.
-- Adds a "show_prices" flag so admin can control whether prices are visible to clients.
-- Default is false (prices hidden). Turn it on from لوحة التحكم → الإعدادات when ready.

alter table public.site_settings
  add column if not exists show_prices boolean not null default false;

-- Ensure the single settings row exists with the flag set (safe default: hidden)
insert into public.site_settings (id, whatsapp, email, hero_title_ar, hero_lead_ar, is_available, show_prices)
values (
  1,
  '+201016042072',
  null,
  'ملزمتك شكلها أقل من مستواك.',
  'بصمّم وأُخرج الملازم والأغلفة والمطبوعات — بحيث المعادلات تطلع مضبوطة، والجداول متتكسرش، والملف تقبله المطبعة من أول مرة.',
  true,
  false
)
on conflict (id) do nothing;
