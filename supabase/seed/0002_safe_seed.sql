-- ============================================================================
-- SAFE ONE-TIME SETUP — كل حاجة محتاجها في ملف واحد (آمن للتكرار)
-- Run this ONCE in Supabase SQL Editor. It's idempotent & self-healing:
--   * creates unique indexes (so re-running never duplicates)
--   * de-duplicates any existing duplicates
--   * inserts/updates services, packages, settings, and the sample project
--   * fixes the sample project image (no broken placeholder)
-- ============================================================================

-- ------------------------------------------------------------
-- 1) UNIQUE INDEXES  (needed for the on-conflict inserts below)
-- ------------------------------------------------------------
create unique index if not exists services_title_ar_key on public.services (title_ar);
create unique index if not exists packages_name_ar_key on public.packages (name_ar);

-- ------------------------------------------------------------
-- 2) DE-DUPLICATE  (keep one row per name, drop the rest)
-- ------------------------------------------------------------
delete from public.services a
using public.services b
where a.title_ar = b.title_ar and a.id > b.id;

delete from public.packages a
using public.packages b
where a.name_ar = b.name_ar and a.id > b.id;

-- ------------------------------------------------------------
-- 3) SERVICES — 8 services (idempotent by title_ar)
-- ------------------------------------------------------------
insert into public.services (title_ar, description, icon, price_from, features, sort_order, active) values
  ('الهوية البصرية واللوجو', 'منظومة متكاملة تميّز علامتك — من اللوجو لحد دليل الاستخدام', 'sparkles', 4200,
   array['لوجو بكل الصيغ','لوحة ألوان وخطوط','كارت + ورق مراسلات','دليل الهوية'], 1, true),
  ('بروفايلات الشركات', 'ملف يدخلك المناقصات والمعارض وأنت مطمئن', 'building', 2500,
   array['كتابة المحتوى (اختياري)','نسخة كاملة ومختصرة A5','عربي أو ثنائي اللغة','PDF تفاعلي'], 2, true),
  ('الكتالوجات', 'كتالوجات منتجات وخدمات بتصميم موحّد، وأنظمة تحديث تلقائي', 'layers', 2500,
   array['تصميم موحّد للمنتجات','فهرس + جدول مواصفات','كتالوج آلي (Data Merge)','ثنائي اللغة للتصدير'], 3, true),
  ('الأغلفة والسلاسل', 'أغلفة كتب وملازم بحضور بصري يسجّل قبل ما تضربها', 'covers', 450,
   array['وش وظهر وكعب','هوية سلسلة موحّدة','معالجة الصور ودمجها','ملف CMYK جاهز للمطبعة'], 4, true),
  ('إخراج الكتب والنشر', 'للمؤلفين ودور النشر والباحثين — بمعايير محترفة', 'books', 1500,
   array['فهرس وحواشي أوتوماتيك','ترويسات وترقيم مضبوطة','تنسيق رسائل علمية','تجهيز ملف الطباعة'], 5, true),
  ('المطبوعات الدعائية', 'فلايرات وبروشورات وبوسترات ومنيوهات تبان محترمة', 'printer', 400,
   array['تصميم على المفرود الحقيقي','مراعاة خطوط الطي والقص','معالجة صور المنتجات','ملف جاهز للطباعة'], 6, true),
  ('التصميم الرقمي', 'سوشيال ميديا وعروض تقديمية بهوية موحّدة', 'pen', 180,
   array['بوستات وكاروسيلات','قوالب سوشيال قابلة لإعادة الاستخدام','عروض تقديمية','كوفر وبروفايل للمنصات'], 7, true),
  ('الخدمات الفنية', 'إنقاذ ملفات رفضتها المطبعة، وتحويل PDF، وتجهيز ملفات للطباعة', 'file', 300,
   array['إنقاذ ملف الطباعة الرفض','تحويل PDF لملف قابل للتعديل','تصحيح الأرقام والاتجاهات','استشارة تصميمية'], 8, true)
on conflict (title_ar) do nothing;

-- ------------------------------------------------------------
-- 4) PACKAGES — 4 packages (idempotent by name_ar)
-- ------------------------------------------------------------
insert into public.packages (name_ar, description, price, old_price, features, is_featured, sort_order, active) values
  ('هوية متكاملة', 'لكل براند جديد محتاج يثبّت حضوره باحترافية', 4200, 6000,
   array['لوجو (3 مقترحات)','كل الصيغ المطلوبة','لوحة ألوان وخطوط','كارت شخصي + ورق مراسلات','دليل الهوية'], true, 1, true),
  ('بروفايل مناقصات', 'لشركة محتاجة تدخل المناقصات وتفرض وجودها', 5000, null,
   array['بروفايل حتى 12 صفحة','كتابة المحتوى','نسخة مختصرة A5','PDF تفاعلي','أولوية في التنفيذ'], false, 2, true),
  ('إخراج كتاب كامل', 'للكتاب أو الرسالة من المخطوطة للملف النهائي', 3200, null,
   array['تنضيد داخلي كامل','فهرس وحواشي أوتوماتيك','غلاف + كعب','تصميم السلسلة (اختياري)','تجهيز ملف الطباعة'], false, 3, true),
  ('طقم الطباعة', 'كل اللي محتاجه لأي فعالية أو إطلاق في يومين', 1800, 2400,
   array['فلاير + بوستر','بانر فينيل','رول أب أو فولدر','ملفات جاهزة للطباعة','معالجة الصور مجانًا'], false, 4, true)
on conflict (name_ar) do nothing;

-- ------------------------------------------------------------
-- 5) SITE SETTINGS  (single row id=1, prices hidden by default)
-- ------------------------------------------------------------
insert into public.site_settings (id, whatsapp, email, facebook_url, behance_url, hero_title_ar, hero_lead_ar, is_available, show_prices)
values (
  1,
  '+201016042072',
  'tony1sameh@gmail.com',
  'https://www.facebook.com/profile.php?id=61594105014733',
  'https://www.behance.net/tonysameh10',
  'هويتك البصرية شكلها أقل من مستواك.',
  'بصمّم وأُخرج الهوية البصرية والبروفايلات والكتالوجات والمطبوعات — بحيث الملف يطلع جاهز للمطبعة من أول مرة.',
  true,
  false
)
on conflict (id) do update set
  whatsapp = excluded.whatsapp,
  email = excluded.email,
  facebook_url = excluded.facebook_url,
  behance_url = excluded.behance_url,
  hero_title_ar = excluded.hero_title_ar,
  hero_lead_ar = excluded.hero_lead_ar,
  is_available = excluded.is_available,
  show_prices = excluded.show_prices;

-- ------------------------------------------------------------
-- 6) SAMPLE PROJECT  (local image, idempotent by slug + fix any placeholder)
-- ------------------------------------------------------------
insert into public.projects (slug, title_ar, title_en, category, client, year, summary_ar, cover_image, gallery, deliverables, behance_url, featured, published, sort_order)
values (
  'al-qanoon-physics',
  'سلسلة القانون — الفيزياء',
  'The Law — Physics Series',
  'cover',
  'أ / أحمد عبدالرحمن',
  2026,
  'هوية كاملة لغلاف سلسلة مراجعة في الفيزياء لطلاب الثانوية. الفكرة كانت إن الطالب يمسك الملزمة ويحس إنها بتاعة مدرس كبير — قبل ما يفتح صفحة واحدة. الوش والظهر مربوطين بنفس الهوية، والغلاف الخلفي فيه QR للسوشيال، فكل نسخة مطبوعة بقت قناة توزيع.',
  '/images/tony.png',
  array['/images/tony.png'],
  array['غلاف أمامي','غلاف خلفي','ملف جاهز للمطبعة','معاينة للسوشيال'],
  null,
  true,
  true,
  1
)
on conflict (slug) do update set
  cover_image = excluded.cover_image,
  gallery = excluded.gallery;

update public.projects
set cover_image = '/images/tony.png',
    gallery = array['/images/tony.png']
where slug = 'al-qanoon-physics'
  and (cover_image like 'REPLACE_WITH%' or cover_image = '/REPLACE_WITH_PUBLIC_COVER_URL');