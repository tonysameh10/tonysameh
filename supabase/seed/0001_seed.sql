-- Tony Sameh Portfolio — Seed Data
-- Run AFTER 0001_schema.sql
-- Replace the placeholder cover_image URL with a real uploaded image
-- (your logo/photo can be uploaded to the 'projects' bucket via the admin dashboard).

-- ============================================================
-- SERVICES
-- ============================================================
insert into public.services (id, title_ar, description, icon, price_from, features, sort_order, active) values
  (gen_random_uuid(), 'تنضيد الملازم', 'الملزمة كاملة من ملف Word فوضوي إلى ملف جاهز للمطبعة', '📚', 1800,
   array['معادلات وجداول مضبوطة','فهرس أوتوماتيك','ترقيم وترويسات متسقة','صناديق ملاحظات'], 1, true),
  (gen_random_uuid(), 'أغلفة وسلاسل', 'مش غلاف واحد — هوية بصرية للسلسلة كلها', '📕', 450,
   array['اسم سلسلة وشعار','3 أنماط تختار منها','وش وظهر وكعب','تدرّج لوني حسب الصف'], 2, true),
  (gen_random_uuid(), 'بروفايلات الشركات', 'ملف تقدر تدخل بيه مناقصة وأنت مطمن', '🏢', 3500,
   array['كتابة المحتوى (اختياري)','نسخة كاملة ومختصرة','عربي أو ثنائي اللغة','PDF تفاعلي'], 3, true),
  (gen_random_uuid(), 'إخراج الكتب', 'للمؤلفين ودور النشر والباحثين', '📖', 25,
   array['فهرس وحواشي أوتوماتيك','ترويسات وترقيم','تنسيق رسائل علمية','تجهيز ملف الطباعة'], 4, true);

-- ============================================================
-- PACKAGES
-- ============================================================
insert into public.packages (id, name_ar, description, price, old_price, features, is_featured, sort_order, active) values
  (gen_random_uuid(), 'البداية', 'لمراجعة أو ملزمة صغيرة', 1800, null,
   array['ملزمة حتى 60 صفحة','تنضيد كامل','فهرس أوتوماتيك','ملف مطبعة + PDF'], false, 1, true),
  (gen_random_uuid(), 'الموسم', 'لمادة كاملة في ترم', 3900, null,
   array['ملزمة حتى 120 صفحة','غلاف مصمم بهوية','قالب نتائج الطلبة','ملف مطبعة + PDF','أولوية في التنفيذ'], true, 2, true),
  (gen_random_uuid(), 'المتكامل', 'للموسم الدراسي كله', 7500, 9900,
   array['ملزمتين (ترم أول وثاني)','غلاف مميز لكل ملزمة','لوجو للمدرس أو السنتر','قالب نتائج + امتحان','تحديثات مجانية'], false, 3, true);

-- ============================================================
-- SITE SETTINGS (single row, id = 1)
-- ============================================================
insert into public.site_settings (id, whatsapp, email, hero_title_ar, hero_lead_ar, is_available)
values (
  1,
  '+201016042072',
  null,
  'ملزمتك شكلها أقل من مستواك.',
  'بصمّم وأُخرج الملازم والأغلفة والمطبوعات — بحيث المعادلات تطلع مضبوطة، والجداول متتكسرش، والملف تقبله المطبعة من أول مرة.',
  true
)
on conflict (id) do nothing;

-- ============================================================
-- SAMPLE PROJECT
-- NOTE: cover_image is a public URL in the 'projects' storage bucket.
-- Upload your cover to the bucket first, then paste the public URL here.
-- ============================================================
insert into public.projects (id, slug, title_ar, title_en, category, client, year, summary_ar, cover_image, gallery, deliverables, behance_url, featured, published, sort_order)
values (
  gen_random_uuid(),
  'al-qanoon-physics',
  'سلسلة القانون — الفيزياء',
  'The Law — Physics Series',
  'cover',
  'أ / أحمد عبدالرحمن',
  2026,
  'هوية كاملة لغلاف سلسلة مراجعة في الفيزياء لطلاب الثانوية. الفكرة كانت إن الطالب يمسك الملزمة ويحس إنها بتاعة مدرس كبير — قبل ما يفتح صفحة واحدة. الوش والظهر مربوطين بنفس الهوية، والغلاف الخلفي فيه QR للسوشيال، فكل نسخة مطبوعة بقت قناة توزيع.',
  'REPLACE_WITH_PUBLIC_COVER_URL',
  array['REPLACE_WITH_PUBLIC_IMAGE_URL'],
  array['غلاف أمامي','غلاف خلفي','ملف جاهز للمطبعة','معاينة للسوشيال'],
  null,
  true,
  true,
  1
);
